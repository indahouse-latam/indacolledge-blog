import { client } from "@/sanity/lib/client";
import { ARTICLES_BY_ID_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

export const getArticleById = async (id: string) => {
  return await client.fetch(ARTICLES_BY_ID_QUERY, { id });
};

export const updateArticleStatus = async (id: string, status: string) => {
  return await writeClient.patch(id).set({ status }).commit();
};
