import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  "./src/modules/translations/i18n/request.ts"
);

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);