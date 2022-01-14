import { Disclosure } from "@headlessui/react";
import clsx from "clsx";
import React from "react";
import CardWithIcon from "../components/CardWithIcon";
import { headerHeight } from "../components/Header";
import ChartIcon from "../components/icons/ChartIcon";
import ChevronDownIcon from "../components/icons/ChevronDownIcon";
import StarIcon from "../components/icons/StarIcon";
import UserIcon from "../components/icons/UserIcon";
import { paddingX } from "../utils";

const rewards = [
  {
    icon: (
      <div className="w-[64px]">
        <UserIcon />
      </div>
    ),
    title: "Daily $MYRIA token rewards",
    description:
      "Myria node operators will receive daily $MYRIA token rewards for the nodes work. ",
  },
  {
    icon: (
      <div className="w-[64px]">
        <ChartIcon />
      </div>
    ),
    title: "Voting rights",
    description:
      "Each node is allowed to vote on proposed changes to the Myria chain and nodes will also hold greater voting power throughout the Myriaverse.",
  },
  {
    icon: (
      <div className="w-[64px]">
        <StarIcon />
      </div>
    ),
    title: "Exclusive NFTs",
    description:
      "Node owners will also be rewarded with NFT drops and tokens based on their reputational score as node operators and general community members.",
    learnMore: "/",
  },
];

const questions = [
  {
    title: "What is a Myria node?",
    content: `In order to run any blockchain, including the Myria chain, nodes are required for verification of network transactions.
    Nodes in the Myria ecosystem will be used for a variety of network-supporting activities including initial test networks, block production and validation.
    `,
  },
  {
    title: "How can I become a Myria node operator?",
    content: `In order to run any blockchain, including the Myria chain, nodes are required for verification of network transactions.
    Nodes in the Myria ecosystem will be used for a variety of network-supporting activities including initial test networks, block production and validation.
    `,
  },
  {
    title: "What rewards do Myria node operators receive?",
    content: `In order to run any blockchain, including the Myria chain, nodes are required for verification of network transactions.
    Nodes in the Myria ecosystem will be used for a variety of network-supporting activities including initial test networks, block production and validation.
    `,
  },
  {
    title: "What are the software and hardware requirements to run a node?",
    content: `In order to run any blockchain, including the Myria chain, nodes are required for verification of network transactions.
    Nodes in the Myria ecosystem will be used for a variety of network-supporting activities including initial test networks, block production and validation.
    `,
  },
  {
    title: "When will Myria node licenses be sold?",
    content: `In order to run any blockchain, including the Myria chain, nodes are required for verification of network transactions.
    Nodes in the Myria ecosystem will be used for a variety of network-supporting activities including initial test networks, block production and validation.
    `,
  },
  {
    title: "How much will a Myria node license cost?",
    content: `In order to run any blockchain, including the Myria chain, nodes are required for verification of network transactions.
    Nodes in the Myria ecosystem will be used for a variety of network-supporting activities including initial test networks, block production and validation.
    `,
  },
  {
    title: "How many Myria node licenses will be released?",
    content: `In order to run any blockchain, including the Myria chain, nodes are required for verification of network transactions.
    Nodes in the Myria ecosystem will be used for a variety of network-supporting activities including initial test networks, block production and validation.
    `,
  },
];
const Nodes: React.FC = () => {
  return (
    <div
      style={{
        paddingTop: headerHeight,
      }}
    >
      <div
        className={clsx(
          paddingX,
          "bg-[url('/images/nodes/page-bg.png')] bg-right-bottom bg-no-repeat "
        )}
      >
        <div className="w-full mx-auto max-w-content">
          <section className={"text-center "}>
            <h1 className="heading-lg md:heading-massive text-brand-white mt-[50px] md:mt-[120px] max-w-[756px] mx-auto text-center">
              Run a node and earn{" "}
              <span className="text-brand-mid-blue">$MYRIA</span> and NFT
              rewards
            </h1>
            <p className="mt-[32px] heading-sm max-w-[518px] mx-auto">
              Decentralize the network by providing computing resources
            </p>
            <button className="mt-[38px] btn-lg btn-primary">BUY NOW</button>
          </section>
          <section className="mt-[100px]">
            <div className="max-w-[715px]">
              <p className="caption text-brand-light-blue">
                a decentralized ecosystem
              </p>
              <h2 className="mt-4 heading-lg">
                Powered by the community of player-run nodes
              </h2>
              <p className="mt-6 body text-light">
                The Myria chain is supported by a network of player-run nodes.
                Use your home computer to become a node operator and receive
                rewards and benefits for your contribution to the ecosystem.
              </p>
            </div>
          </section>
          <section className="mt-[152px]">
            <h2 className="text-center heading-sm md:heading-md">
              Node owner rewards
            </h2>
            <div className="mt-[92px] md:grid-cols-2 grid lg:grid-cols-3 gap-[32px] gap-y-[76px]">
              {rewards.map((item, idx) => (
                <CardWithIcon icon={item.icon} key={idx}>
                  <div className="pb-[48px]">
                    <h3 className="heading-sm md:heading-md">{item.title}</h3>
                    <p className="mt-6 body-sm">{item.description}</p>
                    {item.learnMore && (
                      <a
                        href={item.learnMore}
                        className="inline-block mt-[22px] btn-lg btn-primary"
                      >
                        Learn more
                      </a>
                    )}
                  </div>
                </CardWithIcon>
              ))}
            </div>
          </section>
        </div>
      </div>
      <section
        className={clsx(paddingX, "w-full mt-[152px] mx-auto max-w-[832px]")}
      >
        <h3 className="text-center heading-sm md:heading-md">
          Validating on Myria
        </h3>
        <div className="mt-[48px]">
          {questions.map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="mt-6">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        as="div"
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <h3 className="heading-list">{item.title}</h3>
                        <i
                          className={clsx("w-[24px]", {
                            "rotate-180": open,
                          })}
                        >
                          <ChevronDownIcon />
                        </i>
                      </Disclosure.Button>

                      <Disclosure.Panel as="div" className="pb-2">
                        <p className="mt-6 body text-light">{item.content}</p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
              <div className="w-full h-[1px] bg-white opacity-20 mt-6" />
            </React.Fragment>
          ))}
        </div>
      </section>
      <section
        className={clsx(
          paddingX,
          "w-full mt-[112px] mb-[124px] flex flex-col justify-center min-h-[792px]  bg-[url('/images/nodes/globe.png')] bg-no-repeat md:bg-right bg-center"
        )}
      >
        <div className="mx-auto max-w-content ">
          <div className="md:w-1/2">
            <h3 className="heading-sm md:heading-md">
              Get a founders node today
            </h3>
            <p className="mt-6 body">
              Become an integral part of the Myria ecosystem and reap the
              benefits of your contribution. Early founder node operators
              receive preferential pricing, which increases as nodes are sold.
            </p>
            <button className="btn-lg btn-primary mt-[32px]">BUY A NODE</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nodes;
