import { logOut } from "@/app/actions/auth";
import { Button } from "@nextui-org/react";
import React from "react";

export const LogOut = () => {
  return (
    <form action={logOut}>
      <Button type="submit" variant="solid" className="bg-white">
        <span className="max-sm:hidden">Log out</span>
        <i
          className="icon-[line-md--log-out] size-6 sm:hidden text-red-500"
          role="img"
          aria-hidden="true"
        ></i>
      </Button>
    </form>
  );
};
