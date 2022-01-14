import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { headerHeight } from "../components/Header";
import ChartIcon from "../components/icons/ChartIcon";
import StarIcon from "../components/icons/StarIcon";
import UserIcon from "../components/icons/UserIcon";
import { paddingX } from "../utils";
import CareersSection from "../components/Careers";
import CardWithIcon from "../components/CardWithIcon";
import TwitterWithBackgroundIcon from "../components/icons/TwitterWithBackgroundIcon";
import LinkedinWithBackgroundIcon from "../components/icons/LinkedinWithBackgroundIcon";

const values = [
  {
    icon: (
      <div className="w-[64px]">
        <UserIcon />
      </div>
    ),
    title: "Play to win",
    description: "We set big goals and play hard to be market leaders",
  },
  {
    icon: (
      <div className="w-[64px]">
        <ChartIcon />
      </div>
    ),
    title: "Win as a team",
    description: "We believe in collaboration and win big as a team",
  },
  {
    icon: (
      <div className="w-[64px]">
        <StarIcon />
      </div>
    ),
    title: "Open communication",
    description: "We believe in open, transparent communication",
  },
  {
    icon: (
      <div className="w-[64px]">
        <UserIcon />
      </div>
    ),
    title: "Inclusivity",
    description:
      "We celebrate diversity with a global team and seek to hear all voices",
  },
  {
    icon: (
      <div className="w-[64px]">
        <ChartIcon />
      </div>
    ),
    title: "Be game changers",
    description: "We question everything to find new ways to innovate",
  },
  {
    icon: (
      <div className="w-[64px]">
        <StarIcon />
      </div>
    ),
    title: "Have an impact",
    description:
      "We want to be a gateway to onboard the world onto the blockchain",
  },
];

const team = [
  {
    image: "/images/careers/person-1.png",
    name: "John Williams",
    position: "Founder and CEO",
    description:
      "Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade. Hoodie pop-up ethical subway tile, pok pok adaptogen thundercats hexagon cold-pressed man bun hell of.",
    socials: {
      twitter: "https://abc.com",
      linkedin: "https://abc.com",
    },
  },
  {
    image: "/images/careers/person-2.png",
    name: "John Williams",
    position: "Founder and CEO",
    description:
      "Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade. Hoodie pop-up ethical subway tile, pok pok adaptogen thundercats hexagon cold-pressed man bun hell of.",
    socials: {
      twitter: "https://abc.com",
      linkedin: "https://abc.com",
    },
  },
  {
    image: "/images/careers/person-3.png",
    name: "John Williams",
    position: "Founder and CEO",
    description:
      "Gluten-free squid man braid, mlkshk offal bespoke lomo biodiesel direct trade. Hoodie pop-up ethical subway tile, pok pok adaptogen thundercats hexagon cold-pressed man bun hell of.",
    socials: {
      twitter: "https://abc.com",
      linkedin: "https://abc.com",
    },
  },
];

const Careers: React.FC = () => {
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
              src="/images/careers/header-bg.png"
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="w-full mx-auto max-w-content">
          <h1 className="heading-lg md:heading-massive text-brand-white mt-[50px] md:mt-[120px] max-w-[756px] mx-auto text-center">
            Myria Careers
          </h1>
          <p className="body md:body-lg max-w-[632px] mx-auto mt-[32px] text-center">
            Myria is a community driven platform that empowers gamers, studios,
            and creators.
          </p>
          <div className="grid md:grid-cols-2 gap-[32px] mt-[170px] items-center">
            <div className="md:order-1">
              <Image
                src="/images/careers/game.png"
                alt=""
                width={616}
                height={337}
                layout="responsive"
              />
            </div>
            <div>
              <h3 className="heading-sm md:heading-md">
                Join one of the fastest growing blockchain gaming startups
              </h3>
              <p className="mt-6 body">
                If you want to make a real impact in gaming and blockchain, join
                us at Myria. We’re scouring the world for the best and brightest
                to join our rapidly growing company.
              </p>
              <button className="btn-lg btn-primary ml-[15px] mt-[32px]">
                join us
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className={clsx(paddingX, "mt-[120px]")}>
        <div className="mx-auto max-w-content">
          <h3 className="text-center heading-sm md:heading-md">Our values</h3>
          <div className="mt-[108px] grid sm:grid-cols-2 lg:grid-cols-3 gap-x-[32px] gap-y-[76px]">
            {values.map((item, idx) => (
              <CardWithIcon key={idx} icon={item.icon}>
                <div className="pb-[86px]">
                  <h3 className="heading-sm md:heading-md h-[2.6em] md:h-[2.5em]">
                    {item.title}
                  </h3>
                  <p className="body-sm mt-[24px]">{item.description}</p>
                </div>
              </CardWithIcon>
            ))}
          </div>
        </div>
      </section>
      <section className={clsx(paddingX, "mt-[120px]")}>
        <div className="mx-auto max-w-content">
          <h3 className="heading-sm md:heading-md">Meet the team</h3>
          <div className="mt-[48px] grid sm:grid-cols-2 lg:grid-cols-3 gap-x-[32px] gap-y-[76px]">
            {team.map((person, idx) => (
              <article
                key={idx}
                className="text-center flex flex-col rounded-[20px] p-[32px] bg-brand-deep-blue"
              >
                <div
                  className="mx-auto rounded-full"
                  style={{
                    filter: "drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.5))",
                  }}
                >
                  <Image src={person.image} width={164} height={164} alt="" />
                </div>
                <p className="body-lg">{person.name}</p>
                <p className="mt-2 font-bold body">{person.position}</p>
                <p className="mt-5 mb-auto body-sm text-light">
                  {person.description}
                </p>
                <div className="grid grid-flow-col justify-center gap-6 mt-[32px] opacity-50">
                  {person.socials.twitter && (
                    <a href={person.socials.twitter} className="w-[24px]">
                      <TwitterWithBackgroundIcon />
                    </a>
                  )}
                  {person.socials.twitter && (
                    <a href={person.socials.linkedin} className="w-[24px]">
                      <LinkedinWithBackgroundIcon />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className={clsx(paddingX, "mt-[170px] mb-[132px]")}>
        <h3 className="text-center heading-sm md:heading-md">Careers</h3>
        <div className="mt-[48px] max-w-[966px] mx-auto">
          <CareersSection />
        </div>
      </section>
    </div>
  );
};

export default Careers;
