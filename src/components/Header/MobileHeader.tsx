import React, { useState } from "react";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import CloseIcon from "../icons/CloseIcon";
import Logo from "../icons/Logo";
import MenuIcon from "../icons/MenuIcon";
import { links, headerHeight } from "./Header";
import { Disclosure } from "@headlessui/react";
import clsx from "clsx";

const HeaderOverlay = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex flex-col fixed h-full top-0 left-0 overflow-auto z-10 w-full bg-[#050E15]">
      <nav
        style={{
          height: headerHeight,
        }}
        className="py-4 flex items-center justify-between px-[24px] "
      >
        <div className="w-full max-w-[164px]">
          <Logo />
        </div>
        <button onClick={onClose}>
          <CloseIcon />
        </button>
      </nav>
      <ul className="pb-4 text-white px-[24px] mt-2 grid gap-[33px] content-start text-[18px] leading-[1.25] uppercase font-medium flex-grow overflow-auto">
        {links.map((item, idx) => {
          if (item.children) {
            return (
              <li key={idx} className="">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button as="div">
                        <div
                          className={clsx(
                            "hover:text-brand-gold flex items-center justify-between hover:cursor-pointer",
                            {
                              "text-brand-gold": open,
                            }
                          )}
                        >
                          <span>{item.text}</span>
                          <i
                            className={clsx({
                              "rotate-180": open,
                            })}
                          >
                            <ChevronDownIcon />
                          </i>
                        </div>
                      </Disclosure.Button>
                      <Disclosure.Panel>
                        <div className="">
                          <ul className="text-[16px] bg-dark px-6 pt-6 rounded-lg whitespace-nowrap grid gap-6">
                            {item.children!.map((link, idx) => (
                              <li key={idx}>
                                <a href={link.url} className="text-brand-gold">
                                  {link.text}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
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
    </div>
  );
};

const MobileHeader: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => {
    setOpenMenu((o) => !o);
  };

  return (
    <header>
      <nav className="py-[40px] px-[24px] flex items-center justify-between">
        <div className="w-full max-w-[164px]">
          <Logo />
        </div>
        <button onClick={toggleMenu}>
          <MenuIcon />
        </button>
      </nav>
      {openMenu && <HeaderOverlay onClose={toggleMenu} />}
    </header>
  );
};

export default MobileHeader;
