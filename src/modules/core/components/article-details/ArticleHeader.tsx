import { formatDate } from "@/utils/format-date";
import { Link } from "@/modules/translations/i18n/routing";
import { Button, Chip, Image, User } from "@nextui-org/react";

interface ArticleHeaderProps {
  title: string | null;
  publishedAt: string | null;
  author: {
    _id: string;
    name: string | null;
    username: string | null;
    image: string | null;
    bio: string | null;
  } | null;
  mainImage: string | null;
  categories: Array<{
    _id: string;
    title: string | null;
  }> | null;
}

export const ArticleHeader = ({
  title,
  publishedAt,
  mainImage,
  author,
  categories,
}: ArticleHeaderProps) => {
  return (
    <>
      <section className="hero_container">
        <Link className="self-start" href="/">
          <Button
            className=""
            variant="light"
            startContent={
              <span
                className="icon-[material-symbols-light--chevron-left] size-"
                role="img"
                aria-hidden="true"
              />
            }
          >
            Go back
          </Button>
        </Link>
        <p className="tag">{formatDate(publishedAt!)}</p>
        <h2 className="heading">{title}</h2>
        <div className="flex flex-col items-center">
          <Image
            isZoomed
            src={mainImage!}
            className="w-[350px] md:w-[450px] lg:w-[550px] h-[350px] self-center"
            alt="Thumbnail"
          />
          <div className="flex-between gap-5 mt-10">
            <Link
              href={`/user/${author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <User
                avatarProps={{ src: author?.image as string }}
                description={`@${author?.username}`}
                name={author?.name}
              />
            </Link>
            <div className="flex items-center gap-2">
              {categories?.map((category) => (
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
        </div>
      </section>
    </>
  );
};
