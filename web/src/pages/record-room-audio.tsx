import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function';

type RoomParams = {
  roomId: string;
};

export function RecordRoomAudio() {
  const params = useParams<RoomParams>();

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function stopRecording() {
    setIsRecording(false);

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop();
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData();
    formData.append('file', audio, 'audio.webm');

    const response = await fetch(
      `${process.env.VITE_API_URL}/rooms/${params.roomId}/audio`,
      {
        method: 'POST',
        body: formData,
      },
    );

    const result = await response.json();
    console.log(result);
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 66_000,
    });

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data);
      }
    };

    recorder.current.onstart = () => {
      console.log('Gravação iniciada');
    };

    recorder.current.onstop = () => {
      console.log('Gravação encerrada/pausada');
    };

    recorder.current.start();
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert('Gravação de áudio não é suportada neste navegador.');
      return;
    }

    setIsRecording(true);

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });

    createRecorder(audio);

    intervalRef.current = setInterval(() => {
      recorder.current?.stop();
      createRecorder(audio);
    }, 5000);
  }

  return (
    <div className="h-screen flex items-center justify-center gap-3 flex-col">
      {isRecording ? (
        <Button onClick={stopRecording}>Pausar gravação</Button>
      ) : (
        <Button onClick={startRecording}>Iniciar gravação</Button>
      )}

      {isRecording ? <p>Gravando...</p> : <p>Pausado</p>}
    </div>
  );
}
