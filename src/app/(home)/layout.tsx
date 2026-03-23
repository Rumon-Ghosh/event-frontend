import Navbar from "@/components/shared/Navbar";
import React from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      {/* Footer can go here later */}
    </>
  );
}
