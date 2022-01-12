import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { headerHeight } from "../components/Header";
import Input from "../components/Input";
import JoinTheRevolution from "../components/JoinTheRevolution";
import OurGames from "../components/OurGames";
import { paddingX } from "../utils";

const Games: React.FC = () => {
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
          <Image
            src="/images/games/header-bg.png"
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="w-full mx-auto max-w-content ">
          <h1 className="heading-lg md:heading-massive text-brand-white mt-[50px] md:mt-[120px] text-center">
            Our games
          </h1>
          <div className="mt-[100px] md:mt-[180px]">
            <OurGames />
          </div>
          <div className="mt-[32px] py-[26px] px-[32px] text-right bg-brand-deep-blue rounded-[20px]">
            <p className="body-md md:body-lg">More games coming soon...</p>
          </div>
        </div>
      </section>
      <section className={clsx(paddingX, "mt-[150px] ")}>
        <div className="grid items-center gap-6 mx-auto md:grid-cols-2 max-w-content">
          <div>
            <Image
              src="/images/games/reward.png"
              alt=""
              width={1757}
              height={1368}
              layout="responsive"
            />
          </div>
          <div className="xl:pr-[100px] text-center md:text-left">
            <h2 className="heading-sm md:heading-md">
              Start playing and earning rewards
            </h2>
            <p className="mt-6 body md:body-lg text-light">
              Our games offer a range of play-to-earn mechanics that reward
              players with cryptocurrency and NFTs for their efforts.
            </p>
            <p className="mt-6 body md:body-lg text-light">
              Unlike most blockchain games, all of our games are free-to-play.
            </p>
          </div>
        </div>
      </section>
      <section className={clsx(paddingX, "mt-[150px] ")}>
        <div className="grid items-center gap-6 mx-auto md:grid-cols-2 max-w-content">
          <div>
            <Image
              src="/images/games/reward.png"
              alt=""
              width={1757}
              height={1368}
              layout="responsive"
            />
          </div>
          <div className="xl:pl-[100px] text-center md:text-left md:order-[-1]">
            <h2 className="heading-sm md:heading-md">
              Buy limited founding NFTs
            </h2>
            <p className="mt-[38px] body md:body-lg text-light">
              Myria are releasing limited drops of exclusive founding Myria
              land, avatars, and skins. These items will never be made available
              to the public again and will forever commemorate holders as
              pioneers in the Myriaverse.
            </p>
            <button className="mt-10 btn-lg btn-primary">Learn more</button>
          </div>
        </div>
      </section>
      <section className={clsx(paddingX, "mt-[218px]")}>
        <div className="mx-auto max-w-content">
          <JoinTheRevolution />
        </div>
      </section>
      <section
        className={clsx(paddingX, "mt-[168px] mb-[156px] md:mb-[180px]")}
      >
        <div
          style={{
            boxShadow: "0px 0px 40px 10px rgba(0, 0, 0, 0.3)",
          }}
          className="max-w-content mx-auto bg-[url('/images/games/panel.png')] bg-cover bg-center rounded-[20px] flex flex-col items-center md:py-[158px] p-[32px]"
        >
          <h2 className="text-center heading-sm md:heading-md">
            Pre register to stay up to date
          </h2>
          <div className="max-w-[585px] w-full mt-6 ">
            <p className="text-center body text-light">
              Sign up to our newsletter to for development updates, token and
              NFT drops, and exclusive promotions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] mt-1 gap-4">
              <Input placeholder="Enter your email address" />
              <button className="btn-lg btn-primary">SUBMIT</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Games;
