import Cookies from "js-cookie";
import { StateStorage } from "zustand/middleware";
import { encryptData, decryptData } from "./encryption";

export const createCookieStorage = (): StateStorage => ({
  getItem: (name: string): string | null => {
    try {
      const value = Cookies.get(name);

      if (!value) {
        return null;
      }

      try {
        const decrypted = decryptData(value);
        return decrypted;
      } catch {
        return null;
      }
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    try {
      const encrypted = encryptData(value);
      Cookies.set(name, encrypted, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    } catch (error) {
      console.error("Error setting cookie:", error);
    }
  },
  removeItem: (name: string): void => {
    Cookies.remove(name);
  },
});
