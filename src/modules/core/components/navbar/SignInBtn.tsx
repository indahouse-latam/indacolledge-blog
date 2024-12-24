"use client";

import { googlelogIn } from "@/app/actions/auth";
import { Button } from "@nextui-org/react";
import React from "react";

export const SignInBtn = () => {
  return (
    <form action={googlelogIn}>
      <Button
        radius="full"
        className="hover-btn"
        variant="bordered"
        type="submit"
      >
        <span className="z-10 font-medium">Sign in</span>
      </Button>
    </form>
  );
};
