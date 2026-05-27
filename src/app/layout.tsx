import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "SkillSphere",
  description: "Online learning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="app-shell">
        <Providers>
          <Navbar />
          <main className="app-main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
