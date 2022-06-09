import { t, Trans } from '@lingui/macro';
import clsx from 'clsx';
import React from 'react';
import Subscribe from 'src/components/Subscribe';
import CardWithIcon from '../../components/CardWithIcon';
import Collapse from '../../components/Collapse';
import { headerHeight } from '../../components/Header';
import ChartIcon from '../../components/icons/ChartIcon';
import ChevronDownIcon from '../../components/icons/ChevronDownIcon';
import StarIcon from '../../components/icons/StarIcon';
import UserIcon from '../../components/icons/UserIcon';
import Page from '../../components/Page';
import { paddingX } from '../../utils';

import { useWalletContext } from 'src/context/wallet';
import { useGA4 } from 'src/lib/ga';

import { useRouter } from 'next/router';
import Header from 'src/components/nodes/Header';

const rewards = [
  {
    icon: (
      <div className="w-[64px]">
        <UserIcon />
      </div>
    ),
    title: <Trans>Daily $MYRIA token rewards</Trans>,
    description: (
      <Trans>
        Myria node operators will receive daily $MYRIA token rewards for the nodes work.{' '}
      </Trans>
    )
  },
  {
    icon: (
      <div className="w-[64px]">
        <UserIcon />
      </div>
    ),
    title: <Trans>Voting rights</Trans>,
    description: (
      <Trans>
        Each node is allowed to vote on proposed changes to the Myria chain and nodes will also hold
        greater voting power throughout the Myriaverse
      </Trans>
    )
  },
  {
    icon: (
      <div className="w-[64px]">
        <UserIcon />
      </div>
    ),
    title: <Trans>Exclusive NFTs</Trans>,
    description: (
      <Trans>
        Node owners will also be rewarded with NFT drops and tokens based on their reputational
        score as node operators and general community members.
      </Trans>
    ),
    learnMore: '/'
  }
];

