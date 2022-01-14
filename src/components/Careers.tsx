import { Disclosure, Transition } from "@headlessui/react";
import clsx from "clsx";
import React, { useState } from "react";
import ChevronDownIcon from "./icons/ChevronDownIcon";

const mockData = [
  {
    id: "1",
    title: "PROGRAMMERS",
    jobs: [
      {
        id: "1",
        title: "Senior Gameplay Programmer",
        description:
          "Validators form the backbone of Myria’s network. By processing transactions and participating in consensus, each validator helps make Solana the most high-performance blockchain network in the world.",
      },
    ],
  },
  {
    id: "2",
    title: "ARTISTS",
    jobs: [
      {
        id: "2",
        title: "Senior Engine Developer",
        description:
          "Validators form the backbone of Myria’s network. By processing transactions and participating in consensus, each validator helps make Solana the most high-performance blockchain network in the world.",
      },
    ],
  },
  {
    id: "3",
    title: "GAME DESIGN",
    jobs: [
      {
        id: "13",
        title: "Game Tools Programmer",
        description:
          "Validators form the backbone of Myria’s network. By processing transactions and participating in consensus, each validator helps make Solana the most high-performance blockchain network in the world.",
      },
    ],
  },
  {
    id: "4",
    title: "MARKETING",
    jobs: [
      {
        id: "14",
        title: "Devops",
        description:
          "Validators form the backbone of Myria’s network. By processing transactions and participating in consensus, each validator helps make Solana the most high-performance blockchain network in the world.",
      },
    ],
  },
  {
    id: "5",
    title: "PRODUCERS",
    jobs: [
      {
        id: "15",
        title: "Lead Blockchain Dev",
        description:
          "Validators form the backbone of Myria’s network. By processing transactions and participating in consensus, each validator helps make Solana the most high-performance blockchain network in the world.",
      },
      {
        id: "16",
        title: "Web Developer",
        description:
          "Validators form the backbone of Myria’s network. By processing transactions and participating in consensus, each validator helps make Solana the most high-performance blockchain network in the world.",
      },
      {
        id: "17",
        title: "Concept Artist",
        description:
          "Validators form the backbone of Myria’s network. By processing transactions and participating in consensus, each validator helps make Solana the most high-performance blockchain network in the world.",
      },
    ],
  },
];
const Careers: React.FC = () => {
  const [data] = useState(mockData);
  const [selectedJob, setSelectedJob] = useState<null | string>(null);
  const positions = data
    .filter((item) => !selectedJob || selectedJob == item.id)
    .flatMap((item) => item.jobs);

  return (
    <div>
      <div className="flex flex-wrap -mx-3 -mt-3">
        <button
          onClick={() => {
            setSelectedJob(null);
          }}
          className={clsx("mx-2 my-2 btn-lg btn-dark-blue", {
            active: selectedJob === null,
          })}
        >
          All positions
        </button>
        {data.map((item) => (
          <button
            onClick={() => {
              setSelectedJob(item.id);
            }}
            key={item.id}
            className={clsx("mx-2 my-2 btn-lg btn-dark-blue", {
              active: selectedJob === item.id,
            })}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="lg:px-[70px] mt-[56px]">
        {positions.map((pos) => (
          <React.Fragment key={pos.id}>
            <div className="mt-6">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      as="div"
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <h3 className="heading-list">{pos.title}</h3>
                      <i
                        className={clsx("w-[24px]", {
                          "rotate-180": open,
                        })}
                      >
                        <ChevronDownIcon />
                      </i>
                    </Disclosure.Button>

                    <Disclosure.Panel as="div" className="pb-2">
                      <p className="mt-6 body text-light">{pos.description}</p>
                      <button className="mt-6 btn-lg btn-primary">
                        APPLY NOW
                      </button>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
            <div className="w-full h-[1px] bg-white opacity-20 mt-6" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Careers;
