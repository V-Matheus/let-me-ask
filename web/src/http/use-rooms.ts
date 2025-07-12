import { useQuery } from '@tanstack/react-query';

export function useRooms() {
  return useQuery({
    queryKey: ['get-room'],
    queryFn: async () => {
      const response = await fetch(`${process.env.VITE_API_URL}/rooms`);
      const result: GetRoomsAPIResponse = await response.json();

      return result;
    },
  });
}
