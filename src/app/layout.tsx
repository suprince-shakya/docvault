import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import RootProvider from "@/lib/providers/RootProvider";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DocVault | Storage Management",
  description: "Storage management system",
  openGraph: {
    title: "DocVault | Storage Management",
    url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    siteName: "DocVault | Storage Management",
    type: "website",
    // images: [
    //   {
    //     url: `${process.env.NEXT_PUBLIC_APP_URL}/opengraph-image.png`,
    //   },
    // ],
    description: "",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ToastContainer />
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
