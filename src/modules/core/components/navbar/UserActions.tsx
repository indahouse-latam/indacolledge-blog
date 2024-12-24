import { auth } from "@/modules/auth/auth";
import { Link } from "@/modules/translations/i18n/routing";
import React from "react";
import { LogOut } from "./LogOut";
import { SignInBtn } from "./SignInBtn";

export const UserActions = async () => {
  const session = await auth();

  return (
    <>
      {session && session?.user ? (
        <>
          <Link href={"/article/create"}>
            <span>Create article</span>
          </Link>
          <LogOut />
          <Link href={`/user/${session?.id}`}>
            <span>{session?.user?.name}</span>
          </Link>
        </>
      ) : (
        <SignInBtn />
      )}
    </>
  );
};
