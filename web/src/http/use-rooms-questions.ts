import { useQuery } from '@tanstack/react-query';

export function useRoomsQuestions(roomId: string) {
  return useQuery({
    queryKey: ['get-questions', roomId],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.API_KEY_URL}/rooms/${roomId}/questions`,
      );
      const result: GetRoomQuesitonsResponse = await response.json();

      return result;
    },
  });
}
