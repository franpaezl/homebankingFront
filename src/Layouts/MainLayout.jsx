import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow bg-white mx-[50px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
