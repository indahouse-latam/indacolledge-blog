import { CourseCardSkeleton } from "@/modules/common/skeletons/CourseCardSkeleton";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { ARTICLES_QUERY } from "@/sanity/lib/queries";
import { ArticleCardType } from "@/types/article";
import { Suspense } from "react";
import { ArticleCard } from "./ArticleCard";

export const FeaturedArticles = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const { data: posts } = await sanityFetch({
    query: ARTICLES_QUERY,
    params,
  });

  return (
    <>
      <section className="section_container">
        <p className="font-semibold text-xl">
          {query ? `Search results for "${query}"` : "Recent blog posts"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            <Suspense fallback={<CourseCardSkeleton />}>
              {posts.map((post) => (
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
