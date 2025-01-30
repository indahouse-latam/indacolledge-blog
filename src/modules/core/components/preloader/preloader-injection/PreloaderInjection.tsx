"use client";

import { AnimatePresence } from "framer-motion";
import { Preloader } from "../Preloader";
import { useHome } from "./preloader-injection.hook";
import { auth } from "@/modules/auth/auth";
import Cookies from "js-cookie";
import { useEffect } from "react";

export const PreloaderComponent = () => {
  const { isLoading } = useHome();

  const intendedRole = Cookies.get("intended_role");

  const updateUser = async () => {
    if (intendedRole === "publisher") {
      await fetch("/api/update-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intendedRole }),
      });
      Cookies.remove("intended_role");
    }
  };

  useEffect(() => {
    if (intendedRole === "publisher") {
      updateUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
  );
};
