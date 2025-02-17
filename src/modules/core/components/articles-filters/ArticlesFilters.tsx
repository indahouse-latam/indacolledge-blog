import { AdminFilterByStatus } from "./AdminFilterByStatus";

export const ArticlesFilters = async ({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) => {
  const status = (await searchParams).status;

  return (
    <section className="section_container">
      <AdminFilterByStatus status={status || "published"} />
    </section>
  );
};
