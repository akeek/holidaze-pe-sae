import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div class="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
