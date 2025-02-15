"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Author } from "@/types/sanity";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_GOOGLE_ID_QUERY } from "@/sanity/lib/queries";
import { useAuthStore } from "../store/user-store";
import Cookies from "js-cookie";
import { toast } from "sonner";

export const AuthStateSync = () => {
  const { data: session, status } = useSession();
  const setUser = useAuthStore((state) => state.setUser);
  const intendedRole = Cookies.get("intended_role");

  const updateUser = async () => {
    try {
      const response = await fetch("/api/update-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intendedRole }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update role");
      }

      const data = await response.json();
      setUser(data);
      Cookies.remove("intended_role");
    } catch (error) {
      toast.error(error as string);
    }
  };

  useEffect(() => {
    const syncAuthState = async () => {
      if (status === "authenticated" && session?.id) {
        try {
          const userData = await client
            .withConfig({ useCdn: false })
            .fetch<Author>(AUTHOR_BY_GOOGLE_ID_QUERY, {
              id: session.id,
            });

          if (userData) {
            setUser(userData);
          }
        } catch {
          setUser(null);
        }
      } else if (status === "unauthenticated") {
        setUser(null);
      }
    };

    syncAuthState();
    console.log(intendedRole);

    if (intendedRole === "publisher") {
      updateUser();
    }
  }, [session?.id, status, setUser]);

  return null;
};
