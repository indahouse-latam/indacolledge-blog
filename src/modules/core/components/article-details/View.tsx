import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { ARTICLE_VIEW_QUERY } from "@/sanity/lib/queries";
import { Ping } from "@/modules/common/Ping";
import { unstable_after as after } from "next/server";

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
    <div className="view-container z-10">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="bg-black px-4 py-2 rounded-lg capitalize font-semibold">
        <span className="text-white">{totalViews} views</span>
      </p>
    </div>
  );
};
