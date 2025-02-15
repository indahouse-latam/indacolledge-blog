import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_GOOGLE_ID_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "google") {
        return true;
      }

      const googleId = profile?.sub;
      if (!googleId) {
        return false;
      }

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, { id: googleId });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          _id: googleId,
          id: googleId,
          name: user.name,
          username: profile?.nickname,
          hashPassword: "",
          email: user.email,
          image: user.image,
          bio: profile?.bio || "",
          role: "viewer",
        });
      }

      return true;
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.sub = profile.sub as string | undefined;
        token.googleId = profile.sub;

        const sanityUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
            id: profile.sub,
          });

        if (sanityUser) {
          token.role = sanityUser.role;
          token.sanityId = sanityUser._id;
        }
      }

      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        id: token.googleId,
        role: token.role,
      };
    },
  },
});
