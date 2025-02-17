import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

export const updateStatusInURL = (
  status: string | undefined,
  newStatus: string,
  searchParams: ReadonlyURLSearchParams,
  router: AppRouterInstance
) => {
  const params = new URLSearchParams(searchParams.toString());

  if (status === newStatus) {
    params.delete("status");
  } else {
    params.set("status", newStatus);
  }

  return router.push(`?${params.toString()}`);
};
