import { useRouterStuff } from "@dub/ui";
import { fetcher } from "@dub/utils";
import { useEffect, useState } from "react";
import useSWR from "swr";
import useWorkspace from "./use-workspace";


export default function useLinksCount<T = any>(
  opts: any
) {

  return {
    data: [{"_count":2,"userId":"cm2af6pvz0006tz5ovjyrg8kl"}],
    loading: false,
    error: null,
  };

  const { id: workspaceId } = useWorkspace();
  const { getQueryString } = useRouterStuff();

  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (window.location.host.startsWith("admin.")) {
      setAdmin(true);
    }
  }, []);

  const { data, error } = useSWR<any>(
    workspaceId
      ? `/api/links/count${
          opts.ignoreParams
            ? `?workspaceId=${workspaceId}`
            : getQueryString(
                {
                  workspaceId,
                  ...opts,
                },
                {
                  ignore: ["import", "upgrade", "newLink"],
                },
              )
        }`
      : admin
        ? `/api/admin/links/count${getQueryString({
            ...opts,
          })}`
        : null,
    fetcher,
    {
      dedupingInterval: 60000,
      keepPreviousData: true,
    },
  );

  return {
    data: data as T,
    loading: !error && data === undefined,
    error,
  };
}
