import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";
import { addDynamicIconSelectors } from "@iconify/tailwind";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        "no-header": "calc(100vh - 64px)",
      },
      fontFamily: {
        monserrat: "var(--font-monserrat)",
        k2d: "var(--font-k2d)",
      },
      colors: {
        primary: "#27215E",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [nextui(), addDynamicIconSelectors()],
} satisfies Config;
