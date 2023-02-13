import { useQuery } from "react-query";

export function useUserData(userId) {
  const usersData = useQuery(
    ["users", userId],
    () => fetch(`/api/users/${userId}`).then((res) => res.json()),
    {
      staleTime: 1000 * 60 * 5,
    }
  );
  // console.log(usersData.data);

  return usersData;
}
