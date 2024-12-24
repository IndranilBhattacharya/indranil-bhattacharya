import React, { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";

import Navigation from "../Navigation/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-black text-gray-100 font-poppins text-sm`}
    >
      <Navigation />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
