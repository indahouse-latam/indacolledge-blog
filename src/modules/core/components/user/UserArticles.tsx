import { client } from "@/sanity/lib/client";
import React from "react";
import { ARTICLES_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import { ArticleCard } from "../featured-articles/ArticleCard";
import { ArticleCardType } from "@/types/article";

export const UserArticles = async ({ id }: { id: string }) => {
  const courses = await client.fetch(ARTICLES_BY_AUTHOR_QUERY, { id });

  return (
    <>
      {courses.length > 0 ? (
        courses.map((startup) => (
          <ArticleCard key={startup._id} post={startup as ArticleCardType} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
};
