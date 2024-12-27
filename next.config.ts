import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  "./src/modules/translations/i18n/request.ts"
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: "incremental",
    after: true,
  },
  devIndicators: {
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition: "bottom-right",
  },
};

export default withNextIntl(nextConfig as NextConfig);
