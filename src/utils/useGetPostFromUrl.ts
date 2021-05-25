import { usePostQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetPostFromUrl = () => {
  const numId = useGetIntId();
  return usePostQuery({
    pause: numId === -1,
    variables: {
      id: numId,
    },
  });
};
