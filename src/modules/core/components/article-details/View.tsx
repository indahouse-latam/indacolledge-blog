import React from "react";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { ARTICLE_VIEW_QUERY } from "@/sanity/lib/queries";
import { Ping } from "@/modules/common/Ping";
import { after } from "next/server";

export const View = async ({ id }: { id: string }) => {
  const views = await client
    .withConfig({ useCdn: false })
    .fetch(ARTICLE_VIEW_QUERY, { id });

  const totalViews = views?.views as number;

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit()
  );

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">{totalViews} views</span>
      </p>
    </div>
  );
};
