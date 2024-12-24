import { Link } from "@/modules/translations/i18n/routing";
import { Image } from "@nextui-org/react";
import React from "react";
import { UserActions } from "./UserActions";

export const Navbar = async () => {
  return (
    <header className="px-5 py-3 shadow-sm flex items-center justify-between">
      <nav className="flex items-center justify-between w-full">
        <Link href="/">
          <Image
            src="/logo-indahouse.svg"
            alt="Indahouse"
            width={144}
            height={30}
          />
        </Link>
        <div className="flex items-center gap-5">
          <UserActions />
        </div>
      </nav>
    </header>
  );
};
