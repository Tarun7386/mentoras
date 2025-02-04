import "~/styles/globals.css";
import { Analytics } from '@vercel/analytics/next';
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Providers } from "./_components/provider";
import Nav from "./_components/nav";

export const metadata: Metadata = {
  title: "mentoras",
  description: "Whether you're a learner, educator, or mentor, Mentoras is here to help you grow, learn, and succeed.",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-gradient-to-b text-white from-gray-900 via-[#300171] to-slate-900" >
        <Providers>
        <Nav />
        <TRPCReactProvider>{children}</TRPCReactProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
