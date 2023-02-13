import { useQuery } from "react-query";

export function useLabelData() {
  const labelsQuery = useQuery(
    ["labels"],
    () => fetch("/api/labels").then((res) => res.json()),
    {
      staleTime: 1000 * 60 * 60,
    }
  );

  //   console.log(labelsQuery.data);
  return labelsQuery;
}
