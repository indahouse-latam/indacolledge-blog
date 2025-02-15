"use client";

import { Link } from "@/modules/translations/i18n/routing";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { Session } from "next-auth";
import { LogOut } from "./LogOut";

interface Props {
  session: Session;
}

export const ProfileDropdown = ({ session }: Props) => {
  return (
    <Dropdown>
      <DropdownTrigger className="p-2">
        <Button variant="light">
          <User
            avatarProps={{
              src: session.user?.image as string,
            }}
            description={session.user?.email}
            name={session.user?.name}
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem as={Link} href={`/user/${session?.id}`} key="profile">
          <span>Profile</span>
        </DropdownItem>
        <DropdownItem key="Log out" className="p-2">
          <LogOut />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
