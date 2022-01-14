import clsx from "clsx";
import { headerHeight } from "../components/Header";
import DiscordIcon from "../components/icons/DiscordIcon";
import OurGames from "../components/OurGames";
import Image from "next/image";
import JoinTheRevolution from "../components/JoinTheRevolution";
import ExperenceLogos from "../components/ExperienceLogos";
import { paddingX } from "../utils";
import ArrowDownIcon from "../components/icons/ArrowDownIcon";

const Home = () => {
  return (
    <div>
      <section
        style={{
          paddingTop: headerHeight,
          paddingBottom: headerHeight,
        }}
        className={clsx(
          paddingX,
          "flex flex-col items-center justify-center min-h-[926px] relative isolate md:min-h-screen "
        )}
      >
        <div className="absolute top left-0 h-full w-full z-[-1]">
          <div className="relative w-full h-full ">
            <Image
              src="/images/home/header-bg.png"
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="max-w-[607px] text-center">
          <h1 className="heading-lg md:heading-massive text-brand-white">
            Connecting the world through{" "}
            <span className=" text-brand-gold">play</span>
          </h1>
          <h3 className="heading-sm-mobile md:heading-sm mt-6 md:mt-[32px]">
            Myria is a community driven platform that empowers gamers, studios,
            and creators.
          </h3>
          <button className="mt-[38px] btn-icon md:btn-icon btn-primary flex items-center mx-auto">
            <span className="w-[30px]">
              <DiscordIcon />
            </span>
            <span>JOIN DISCORD</span>
          </button>
          <a
            href="#our-games"
            className="md:hidden flex items-center justify-center mt-[237px] bg-[#96C5DF] w-[64px] h-[64px] rounded-full mx-auto bg-opacity-20"
          >
            <span className="w-[40px]">
              <ArrowDownIcon />
            </span>
          </a>
        </div>
      </section>
      <section id="our-games" className={clsx("pt-[14px]", paddingX)}>
        <h2 className="text-center heading-md md:heading-lg">Our games</h2>
        <div className="mt-10 md:mt-[58px] max-w-content mx-auto">
          <OurGames />
        </div>
      </section>
      <section
        className={clsx(
          "mt-[100px] md:mt-0 md:min-h-[1100px] flex items-center justify-center relative isolate",
          paddingX
        )}
      >
        <div className="absolute inset-0 z-[-1]">
          <Image
            src="/images/home/blockchain-bg.png"
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="max-w-content w-full mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-y-[53px] gap-x-[83px]">
          <div>
            <Image
              src="/images/home/character-circle-2.png"
              alt=""
              layout="responsive"
              width={950}
              height={942}
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="heading-md md:heading-lg text-[#FFFDFD]">
              An ecosystem of blockchain-powered games
            </h2>
            <p className="mt-6 body-sm md:body-lg text-light">
              Our range of free-to-play AAA games spans across an entire
              interconnected ecosystem. Players experience intertwining lore,
              characters, and rich storylines that carry across each game world,
              and Myria tokens and NFTs can be used across the Myriaverse.
            </p>
            <button className="btn-lg btn-primary mt-[45px]">LEARN MORE</button>
          </div>
        </div>
      </section>
      <section
        className={clsx(
          "mt-[130px] md:mt-0 md:min-h-[790px] grid grid-cols-1 grid-rows-1 items-center justify-center py-10 relative isolate"
        )}
      >
        <video
          autoPlay
          muted
          loop
          className="h-full w-full [grid-area:1/1/-1/-1]"
        >
          <source src="/images/home/video-bg.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        <div
          className={clsx(
            paddingX,
            "[grid-area:1/1/-1/-1] z-[1] flex items-center justify-center"
          )}
        >
          <div className="w-full text-center max-w-content md:text-left">
            <div>
              <p className="caption text-brand-light-blue">Grow with myria</p>
              <h2 className="mt-4 heading-md md:heading-lg">
                Join the thriving Myria ecosystem{" "}
              </h2>
              <div className="max-w-[616px] mt-6 text-light body-sm md:body-lg">
                <p className="">
                  Get the latest updates on our games, token and NFT releases,
                  play-to-earn mechanics, and have the opportunity to access
                  alpha gameplay.
                </p>
                <p className="mt-6">
                  Operate a Myria node from your home computer and earn rewards
                  for your contribution to the network.
                </p>
              </div>
              <div className="justify-center md:justify-start flex items-center mt-[60px]">
                <button className="flex items-center btn-icon btn-white">
                  <span className="w-[30px]">
                    <DiscordIcon />
                  </span>
                  <span>JOIN DISCORD</span>
                </button>
                <button className="btn-lg btn-primary ml-4 md:ml-[31px]">
                  RUN A NODE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={clsx(paddingX, "mt-[152px] md:mt-[128px]")}>
        <div className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[32px]">
          <div className="relative isolate p-[32px] md:p-10 h-[470px] md:h-[540px] bg-brand-deep-blue rounded-[20px]">
            <div className="absolute inset-0 z-[-1]">
              <Image
                src="/images/home/for-gamers.png"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h2 className="heading-md md:heading-lg">For Gamers</h2>
            <p className="mt-4 md:mt-6 body md:body-lg max-w-[284px] text-light">
              Discover the best games built on the blockchain
            </p>
            <button className="mt-6 md:mt-10 btn-lg btn-primary">
              Learn more
            </button>
          </div>
          <div className="relative isolate p-[32px] md:p-10 h-[470px] md:h-[540px] bg-brand-deep-blue rounded-[20px]">
            <div className="absolute inset-0 z-[-1]">
              <Image
                src="/images/home/for-studios.png"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h2 className="heading-md md:heading-lg">For Studios</h2>
            <p className="mt-4 md:mt-6 body md:body-lg max-w-[310px] text-light">
              Myria helps studios join the blockchain revolution
            </p>
            <button className="mt-6 md:mt-10 btn-lg btn-primary">
              Learn more
            </button>
          </div>
        </div>
      </section>
      <section className={clsx(paddingX, "mt-[168px] hidden md:block")}>
        <h1 className="heading-massive max-w-[1024px] text-center mx-auto">
          Founded by leading gaming and blockchain industry veterans
        </h1>
        <p className="max-w-[717px] text-center mx-auto body-lg mt-[32px] text-light">
          Myria has been built by an all-star team of over 100 people, united
          with a common vision of revolutionizing gaming with blockchain
          technology.{" "}
        </p>
        <button className="flex mx-auto mt-10 btn-lg btn-primary">
          MEET THE TEAM
        </button>
      </section>
      <section className={clsx(paddingX, "mt-[123px] md:mt-[152px]")}>
        <h2 className="text-center heading-md md:heading-lg">Our Experience</h2>
        <div className="mt-[59px]">
          <ExperenceLogos />
        </div>
      </section>
      <section
        className={clsx(
          paddingX,
          "mt-[122px] md:mt-[168px] mb-[156px] md:mb-[168px]"
        )}
      >
        <div className="mx-auto max-w-content">
          <JoinTheRevolution />
        </div>
      </section>
    </div>
  );
};

export default Home;
