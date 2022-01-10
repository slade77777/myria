import React from "react";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import Logo from "../icons/Logo";
import { links, headerHeight } from "./Header";

const DesktopHeader: React.FC = () => {
  return (
    <header>
      <nav
        style={{
          height: headerHeight,
        }}
        className="py-4 px-[54px] flex items-center justify-between"
      >
        <div className="w-full max-w-[164px]">
          <Logo />
        </div>
        <div className="flex items-center ml-4">
          <ul className="text-[14px] leading-[1.25] uppercase font-medium grid grid-flow-col gap-[38px] items-center mr-auto text-brand-white">
            {links.map((item, idx) => {
              if (item.children) {
                return (
                  <li key={idx} className="relative group">
                    <div className="flex items-center hover:text-brand-gold hover:cursor-pointer">
                      {item.text}
                      <i>
                        <ChevronDownIcon />
                      </i>
                    </div>
                    <div className="absolute hidden pt-4 group-hover:block -left-1/2 top-full">
                      <ul className="bg-dark px-6 py-4 pr-[63px] rounded-lg whitespace-nowrap grid gap-6">
                        {item.children.map((link, idx) => (
                          <li key={idx}>
                            <a
                              href={link.url}
                              className="hover:text-brand-gold"
                            >
                              {link.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              } else {
                return (
                  <li key={idx}>
                    <a href={item.url} className="hover:text-brand-gold">
                      {item.text}
                    </a>
                  </li>
                );
              }
            })}
          </ul>
          <button className="btn-sm btn-primary lg:ml-[50px] xl:ml-[172px]">
            Sign up
          </button>
          <button className="btn-sm btn-secondary ml-[21px]">Log in</button>
        </div>
      </nav>
    </header>
  );
};

export default DesktopHeader;
