"use client";

import { useState } from "react";
import { TokenValidationForm } from "./SignUpForm";
import { googlelogIn } from "@/app/actions/auth";
import { Button } from "@nextui-org/react";

export function AuthContent() {
  const [isTokenValidated, setIsTokenValidated] = useState(false);

  if (!isTokenValidated) {
    return (
      <TokenValidationForm
        onValidationComplete={() => setIsTokenValidated(true)}
      />
    );
  }

  return (
    <form action={() => googlelogIn(true)}>
      <Button
        radius="full"
        className="hover-btn border-black font-medium"
        variant="bordered"
        type="submit"
      >
        <span className="z-10 font-medium">Sign in</span>
      </Button>
    </form>
  );
}
