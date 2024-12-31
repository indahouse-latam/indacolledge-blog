import { auth } from "@/modules/auth/auth";
import { CreateArticleForm } from "@/modules/core/components/create-article/CreateArticleForm";
import { redirect } from "@/modules/translations/i18n/routing";
import { sanityFetch } from "@/sanity/lib/live";
import { CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { Category } from "@/types/sanity";
import React from "react";

const CreateArticlePage = async () => {
  const session = await auth();

  if (!session) redirect({ href: "/", locale: "en" });

  const { data: categories } = await sanityFetch({
    query: CATEGORIES_QUERY,
  });

  return (
    <>
      <section className="hero_container !min-h-[180px]">
        <h2 className="heading">Submit your course</h2>
      </section>
      <CreateArticleForm categories={categories as Category[]} />
    </>
  );
};

export default CreateArticlePage;
