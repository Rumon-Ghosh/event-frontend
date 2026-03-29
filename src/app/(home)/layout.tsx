import AiForm from "@/components/form/AiForm";
import Footer from "@/components/home/Footer";
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
      <div className="fixed bottom-5 right-5 z-50">
        <AiForm></AiForm>
      </div>
      <Footer></Footer>
    </>
  );
}
