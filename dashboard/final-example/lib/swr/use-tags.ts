import { fetcher } from "@dub/utils";
import useSWR from "swr";
import { z } from "zod";
import useWorkspace from "./use-workspace";


export default function useTags({
  query,
  enabled = true,
}: { query?: any; enabled?: boolean } = {}) {
  const { id } = useWorkspace();

  const { data: tags, isValidating } = useSWR<any[]>(
    id &&
      enabled &&
      `/api/tags?${new URLSearchParams({ workspaceId: id, ...query } as Record<string, any>).toString()}`,
    fetcher,
    {
      dedupingInterval: 60000,
    },
  );

  return {
    tags,
    loading: tags ? false : true,
    isValidating,
  };
}
