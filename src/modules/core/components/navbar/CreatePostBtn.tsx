"use client";

import { useAuthStore } from "@/modules/auth/store/user-store";
import { Link } from "@/modules/translations/i18n/routing";

export const CreatePostBtn = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <>
      {user?.role === "viewer" ? (
        <></>
      ) : (
        <Link href={"/article/create"}>
          <span>Create article</span>
        </Link>
      )}
    </>
  );
};
