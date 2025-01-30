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
      if (account?.provider === "google" && profile) {
        const googleId = profile?.sub;
        if (!googleId) {
          return token;
        }

        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
            id: googleId,
          });

        token.id = user?._id;
        token.role = user?.role;
      }
      return token;
    },

    async session({ session, token }) {
      Object.assign(session, {
        id: token.id,
        role: token.role,
      });
      return session;
    },
  },
});
