import type { Metadata } from "next";
import "./globals.css";
import { Jockey_One } from "next/font/google";

const jockey = Jockey_One({ weight: "400", preload: false });

export const metadata: Metadata = {
  title: "SKS - Portfolio",
  description: "A protfolio that no one asked for",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jockey.className}>{children}</body>
    </html>
  );
}
