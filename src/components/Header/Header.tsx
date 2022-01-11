import React from "react";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

type NavItem = {
  text: string;
  url?: string;
  children?: NavItem[];
};

export const links: NavItem[] = [
  {
    text: "Home",
    url: "/",
  },
  {
    text: "About",
    children: [
      {
        text: "Our team",
        url: "/about-us",
      },
      {
        text: "For gamers",
        url: "/for-gamers",
      },
      {
        text: "For studios",
        url: "/for-studios",
      },
    ],
  },
  {
    text: "Games",
    url: "/games",
  },
  {
    text: "Nodes",
    url: "/nodes",
  },
  {
    text: "Store",
    url: "/store",
  },
  {
    text: "Community",
    children: [
      {
        text: "Our team",
        url: "/",
      },
      {
        text: "For gamers",
        url: "/",
      },
      {
        text: "For studio",
        url: "/",
      },
    ],
  },
];

export const headerHeight = 112;

const Header: React.FC = () => {
  return (
    <div className="absolute top-0 z-10 w-full">
      <div className="hidden lg:block">
        <DesktopHeader />
      </div>
      <div className="lg:hidden">
        <MobileHeader />
      </div>
    </div>
  );
};

export default Header;
