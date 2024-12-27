import { Article, Author, Category } from "./sanity";

export type ArticleCardType = Omit<ArticleWithoutAuthor, "categories"> & {
  categories?: Category[];
};

export type ArticleWithoutAuthor = Omit<Article, "author"> & {
  author?: Author;
};
