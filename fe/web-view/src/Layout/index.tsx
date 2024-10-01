import React from "react";
import { ITag } from "../types/interface";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer/>
    </>
  );
};
