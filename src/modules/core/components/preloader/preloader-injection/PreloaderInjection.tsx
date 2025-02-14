"use client";

import { AnimatePresence } from "framer-motion";
import { Preloader } from "../Preloader";
import { useHome } from "./preloader-injection.hook";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const PreloaderComponent = () => {
  const { isLoading } = useHome();
  const [updateStatus, setUpdateStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const intendedRole = Cookies.get("intended_role");

  const updateUser = async () => {
    try {
      setUpdateStatus("loading");
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
      console.log(data.user);
      setUpdateStatus("success");
      Cookies.remove("intended_role");
    } catch (error) {
      console.error("Error updating role:", error);
      setUpdateStatus("error");
    }
  };

  useEffect(() => {
    if (intendedRole === "publisher") {
      updateUser();
    }
  }, [intendedRole]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      {updateStatus === "error" && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-md shadow-lg">
          Failed to update role. Please try again later.
        </div>
      )}
    </>
  );
};
