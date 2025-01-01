"use server";

import { signIn, signOut } from "@/modules/auth/auth";

export const logOut = async () => {
  await signOut({ redirectTo: "/en" });
};

export const googlelogIn = async (isToSignUp: boolean) => {
  await signIn("google", { callbackUrl: "/", state: { isToSignUp } });
};

export const credentialslogIn = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    // // Fetch the user by email
    // const dbUser = await client
    //   .withConfig({ useCdn: false })
    //   .fetch(AUTHOR_BY_EMAIL_QUERY, { email });

    // return dbUser;
  } catch (error) {
    throw error;
  }
};
