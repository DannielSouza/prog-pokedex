import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./_components/header";

export const metadata: Metadata = {
  title: "Pokedex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-[#1C1C1C]">
        <Header />
        <div className="mt-20">{children}</div>
      </body>
    </html>
  );
}
