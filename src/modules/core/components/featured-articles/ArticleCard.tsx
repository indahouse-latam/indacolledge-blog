"use client";

import { Link } from "@/modules/translations/i18n/routing";
import { ArticleCardType } from "@/types/article";
import { formatDate } from "@/utils/format-date";
import markdownit from "markdown-it";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Image,
} from "@nextui-org/react";

export const ArticleCard = ({ post }: { post: ArticleCardType }) => {
  const md = markdownit();

  const parsedContent = md.render(post?.body || "");

  return (
    <Card
      className="p-0 backdrop-blur-sm bg-white/30 max-w-[442px]"
      shadow="none"
    >
      <CardHeader className="flex items-center justify-between relative">
        <Link
          href={`/article/${post._id}`}
          className="flex items-center justify-center flex-col mt-4"
        >
          <Image
            isZoomed
            radius="none"
            className="!h-[275px]"
            src={post?.mainImage || ""}
            alt={`Thumbnail of ${post.title}`}
          />
        </Link>
      </CardHeader>
      <CardBody>
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-1">
            <Link href={`/user/${post.author?._id}`}>
              <p className="">{post.author?.name}</p>
            </Link>
            <div className="bg-black rounded-full w-1 h-1" />
            <p className="">{formatDate(post?.publishedAt || "")}</p>
          </div>

          <div className="flex gap-1.5 items-center">
            <i
              className="icon-[akar-icons--eye] size-4"
              role="img"
              aria-hidden="true"
            ></i>
            <span className="text-12-medium">{post.views}</span>
          </div>
        </div>

        <div className="mt-5 gap-5">
          <Link href={`/article/${post._id}`}>
            <div className="flex justify-between">
              <h3 className="text-2xl w-[80%] font-medium line-clamp-2">
                {post.title}
              </h3>
              <Button
                className="text-black text-xl hover:rotate-45 transition-transform"
                variant="light"
                radius="full"
                isIconOnly
              >
                <i
                  className="icon-[material-symbols--arrow-outward-rounded]"
                  role="img"
                  aria-hidden="true"
                ></i>
              </Button>
            </div>
            {parsedContent ? (
              <p
                className="text-sm line-clamp-3 text-black/70"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            ) : (
              <p className="no-result">No details provided</p>
            )}
          </Link>
        </div>
      </CardBody>
      <CardFooter className="flex gap-2 mt-5">
        {post.categories?.map((category) => (
          <Link
            key={category._id}
            href={`/?query=${category.title?.toLowerCase()}`}
          >
            <Chip
              size="sm"
              className="text-black border border-black text-sm font-medium"
              variant="bordered"
            >
              {category.title}
            </Chip>
          </Link>
        ))}
      </CardFooter>
    </Card>
  );
};
