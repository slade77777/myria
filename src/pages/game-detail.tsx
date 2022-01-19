/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";
import { headerHeight } from "../components/Header";
import DiscordIcon from "../components/icons/DiscordIcon";
import Page from "../components/Page";
import { paddingX } from "../utils";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FirstSlider from "../components/game-detail/FirstSlider";
import SecondSlider from "../components/game-detail/SecondSlider";

export type Asset = {
  type: "video" | "image";
  src: string;
  image?: string;
};

const assets: Asset[] = [
  {
    type: "video",
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    image: "/images/game-detail/metarush-bg.png",
  },
  {
    type: "image",
    src: "/images/game-detail/metarush-bg.png",
  },
  {
    type: "image",
    src: "/images/game-detail/metarush-bg.png",
  },
  {
    type: "image",
    src: "/images/game-detail/metarush-bg.png",
  },
  {
    type: "image",
    src: "/images/game-detail/metarush-bg.png",
  },
  {
    type: "image",
    src: "/images/game-detail/metarush-bg.png",
  },
  {
    type: "image",
    src: "/images/game-detail/metarush-bg.png",
  },
];

const gameInfo = [
  {
    label: "Developer",
    value: "MYRIA",
  },
  {
    label: "Platform",
    value: "PC, IOS, ANDROID",
  },
  {
    label: "Genre",
    value: "BATTLE ROYALE",
  },
  {
    label: "Status",
    value: "LIVE",
  },
];

const GameDetail: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Page>
      <div>
        <section
          style={{
            paddingTop: headerHeight,
            backgroundPositionY: headerHeight,
          }}
          className={clsx(
            paddingX,
            "relative isolate md:min-h-screen mb-[120px] "
          )}
        >
          <div
            style={{
              top: headerHeight,
            }}
            className="absolute left-0 h-[783px] w-full z-[-1]"
          >
            <div className="relative w-full h-full ">
              <Image
                src="/images/header-bg.png"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="w-full mx-auto mt-10 max-w-content">
            <h3 className="font-extrabold heading-lg">Metarush</h3>
            <div className="flex flex-col lg:flex-row mt-[32px] lg:items-start">
              <div className="lg:w-[calc((100%-32px)*0.675)]">
                <div>
                  <FirstSlider
                    currentSlide={currentSlide}
                    setCurrentSlide={setCurrentSlide}
                    assets={assets}
                  />
                </div>
                <div className="mt-6">
                  <SecondSlider
                    currentSlide={currentSlide}
                    setCurrentSlide={setCurrentSlide}
                    assets={assets}
                  />
                </div>
                <p className="mt-[70px] body-lg">
                  A hilarious multiplayer game that will have your sides
                  splitting as you bounce, tumble, and bowl over your friends
                  and foes. Battle it out through increasingly wacky landscapes
                  and claim your spot in the hall of glory.
                </p>
                <div className="mt-[84px]">
                  <Image
                    src="/images/game-detail/metarush-bg.png"
                    alt=""
                    width={832}
                    height={372}
                  />
                </div>
                <div className="mt-[48px] ">
                  <h4 className="heading-sm">About the game</h4>
                  <p className="mt-6 body text-light">
                    The aim is simple. Get to the finish line first and don’t
                    fall to your doom while trying. Each match starts a horde of
                    players, who get eliminated through a series of obstacle
                    course challenges. Players continue to battle it out in
                    rounds with increasing difficulty until there is one final
                    winner left standing.{" "}
                  </p>
                </div>
                <div className="mt-[48px] ">
                  <h4 className="heading-sm">Play to earn</h4>
                  <p className="mt-6 body text-light">
                    Victory gets you more than street cred and bragging rights.
                    Saunter off the podium with tokens and NFTs in your pouch to
                    upgrade your avatar or use across the Myriaverse.
                  </p>
                </div>
                <div className="mt-[48px] ">
                  <h4 className="heading-sm">Massively multiplayer</h4>
                  <p className="mt-6 body text-light">
                    Join in with the masses of other competitors online, or
                    bring your friends and make it a party!
                  </p>
                </div>
                <div className="mt-[48px] ">
                  <h4 className="heading-sm">Battle in style</h4>
                  <p className="mt-6 body text-light">
                    Are you a stone-cold fashion killer or just here for the
                    lols? Customize your avatar to reflect your unique style,
                    with accessories that you actually own on the blockchain.
                  </p>
                </div>
              </div>
              <div className="lg:sticky top-5 order-[-1] mb-6 lg:mb-0 lg:order-1 lg:ml-[32px] lg:w-[calc((100%-32px)*0.325)]">
                <div className="lg:hidden">
                  <Image
                    src="/images/game-detail/metarush-alt.png"
                    alt=""
                    width={382}
                    height={256}
                    layout="responsive"
                  />
                </div>
                <div className="hidden lg:block px-[30px]">
                  <Image
                    src="/images/game-detail/metarush.png"
                    alt=""
                    width={865}
                    height={145}
                  />
                </div>
                <div className="flex flex-col mt-[32px] bg-brand-deep-blue p-[32px] rounded-[20px]">
                  <div className="grid gap-6">
                    {gameInfo.map((item, idx) => (
                      <div
                        className="flex items-center justify-between"
                        key={idx}
                      >
                        <p className="body-sm">{item.label}</p>
                        <div className="py-[7px] px-[12px] caption font-bold bg-[#0F2F45] rounded-[8px] text-brand-light-blue">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="order-[-1] mb-6 md:mb-0 md:mt-[48px] md:order-1 ">
                    <button
                      className="justify-center w-full btn-lg bg-[rgba(255,255,255,0.2)] text-[rgba(255,255,255,0.4)]"
                      disabled
                    >
                      IN DEVELOPMENT
                    </button>
                    <button className="flex items-center justify-center w-full mt-6 btn-icon btn-white">
                      <span className="w-[30px]">
                        <DiscordIcon />
                      </span>
                      <span>JOIN DISCORD</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
};

export default GameDetail;
