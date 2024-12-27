"use client";

import { Link } from "@/modules/translations/i18n/routing";
import { Button } from "@nextui-org/react";
import React from "react";

export const FormResetBtn = () => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;

    if (form) form.reset();
  };

  return (
    <Button
      type="submit"
      onPress={reset}
      isIconOnly
      radius="full"
      className="search-btn"
    >
      <Link
        href={"/"}
        className="text-white flex items-center justify-center text-xl"
      >
        <i
          className="icon-[line-md--close] text-white"
          role="img"
          aria-hidden="true"
        ></i>
      </Link>
    </Button>
  );
};
