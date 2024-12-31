"use server";

import { auth } from "@/modules/auth/auth";
import { writeClient } from "@/sanity/lib/write-client";
import { CreateArticleFormType } from "@/types/create-article.schema";
import { Category } from "@/types/sanity";
import { parseServerActionResponse } from "@/utils/parseServerActionResponse";
import slugify from "slugify";

export const createCourse = async (form: CreateArticleFormType) => {
  const session = await auth();

  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  const { title, categories: categoriesString, mainImage, body } = form;

  const slug = slugify(title as string, { lower: true, strict: true });

  const categoriesArray: Category[] = categoriesString
    .split(",")
    .map((categoryString) => {
      return {
        _id: categoryString.trim(),
        title: categoryString.trim(),
      } as Category;
    });

  const categories = categoriesArray.map((category) => ({
    _type: "reference",
    _ref: category._id,
  }));

  try {
    const course = {
      title,
      mainImage,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      publishedAt: new Date().toISOString(),
      views: 0,
      categories,
      body,
    };

    const result = await writeClient.create({ _type: "article", ...course });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
