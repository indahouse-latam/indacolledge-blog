import { CourseCardSkeleton } from "@/modules/common/skeletons/CourseCardSkeleton";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { ARTICLES_QUERY } from "@/sanity/lib/queries";
import { ArticleCardType } from "@/types/article";
import { Suspense } from "react";
import { ArticleCard } from "./ArticleCard";

export const FeaturedArticles = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; status?: string }>;
}) => {
  const query = (await searchParams).query;
  const status = (await searchParams).status;
  const params = { search: query || null, status: status || "published" };

  const { data: posts } = await sanityFetch({
    query: ARTICLES_QUERY,
    params,
  });

  return (
    <>
      <section className="section_container relative !w-screen overflow-hidden">
        {/* Background Curve */}
        <div
          className="absolute inset-0 bg-repeat-y inset-x-[24rem] -rotate-45 md:-rotate-0 lg:inset-x-[110rem] -inset-y-0 md:inset-y-64 lg:inset-y-64 w-full h-full -z-10 scale-150 !scale-x-[2.5] md:!scale-x-[1.6] lg:scale-100 lg:!scale-x-[3.2]"
          style={{
            backgroundImage: 'url("/curve.svg")',
            backgroundSize: "auto 1200px",
          }}
        ></div>

        <p className="font-semibold text-xl">
          {query ? `Search results for "${query}"` : "All blog posts"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            <Suspense fallback={<CourseCardSkeleton />}>
              {(posts as ArticleCardType[]).map((post) => (
                <ArticleCard
                  key={post?._id}
                  post={post as unknown as ArticleCardType}
                />
              ))}
            </Suspense>
          ) : (
            <p className="">No articles found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
};
