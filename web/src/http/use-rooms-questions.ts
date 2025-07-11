import { useQuery } from '@tanstack/react-query';

export function useRoomsQuestions(roomId: string) {
  return useQuery({
    queryKey: ['get-questions', roomId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`,
      );
      const result: GetRoomQuesitonsResponse = await response.json();

      return result;
    },
  });
}
