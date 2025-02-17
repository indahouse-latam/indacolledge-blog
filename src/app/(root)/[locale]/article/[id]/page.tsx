import { View } from "@/modules/core/components/article-details/View";
import { Suspense } from "react";
import { Skeleton } from "@nextui-org/react";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { getArticleById } from "@/modules/core/services/article.service";
import { ArticleHeader } from "@/modules/core/components/article-details/ArticleHeader";
import { StatusSelector } from "@/modules/core/components/article-details/StatusSelector";
import { ArticleContent } from "@/modules/core/components/article-details/ArticleContent";

const md = markdownit();

export const experimental_ppr = true;

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const post = await getArticleById(id);

  if (!post) notFound();

  const parsedContent = md.render(post.body || "");

  return (
    <main>
      <ArticleHeader
        title={post.title}
        publishedAt={post.publishedAt || new Date().toISOString()}
        mainImage={post.mainImage}
        author={post.author}
        categories={post.categories}
      />

      <section className="space-y-5 mt-10 max-w-4xl mx-auto">
        <StatusSelector
          postStatus={post.status || "draft"}
          articleId={id}
          initialStatus={post.status || "draft"}
        />

        <h3 className="text-30-bold">About</h3>

        {parsedContent ? (
          <ArticleContent content={parsedContent} />
        ) : (
          <p className="no-result">No details provided</p>
        )}
      </section>

      <hr className="divider" />

      <Suspense fallback={<Skeleton className="view_skeleton" />}>
        <View id={id} />
      </Suspense>
    </main>
  );
}
