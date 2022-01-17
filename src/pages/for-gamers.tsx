import clsx from "clsx";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { headerHeight } from "../components/Header";
import LoveIcon from "../components/icons/LoveIcon";
import SafetyIcon from "../components/icons/SafetyIcon";
import UserIcon from "../components/icons/UserIcon";
import OurGames from "../components/OurGames";
import Page from "../components/Page";
import { paddingX } from "../utils";

const principles = [
  {
    icon: (
      <div className="w-[32px]">
        <LoveIcon />
      </div>
    ),
    title: "Gameplay first",
    description:
      "Myria develops fun AAA games that are enhanced by the blockchain, not vice versa. ",
  },
  {
    icon: (
      <div className="w-[32px]">
        <SafetyIcon />
      </div>
    ),
    title: "Empowering players",
    description:
      "We believe players should have true verifiable ownership and control over in-game assets. ",
  },
  {
    icon: (
      <div className="w-[32px]">
        <UserIcon />
      </div>
    ),
    title: "Powered by the community",
    description:
      "Myria is supported by a network of community-powered nodes, who receive rewards for their contributions. ",
  },
];

const ForGamers: React.FC = () => {
  const [currentPrinciple, setCurrentPrinciple] = useState(0);

  const elRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      let idx = currentPrinciple;
      for (let i = 0; i < elRefs.current.length; i++) {
        const el = elRefs.current[i];
        const elInfo = el?.getBoundingClientRect();
        if (elInfo && elInfo.top > 100 && elInfo.top < 300) {
          idx = i;
        }
      }
      setCurrentPrinciple(idx);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPrinciple]);

  return (
    <Page>
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
            className="absolute left-0 h-[783px] w-full z-[-2]"
          >
            <div className="relative w-full h-full ">
              <Image
                src="/images/header-bg.png"
                alt=""
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
          </div>
          <div className="absolute left-0 bottom-0 z-[-1] w-[910px] max-w-full">
            <Image
              src="/images/for-gamers/game.png"
              alt=""
              layout="responsive"
              objectFit="cover"
              width={910}
              height={1047}
            />
          </div>
          <div className="w-full mx-auto max-w-content ">
            <h1 className="heading-lg md:heading-massive text-brand-white mt-[50px] md:mt-[120px] max-w-[607px] mx-auto text-center">
              Connecting the world through{" "}
              <span className=" text-brand-gold">play</span>
            </h1>
            <div className="md:w-1/2 ml-auto mt-[200px] md:mt-[424px] lg:pr-[100px] md:pb-[148px]">
              <p className="caption text-brand-light-blue">
                SHIFTING POWER BACK TO THE PEOPLE
              </p>
              <h3 className="mt-2 heading-sm md:heading-md">Our Principles</h3>
              <div>
                {principles.map((item, idx) => (
                  <div
                    ref={(el) => (elRefs.current[idx] = el)}
                    style={{
                      boxShadow: "0px 0px 40px 10px rgba(0, 0, 0, 0.3)",
                    }}
                    className={clsx(
                      "flex items-start p-6 mt-6 rounded-[20px] opacity-50 transition duration-300",
                      {
                        "bg-brand-deep-blue !opacity-100":
                          idx == currentPrinciple,
                      }
                    )}
                    key={idx}
                  >
                    <div className="w-[32px] flex-shrink-0">{item.icon}</div>
                    <div className="ml-4">
                      <h4 className="font-bold text-[24px] leading-[1.25]">
                        {item.title}
                      </h4>
                      <p className="mt-2 body text-light">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, "mt-[53px]")}>
          <div className="mx-auto max-w-content">
            <h3 className="text-center heading-sm md:heading-md">Our games</h3>
            <div className="mt-[48px]">
              <OurGames />
            </div>
          </div>
        </section>
        <section
          className={clsx(
            paddingX,
            "w-full mt-[115px] mb-[180px] flex flex-col justify-center min-h-[792px]  bg-[url('/images/nodes/globe.png')] bg-no-repeat md:bg-right bg-center"
          )}
        >
          <div className="mx-auto max-w-content ">
            <div className="md:w-1/2">
              <h3 className="heading-sm md:heading-md">
                Pupose-built infrastructure
              </h3>
              <p className="mt-6 body">
                The Myria ecosystem is built on Myria blockchain, our Ethereum
                L2 built for gaming. Our team have developed proprietary
                technology to make the gaming and trading experience seamless,
                including a decentralized exchange, marketplace, and
                cryptocurrency wallet.
              </p>
              <button className="mt-10 btn-lg btn-primary">GET A NODE</button>
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
};

export default ForGamers;
