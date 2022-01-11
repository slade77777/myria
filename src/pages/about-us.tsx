import clsx from "clsx";
import Image from "next/image";
import React from "react";
import Careers from "../components/Careers";
import ExperenceLogos from "../components/ExperienceLogos";
import { headerHeight } from "../components/Header";
import { paddingX } from "../utils";

const TwitterIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 0H5C2.239 0 0 2.239 0 5V19C0 21.761 2.239 24 5 24H19C21.762 24 24 21.761 24 19V5C24 2.239 21.762 0 19 0ZM18.861 9.237C19.07 13.854 15.627 19.002 9.531 19.002C7.677 19.002 5.952 18.459 4.499 17.527C6.241 17.732 7.979 17.249 9.359 16.168C7.922 16.141 6.71 15.192 6.293 13.888C6.808 13.986 7.314 13.957 7.775 13.832C6.196 13.515 5.107 12.093 5.142 10.572C5.584 10.818 6.091 10.966 6.628 10.983C5.167 10.006 4.753 8.076 5.612 6.6C7.231 8.586 9.65 9.893 12.378 10.03C11.899 7.977 13.458 6 15.577 6C16.52 6 17.374 6.398 17.972 7.037C18.72 6.89 19.423 6.617 20.058 6.241C19.812 7.008 19.292 7.651 18.615 8.057C19.279 7.977 19.912 7.801 20.5 7.54C20.061 8.196 19.504 8.774 18.861 9.237Z"
        fill="white"
      />
    </svg>
  );
};

const LinkedinIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 0H5C2.239 0 0 2.239 0 5V19C0 21.761 2.239 24 5 24H19C21.762 24 24 21.761 24 19V5C24 2.239 21.762 0 19 0ZM8 19H5V8H8V19ZM6.5 6.732C5.534 6.732 4.75 5.942 4.75 4.968C4.75 3.994 5.534 3.204 6.5 3.204C7.466 3.204 8.25 3.994 8.25 4.968C8.25 5.942 7.467 6.732 6.5 6.732ZM20 19H17V13.396C17 10.028 13 10.283 13 13.396V19H10V8H13V9.765C14.396 7.179 20 6.988 20 12.241V19Z"
        fill="white"
      />
    </svg>
  );
};

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
            src="/images/about-us/header-bg.png"
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="w-full mx-auto max-w-content ">
          <h1 className="heading-lg md:heading-massive text-brand-white mt-[50px] md:mt-[120px] max-w-[756px] mx-auto text-center">
            Our Vision
          </h1>
          <p className="heading-sm max-w-[632px] mx-auto mt-[32px] text-center">
            Myria is a community driven platform that empowers gamers, studios,
            and creators.
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
                    <a href={person.socials.twitter}>
                      <TwitterIcon />
                    </a>
                  )}
                  {person.socials.twitter && (
                    <a href={person.socials.linkedin}>
                      <LinkedinIcon />
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
  );
};

export default AboutUs;
