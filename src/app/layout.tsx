import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import SessionProviderWrapper from "~/components/SessionProviderWrapper";
import Header from "~/components/header";
import Footer from "~/components/footer";

export const metadata: Metadata = {
  title: "Captureit.",
  description: "Captureit is a modern website for sharing images and gifs.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <SessionProviderWrapper>
          <Header />
          {children}
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}