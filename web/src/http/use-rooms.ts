import { useQuery } from '@tanstack/react-query';

export function useRooms() {
  return useQuery({
    queryKey: ['get-room'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms');
      const result: GetRoomsAPIResponse = await response.json();

      return result;
    },
  });
}
