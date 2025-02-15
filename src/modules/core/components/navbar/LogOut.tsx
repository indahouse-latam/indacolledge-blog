"use client";

import { useAuthStore } from "@/modules/auth/store/user-store";
import { Button } from "@nextui-org/react";

export const LogOut = () => {
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <Button
      onPress={signOut}
      type="submit"
      variant="light"
      className="p-0 m-0 min-h-0 h-[32px] text-red-500"
      endContent={
        <i
          className="icon-[line-md--log-out] size-4"
          role="img"
          aria-hidden="true"
        ></i>
      }
    >
      <span>Log out</span>
    </Button>
  );
};
