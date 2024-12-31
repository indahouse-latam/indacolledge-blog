import { client } from "@/sanity/lib/client";
import { ARTICLES_BY_ID_QUERY } from "@/sanity/lib/queries";
import { formatDate } from "@/utils/format-date";
import { Chip, Image, Link, Skeleton, User } from "@nextui-org/react";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { Suspense } from "react";
import { View } from "@/modules/core/components/article-details/View";

export const experimental_ppr = true;

const md = markdownit();

const ArticlePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const post = await client.fetch(ARTICLES_BY_ID_QUERY, {
    id,
  });

  if (!post) notFound();

  const parsedContent = md.render(post?.body || "");

  return (
    <>
      <section className="hero_container">
        <p className="tag">{formatDate(post?.publishedAt || "")}</p>
        <h2 className="heading">{post?.title}</h2>
      </section>
      <section className="section_container flex flex-col items-center">
        <Image
          isZoomed
          src={post?.mainImage || ""}
          className="w-[350px] md:w-[450px] lg:w-[550px] h-[350px] self-center"
          alt="Thumbail"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post?.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <User
                avatarProps={{
                  src: post?.author?.image as string,
                }}
                description={`@${post?.author?.username}`}
                name={post?.author?.name}
              />
            </Link>
            <div className="flex items-center gap-2">
              {post.categories?.map((category) => (
                <Chip
                  key={category._id}
                  size="sm"
                  className="text-black border border-black text-sm font-medium"
                  variant="bordered"
                >
                  {category.title}
                </Chip>
              ))}
            </div>
          </div>
          <h3 className="text-30-bold">About</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>
        <hr className="divider" />
        {/* {editorPosts?.length > 0 && (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <RecommendedCourses courses={editorPosts as any} />
        )} */}
        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default ArticlePage;
