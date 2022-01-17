import clsx from "clsx";
import Image from "next/image";
import React from "react";
import Careers from "../components/Careers";
import ExperenceLogos from "../components/ExperienceLogos";
import { headerHeight } from "../components/Header";
import LinkedinWithBackgroundIcon from "../components/icons/LinkedinWithBackgroundIcon";
import TwitterWithBackgroundIcon from "../components/icons/TwitterWithBackgroundIcon";
import Page from "../components/Page";
import { paddingX } from "../utils";

type Person = {
  name: string;
  position: string;
  description: string;
  socials: {
    twitter?: string;
    linkedin?: string;
  };
};
const data: Person[] = [
  {
    name: "Priyanka Rao ",
    position: "Co-Founder - CEO",
    description: "xxx",
    socials: {
      twitter: "https://abc.com",
      linkedin: "https://abc.com",
    },
  },
  {
    name: "Andrew Silber",
    position: "Co-Founder - CTO",
    description:
      "Andrew has been a tech executive in the gaming industry with a career spanning over 27 years. He has worked with some of the most recognizable names in the industry, including Activision, Electronic Arts, 2K, Ubisoft, Sony, and Midway. ",
    socials: {
      twitter: "https://abc.com",
      linkedin: "https://abc.com",
    },
  },
  {
    name: "Ivan Fortunov",
    position: "Game Design Director",
    description:
      "Ivan has 10+ years of experience in the game industry. He has been a lead game designer at Gameloft, CrazyLabs, GPG (Ubisoft), Sperasoft, and more, with his games amassing billions of downloads.",
    socials: {
      twitter: "https://abc.com",
      linkedin: "https://abc.com",
    },
  },
  {
    name: "Brendan Duhamel",
    position: "Blockchain Lead",
    description:
      "Brendan brings a decade of experience in blockchain. He has founded an escrow solution on the Bitcoin blockchain, a crypto ETF on ethereum, and was blockchain lead for the world’s largest trade finance blockchain network.",
    socials: {
      twitter: "https://abc.com",
      linkedin: "https://abc.com",
    },
  },
  {
    name: "Vanessa L.",
    position: "Co-Founder - Operations",
    description:
      "Vanessa is a dynamic, entreprenurial executive with over 8+ years in management consulting, focusing on organisational transformations for global companies such as Verizon, Vanguard, Kayo Streaming and more. More recently founding aliens.com. ",
    socials: {
      twitter: "https://abc.com",
      linkedin: "https://abc.com",
    },
  },
  {
    name: "goose.eth",
    position: "Co-Founder - Strategy",
    description:
      "A serial entrepreneur and Web3 proponent with over 12 years of founding experience including four multinational VC-backed companies in traditional tech. More recently founding aliens.com and a blockchain P2E platform. ",
    socials: {
      twitter: "https://abc.com",
      linkedin: "https://abc.com",
    },
  },
  {
    name: "Jem Law",
    position: "Marketing Lead",
    description: "xxx",
    socials: {
      twitter: "https://abc.com",
      linkedin: "https://abc.com",
    },
  },
  {
    name: "Kidono Huang",
    position: "Sourcing Lead",
    description:
      "Kidono is an experienced partner lead with extensive experience managing external development engagements. He has worked with some of the largest game production companies, including Marvel, Tencent, Winkings and more.",
    socials: {
      twitter: "https://abc.com",
      linkedin: "https://abc.com",
    },
  },
  {
    name: "Antonio Molina",
    position: "Games Producer",
    description: "xxx",
    socials: {
      twitter: "https://abc.com",
      linkedin: "https://abc.com",
    },
  },
];
const AboutUs: React.FC = () => {
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
          <div className="w-full mx-auto max-w-content ">
            <h1 className="heading-lg md:heading-massive text-brand-white mt-[50px] md:mt-[120px] max-w-[756px] mx-auto text-center">
              Our Vision
            </h1>
            <p className="heading-sm max-w-[632px] mx-auto mt-[32px] text-center">
              Myria is a community driven platform that empowers gamers,
              studios, and creators.
            </p>
          </div>
          <div className="mt-[196px]">
            <h3 className="text-center heading-sm md:heading-md">
              Our Experience
            </h3>
            <div className="mt-[60px]">
              <ExperenceLogos />
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, "mt-[175px]")}>
          <div className="mx-auto max-w-content">
            <h3 className="text-center heading-sm md:heading-md">
              Led by industry experts
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 mt-[78px] gap-x-[31px] gap-y-[35px]">
              {data.map((person, idx) => (
                <article
                  key={idx}
                  className="text-center flex flex-col rounded-[20px] md:pt-[50px] md:pb-[40px] p-[32px] bg-brand-deep-blue"
                >
                  <p className="body-lg">{person.name}</p>
                  <p className="mt-4 font-bold body">{person.position}</p>
                  <p className="mt-6 mb-auto body-sm text-light">
                    {person.description}
                  </p>
                  <div className="grid grid-flow-col justify-center gap-6 mt-[35px] opacity-50">
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
        <section className={clsx(paddingX, "mt-[232px] mb-[273px]")}>
          <h3 className="text-center heading-sm md:heading-md">Careers</h3>
          <p className="text-center body md:body-lg mt-[38px]">
            Join our team of 60+ to forge to future of blockchain gaming
          </p>
          <div className="mt-[62px] max-w-[966px] mx-auto">
            <Careers />
          </div>
        </section>
      </div>
    </Page>
  );
};

export default AboutUs;
