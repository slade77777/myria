import clsx from "clsx";
import Image from "next/image";
import React from "react";
import GetInTouch from "../components/GetInTouch";
import { headerHeight } from "../components/Header";
import BookIcon from "../components/icons/BookIcon";
import DiscordIcon from "../components/icons/DiscordIcon";
import InstagramIcon from "../components/icons/InstagramIcon";
import MailIcon from "../components/icons/MailIcon";
import MediumIcon from "../components/icons/MediumIcon";
import TelegramIcon from "../components/icons/TelegramIcon";
import TwitterIcon from "../components/icons/TwitterIcon";
import YoutubeIcon from "../components/icons/YoutubeIcon";
import { paddingX } from "../utils";

const Contact: React.FC = () => {
  return (
    <div>
      <section
        style={{
          paddingTop: headerHeight,
          backgroundPositionY: headerHeight,
        }}
        className={clsx(paddingX, "relative isolate md:min-h-screen ")}
      >
        <div
          style={{
            top: headerHeight,
          }}
          className="absolute left-0 h-[783px] w-full z-[-1]"
        >
          <div className="relative w-full h-full ">
            <Image
              src="/images/contact/header-bg.png"
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="w-full mx-auto max-w-content ">
          <h1 className="heading-lg md:heading-massive text-brand-white mt-[50px] md:mt-[120px] max-w-[756px] mx-auto text-center">
            Contact us
          </h1>
          <a
            href="mailto:hello@myria.com"
            className="flex items-center justify-center mt-[35px]"
          >
            <span className="w-[32px]">
              <MailIcon />
            </span>
            <p className="ml-2 text-center body md:body-lg">hello@myria.com</p>
          </a>
        </div>
        <div className="mt-[126px]">
          <GetInTouch />
        </div>
      </section>
      <section className={clsx(paddingX, "mt-[242px] mb-[280px]")}>
        <h3 className="text-center heading-sm md:heading-md">
          Connect with us
        </h3>
        <div className="mt-[48px] grid grid-flow-col gap-4 md:gap-[69px] justify-center">
          <a href="#" className="w-[32px] md:w-[40px]">
            <DiscordIcon />
          </a>
          <a href="#" className="w-[32px] md:w-[40px]">
            <TelegramIcon />
          </a>
          <a href="#" className="w-[32px] md:w-[40px]">
            <TwitterIcon />
          </a>
          <a href="#" className="w-[32px] md:w-[40px]">
            <MediumIcon />
          </a>
          <a href="#" className="w-[32px] md:w-[40px]">
            <YoutubeIcon />
          </a>
          <a href="#" className="w-[32px] md:w-[40px]">
            <InstagramIcon />
          </a>
          <a href="#" className="w-[32px]">
            <BookIcon />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
