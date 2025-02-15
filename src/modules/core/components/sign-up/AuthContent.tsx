"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { TokenValidationForm } from "./SignUpForm";
import { googlelogIn } from "@/app/actions/auth";
import { Button } from "@nextui-org/react";
import { toast } from "sonner";

export type TokenDataType = {
  email: string;
  exp: number;
  generatedToken: string;
  role: string;
};

interface Props {
  tokenData: TokenDataType;
}

export const AuthContent = ({ tokenData }: Props) => {
  const [isTokenValidated, setIsTokenValidated] = useState(false);

  if (!isTokenValidated) {
    return (
      <TokenValidationForm
        generatedToken={tokenData.generatedToken}
        onValidationComplete={() => setIsTokenValidated(true)}
      />
    );
  }

  const handleSignUp = async () => {
    try {
      Cookies.set("intended_role", tokenData.role);
      await googlelogIn();
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <form action={handleSignUp}>
      <Button
        radius="full"
        className="hover-btn border-black font-medium"
        variant="bordered"
        type="submit"
      >
        <span className="z-10 font-medium">Sign up</span>
      </Button>
    </form>
  );
};
