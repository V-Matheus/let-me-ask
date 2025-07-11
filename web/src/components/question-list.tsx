import { useRoomsQuestions } from '@/http/use-rooms-questions';
import { QuestionItem } from '../components/question-item';

interface QuestionList {
  roomId: string;
}

export function QuestionList({ roomId }: QuestionList) {
  const { data } = useRoomsQuestions(roomId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl text-foreground">
          Perguntas & Respostas
        </h2>
      </div>

      {data?.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </div>
  );
}
