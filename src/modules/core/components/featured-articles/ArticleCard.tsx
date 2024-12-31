"use client";

import { Link } from "@/modules/translations/i18n/routing";
import { ArticleCardType } from "@/types/article";
import { formatDate } from "@/utils/format-date";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Image,
} from "@nextui-org/react";

export const ArticleCard = ({ post }: { post: ArticleCardType }) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <p className="article-card_date">
          {formatDate(post?.publishedAt || "")}
        </p>
        <div className="flex gap-1.5 items-center">
          <i
            className="icon-[akar-icons--eye] size-5 text-primary"
            role="img"
            aria-hidden="true"
          ></i>
          <span className="text-16-medium">{post.views}</span>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex-between mt-5 gap-5">
          <div>
            <Link href={`/user/${post.author?._id}`}>
              <p className="text-16-medium">{post.author?.name}</p>
            </Link>
            <Link href={`/article/${post._id}`}>
              <h3 className="text-2xl font-medium">{post.title}</h3>
            </Link>
          </div>
          <Link href={`/user/${post.author?._id}`}>
            <Avatar src={post.author?.image} size="lg" alt="Placeholder" />
          </Link>
        </div>
        <Link
          href={`/article/${post._id}`}
          className="flex items-center justify-center flex-col mt-4"
        >
          <Image
            isZoomed
            src={post.mainImage}
            alt="Placeholder"
            className="article-card_img"
          />
        </Link>
      </CardBody>
      <CardFooter className="flex-between gap-3 mt-5">
        {post.categories?.map((category) => (
          <Link
            key={category._id}
            href={`/?query=${category.title?.toLowerCase()}`}
          >
            <Chip className="category-tag text-black" color="secondary">
              {category.title}
            </Chip>
          </Link>
        ))}
        <Button className="article-card_btn">
          <Link href={`/article/${post._id}`}>Start article</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
