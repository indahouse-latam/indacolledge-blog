import { defineQuery } from "next-sanity";

export const ARTICLES_QUERY = defineQuery(`*[
  _type == "article" && 
  defined(slug.current) && 
  (!defined($search) || title match $search || categories[]->title match $search || author->name match $search)
] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  views,
  author -> {
    _id,
    name,
    image,
    bio
  },
  mainImage,
  categories[] -> {
    _id,
    title
  },
  body
}`);

export const ARTICLE_VIEW_QUERY = defineQuery(`
  *[
    _type == "article" && 
    _id == $id
  ][0] {
    _id,
    views
  }
`);

export const AUTHOR_BY_GOOGLE_ID_QUERY = defineQuery(`
  *[
    _type == "author" && 
    id == $id
  ][0] {
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
  }
`);

export const AUTHOR_BY_EMAIL_QUERY = defineQuery(`
  *[
    _type == "author" && 
    email == $email
  ][0] {
    _id,
    id,
    name,
    username,
    email,
    image,
    bio,
    hashPassword
  }
`);

export const AUTHOR_BY_ID_QUERY = defineQuery(`
  *[
    _type == "author" && 
    _id == $id
  ][0] {
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
  }
`);

export const PLAYLIST_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "playlist" && 
    slug.current == $slug
  ][0] {
    _id,
    title,
    slug,
    select[] -> {
      _id,
      publishedAt,
      title,
      slug,
      author -> {
        _id,
        name,
        slug,
        image,
        bio
      },
      mainImage,
      categories[] -> {
        _id,
        title
      },
      body
    }
  }
`);

export const ARTICLES_BY_AUTHOR_QUERY = defineQuery(`
  *[
    _type == "article" && 
    author._ref == $id
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    views,
    author -> {
      _id,
      name,
      image,
      bio
    },
    mainImage,
    categories[] -> {
      _id,
      title
    },
    body
  }
`);

export const ARTICLES_BY_ID_QUERY = defineQuery(`
  *[
    _type == "article" && 
    _id == $id
  ][0] {
    _id,
    title,
    slug,
    publishedAt,
    views,
    author -> {
      _id,
      name,
      username,
      image,
      bio
    },
    mainImage,
    categories[] -> {
      _id,
      title
    },
    body
  }
`);

export const ARTICLES_BY_CATEGORY_QUERY = defineQuery(`
  *[
    _type == "article" && 
    $categoryId in categories[]._ref
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    views,
    author -> {
      _id,
      name,
      image,
      bio
    },
    mainImage,
    categories[] -> {
      _id,
      title
    },
    body
  }
`);

export const CATEGORIES_QUERY = defineQuery(` 
  *[_type == "category"] | order(publishedAt desc) {
    _id,
    title
  }`);
