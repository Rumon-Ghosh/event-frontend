import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// Geist_Mono removed as it is not currently used in the UI


export const metadata: Metadata = {
  title: "EventEra |Event Platform",
  description: "Event platform application",
};

import { AuthProvider } from "@/providers/AuthProvider";

import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="bottom-right" reverseOrder={false} />
      </body>
    </html>
  );
}
