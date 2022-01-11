import clsx from "clsx";
import Image from "next/image";
import React from "react";
import CardWithIcon from "../components/CardWithIcon";
import GetInTouch from "../components/GetInTouch";
import { headerHeight } from "../components/Header";
import ChartIcon from "../components/icons/ChartIcon";
import StarIcon from "../components/icons/StarIcon";
import UserIcon from "../components/icons/UserIcon";
import { paddingX } from "../utils";

const data = [
  {
    icon: <ChartIcon />,
    title: "Blockchain platform for game studios",
    description:
      "We provide a full suite of blockchain infrastructure on the Myria chain, our Ethereum L2 built for gaming. ",
  },
  {
    icon: <UserIcon />,
    title: "Myria ecosystem fund",
    description:
      "Got an innovative gaming idea? Apply for a grant to manifest your vision on the Myria chain.",
  },
  {
    icon: <StarIcon />,
    title: "Education and support",
    description:
      "Access ongoing education and technical support to ensure a successful onboarding onto the blockchain. ",
  },
];

const Games: React.FC = () => {
  return (
    <div className="text-brand-white bg-dark">
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
          <Image
            src="/images/for-studios/header-bg.png"
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="w-full mx-auto max-w-content ">
          <h1 className="heading-lg md:heading-massive text-brand-white mt-[50px] md:mt-[120px] max-w-[756px] mx-auto text-center">
            Blockchain infrastructure for Game Studios
          </h1>
          <p className="heading-sm max-w-[672px] mx-auto mt-[32px] text-center">
            An end-to-end solution for token-based game economies and NFTs that
            benefits the community
          </p>
        </div>
        <h2 className="heading-md mt-[252px] text-center">What we do</h2>
        <div className="grid md:grid-cols-4 xl:grid-cols-3  gap-y-[78px] gap-x-[32px] mx-auto max-w-content mt-[92px]">
          {data.map((item, idx) => (
            <CardWithIcon
              key={idx}
              icon={item.icon}
              className={clsx("md:col-span-2 xl:col-span-1", {
                "md:col-start-2": idx === 2,
              })}
            >
              <h3 className="heading-sm md:heading-md max-w-[314px] mx-auto">
                {item.title}
              </h3>
              <p className="mt-6 body-sm md:body mb-[62px]">
                {item.description}
              </p>
            </CardWithIcon>
          ))}
        </div>
      </section>
      <section className={clsx(paddingX, "mt-[120px] mb-[200px]")}>
        <div className="mx-auto max-w-content">
          <GetInTouch />
        </div>
      </section>
    </div>
  );
};

export default Games;
