import type { Metadata } from "next";
import { K2D, Montserrat } from "next/font/google";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Providers } from "@/modules/common/providers/Providers";
import "./globals.css";
import "easymde/dist/easymde.min.css";
import { SessionProvider } from "next-auth/react";

type Params = Promise<{ locale: string }>;

const MontserratFont = Montserrat({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-monserrat",
});

const K2DFont = K2D({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-k2d",
});

export const metadata: Metadata = {
  title: "indacolledge",
  description:
    "Learn and study with the Indahouse team through curated blog content.",
  openGraph: {
    title: "indacolledge",
    description:
      "Learn and study with the Indahouse team through curated blog content.",
    images: [
      {
        url: "/indahouse.jpg",
        width: 1200,
        height: 630,
        alt: "indacolledge - Learn and study with the Indahouse team",
      },
    ],
    type: "website",
    locale: "en_US",
    url: "https://yourwebsiteurl.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "indacolledge",
    description:
      "Learn and study with the Indahouse team through curated blog content.",
    images: ["/indahouse.jpg"],
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const locale = (await params).locale;

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${K2DFont.variable} ${MontserratFont.variable} text-primary antialiased font-monserrat w-screen overflow-x-hidden`}
      >
        <NextIntlClientProvider messages={messages}>
          <SessionProvider>
            <Providers>{children}</Providers>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
