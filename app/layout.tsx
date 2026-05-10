import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
export const metadata: Metadata = { title:"Барилгын материал", description:"Барилгын материалын барааны танилцуулга" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="mn"><body><Header />{children}</body></html>;
}
