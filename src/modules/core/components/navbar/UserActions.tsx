import { auth } from "@/modules/auth/auth";
import { SignInBtn } from "./SignInBtn";
import { InviteButton } from "./InviteButton";
import { CreatePostBtn } from "./CreatePostBtn";
import { ProfileDropdown } from "./ProfileDropdown";

export const UserActions = async () => {
  const session = await auth();

  return (
    <>
      {session && session?.user ? (
        <>
          <InviteButton />
          <CreatePostBtn />
          <ProfileDropdown session={session} />
        </>
      ) : (
        <SignInBtn />
      )}
    </>
  );
};