const questions = [
  {
    title: <Trans>What is a Myria node?</Trans>,
    content: (
      <Trans>
        <p className="mb-2">
          In order to run any blockchain, including the Myria chain, nodes are required for
          verification of network transactions. Nodes in the Myria ecosystem will be used for a
          variety of network-supporting activities including initial test networks, block production
          and validation.
        </p>
      </Trans>
    )
  },
  {
    title: <Trans>How can I become a Myria node operator?</Trans>,
    content: (
      <Trans>
        Buying a node license will give the owner the right to run the node (either locally or in
        the cloud) and receive rewards as determined by governance.
      </Trans>
    )
  },
  {
    title: <Trans>What rewards do Myria node operators receive?</Trans>,
    content: (
      <Trans>
        <p className="mb-2">
          Myria node operators will receive daily $MYRIA token rewards for the nodes work.
        </p>
        <p className="mb-2">
          Node owners will also be rewarded with NFT drops and tokens based on their reputational
          score as node operators and general community members.
        </p>
        <p>
          Reputation scores will be determined by the playing activity of node owners, the number of
          tokens they own and stake, previous uptime metrics, and their history of network support
          (e.g. validation or oracle provider).
        </p>
      </Trans>
    )
  },
  {
    title: <Trans>What are the software and hardware requirements to run a node?</Trans>,
    content: (
      <>
        <Trans>
          <p className="mb-2">
            You can choose whether you prefer to run your node in the cloud or locally.
          </p>
          <p className="mb-2">
            Myria node software will be available to download on Windows, Mac and Linux. Our node
            operation is not heavily resource-intensive like traditional cryptocurrency mining.
            You’ll be able to run our node software from your home computer with the following
            minimum requirements:
          </p>
        </Trans>
        <ul className="list-disc">
          <li>4 GB RAM</li>
          <li>
            <Trans>2 CPU Cores</Trans>
          </li>
          <li>
            <Trans>60 GB Disk Space</Trans>
          </li>
          <li>
            <Trans>An x86/X64 Processor</Trans>
          </li>
          <li>
            <Trans>A Stable Internet Connection</Trans>
          </li>
        </ul>
      </>
    )
  },
  {
    title: <Trans>When will Myria node licenses be sold?</Trans>,
    content: (
      <Trans>
        Myria node license sales are anticipated to commence in Q2 2022 (subject to change).
      </Trans>
    )
  },
  {
    title: <Trans>How much will a Myria node license cost?</Trans>,
    content: (
      <Trans>
        {/* Founders Nodes will receive preferential pricing, with the first 100 licences initially
        released at USD $2,000. The price of Myria node licenses will increase by USD $100 for every
        100 sold, up to a maximum price of $51,900 for the final 100 licenses. */}
        Details will be announced soon.
      </Trans>
    )
  },
  {
    title: <Trans>How many Myria node licenses will be released?</Trans>,
    content: <Trans>Only 55,000 Myria node licenses will ever be released.</Trans>
  }
];
const Nodes: React.FC = () => {
  const { address, onConnect } = useWalletContext();
  const { event } = useGA4();
  const router = useRouter();
  return (
    <Page headerClassName="hidden" footerClassName="hidden">
      <Header />
      <div className="pt-[120px]">
        <div className={clsx(paddingX, 'relative isolate mt-10 pt-12 md:pt-[150px]')}>
          <img
            src="/images/nodes/globe_op.png"
            alt=""
            className="absolute top-0 left-1/2 z-[-1] w-full max-w-[900px] -translate-x-1/2"
          />
          <div className="mx-auto w-full max-w-content">
            <section className={'text-center '}>
              <h1 className="h6 mx-auto max-w-[756px] text-center text-brand-white md:h1">
                <Trans>
                  Run a node and earn{' '}
                  <span className="text-brand-light-blue">$MYRIA and NFT rewards</span>
                </Trans>
              </h1>
              <p className=" body-18-medium mx-auto mt-4 max-w-[677px] md:body-24-regular md:mt-6 text-base/10">
                <Trans>Decentralize the network by providing computing resources</Trans>
              </p>
              <button
                className="btn-lg btn-primary mt-4 md:mt-[38px]"
                onClick={async () => {
                  if (address != undefined) {
                    router.push('/nodes/purchase');
                  } else {
                    await onConnect();
                    event('Connect Wallet Selected', { campaign: 'Sigil' });
                  }
                }}>
                {address != undefined ? <Trans>Buy a node</Trans> : <Trans>Connect wallet</Trans>}
              </button>
            </section>
            <section className="mt-[96px] md:mt-[134px]">
              <div className="mx-auto flex max-w-[608px] flex-col items-center text-center text-[#E7EBEE]">
                <p className="caption text-brand-gold">
                  <Trans>a decentralized ecosystem</Trans>
                </p>
                <h2 className="h6 mt-4 md:body-36-medium">
                  <Trans>Powered by the community of player-run nodes</Trans>
                </h2>
                <p className="body-14-regular mt-2 text-base/10 md:body-18-regular md:mt-4">
                  <Trans>
                    The Myria chain is supported by a network of player-run nodes. Use your home
                    computer to become a node operator and receive rewards and benefits for your
                    contribution to the ecosystem.
                  </Trans>
                </p>
              </div>
            </section>
            <section className="mt-[152px]">
              <h2 className="heading-sm text-center md:heading-md">
                <Trans>Node owner rewards</Trans>
              </h2>
              <div className="mt-[92px] grid gap-[32px] gap-y-[76px] md:grid-cols-2 lg:grid-cols-3">
                {rewards.map((item, idx) => (
                  <CardWithIcon icon={item.icon} key={idx} className="bg-base/4" iconClassName='bg-base/4'>
                    <div className="pb-[48px]">
                      <h3 className="heading-sm font-bold mt-4">{item.title}</h3>
                      <p className="body-xs mt-8 text-base/9 px-2">{item.description}</p>
                      {item.learnMore && (
                        <button className="btn-lg btn-primary mt-[36px] inline-block">
                          <Trans>Releasing soon</Trans>
                        </button>
                      )}
                    </div>
                  </CardWithIcon>
                ))}
              </div>
            </section>
          </div>
        </div>
        <section className={clsx('mx-auto mt-[152px] w-full max-w-[832px]')}>
          <h3 className="heading-sm text-center md:heading-md">
            <Trans>Validating on Myria</Trans>
          </h3>
          <div className="mt-[48px]">
            {questions.map((item, idx) => (
              <React.Fragment key={idx}>
                <div className="mt-5">
                  <Collapse asChild>
                    {({ open }) => (
                      <div>
                        <Collapse.Trigger asChild>
                          <div className="flex cursor-pointer items-center justify-between">
                            <h3 className="heading-list">{item.title}</h3>
                            <i
                              className={clsx('w-[24px] transition duration-300', {
                                'rotate-180': open
                              })}>
                              <ChevronDownIcon />
                            </i>
                          </div>
                        </Collapse.Trigger>
                        <Collapse.Content>
                          <div className="pb-2">
                            <p className="body-16-regular mt-2 text-base/10">{item.content}</p>
                          </div>
                        </Collapse.Content>
                      </div>
                    )}
                  </Collapse>
                </div>
                <div className="mt-5 h-[1px] w-full bg-white opacity-20" />
              </React.Fragment>
            ))}
          </div>
        </section>
        <section
          className={clsx(
            paddingX,
            "mt-[112px] flex min-h-[792px] w-full flex-col justify-center  bg-[url('/images/globe_op.png')] bg-center bg-no-repeat md:bg-right"
          )}>
          <div className="mx-auto max-w-content ">
            <div className="md:w-1/2">
              <h3 className="heading-sm md:heading-md">
                <Trans>Get a founders node today</Trans>
              </h3>
              <p className="body mt-6">
                <Trans>
                  Become an integral part of the Myria ecosystem and reap the benefits of your
                  contribution. Early founder node operators receive preferential pricing, which
                  increases as nodes are sold.
                </Trans>
              </p>
              <a className="btn-lg btn-primary mt-[32px]" href="#subcribe">
                <Trans>BUY A NODE</Trans>
              </a>
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
};

export default Nodes;
