import clsx from "clsx";
import React from "react";
import { paddingX } from "../utils";
import Footer from "./Footer";
import Header from "./Header";

const Page: React.FC = ({ children }) => {
  return (
    <div className="min-h-screen text-white bg-dark">
      <Header />
      {children}
      <div className={clsx(paddingX, "pb-[149px] md:pb-[112px]")}>
        <div className="mx-auto max-w-content">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Page;
