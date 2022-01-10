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
  {
    text: "Games",
    url: "/",
  },
  {
    text: "Nodes",
    url: "/",
  },
  {
    text: "Store",
    url: "/",
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
      <div className="hidden md:block">
        <DesktopHeader />
      </div>
      <div className="md:hidden">
        <MobileHeader />
      </div>
    </div>
  );
};

export default Header;
