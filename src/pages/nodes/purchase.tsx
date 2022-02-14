import clsx from 'clsx';
import React from 'react';
import Order from 'src/components/Purchase/Order';
import Subscribe from 'src/components/Subscribe';
import CardWithIcon from '../../components/CardWithIcon';
import Collapse from '../../components/Collapse';
import { headerHeight } from '../../components/Header';
import ChartIcon from '../../components/icons/ChartIcon';
import ChevronDownIcon from '../../components/icons/ChevronDownIcon';
import StarIcon from '../../components/icons/StarIcon';
import UserIcon from '../../components/icons/UserIcon';
import Page from '../../components/Page';
import License from '../../components/Purchase/License';
import { paddingX } from '../../utils';

const rewards = [
  {
    icon: (
      <div className="w-[64px]">
        <UserIcon />
      </div>
    ),
    title: 'Daily $MYRIA token rewards',
    description: 'Myria node operators will receive daily $MYRIA token rewards for the nodes work. '
  },
  {
    icon: (
      <div className="w-[64px]">
        <ChartIcon />
      </div>
    ),
    title: 'Voting rights',
    description:
      'Each node is allowed to vote on proposed changes to the Myria chain and nodes will also hold greater voting power throughout the Myriaverse.'
  },
  {
    icon: (
      <div className="w-[64px]">
        <StarIcon />
      </div>
    ),
    title: 'Exclusive NFTs',
    description:
      'Node owners will also be rewarded with NFT drops and tokens based on their reputational score as node operators and general community members.',
    learnMore: '/'
  }
];

const questions = [
  {
    title: 'What is a Myria node?',
    content: `In order to run any blockchain, including the Myria chain, nodes are required for verification of network transactions.
    Nodes in the Myria ecosystem will be used for a variety of network-supporting activities including initial test networks, block production and validation.
    `
  },
  {
    title: 'How can I become a Myria node operator?',
    content: `In order to run any blockchain, including the Myria chain, nodes are required for verification of network transactions.
    Nodes in the Myria ecosystem will be used for a variety of network-supporting activities including initial test networks, block production and validation.
    `
  },
  {
    title: 'What rewards do Myria node operators receive?',
    content: `In order to run any blockchain, including the Myria chain, nodes are required for verification of network transactions.
    Nodes in the Myria ecosystem will be used for a variety of network-supporting activities including initial test networks, block production and validation.
    `
  },
  {
    title: 'What are the software and hardware requirements to run a node?',
    content: `In order to run any blockchain, including the Myria chain, nodes are required for verification of network transactions.
    Nodes in the Myria ecosystem will be used for a variety of network-supporting activities including initial test networks, block production and validation.
    `
  },
  {
    title: 'When will Myria node licenses be sold?',
    content: `In order to run any blockchain, including the Myria chain, nodes are required for verification of network transactions.
    Nodes in the Myria ecosystem will be used for a variety of network-supporting activities including initial test networks, block production and validation.
    `
  },
  {
    title: 'How much will a Myria node license cost?',
    content: `In order to run any blockchain, including the Myria chain, nodes are required for verification of network transactions.
    Nodes in the Myria ecosystem will be used for a variety of network-supporting activities including initial test networks, block production and validation.
    `
  },
  {
    title: 'How many Myria node licenses will be released?',
    content: `In order to run any blockchain, including the Myria chain, nodes are required for verification of network transactions.
    Nodes in the Myria ecosystem will be used for a variety of network-supporting activities including initial test networks, block production and validation.
    `
  }
];

const Nodes: React.FC = () => {
  return (
    <Page>
      <div
        style={{
          paddingTop: headerHeight,
          backgroundSize: '100% auto'
        }}
        className={clsx(
          "relative mb-[120px] bg-[url('/images/nodes/purchase-page-bg.png')] bg-top bg-no-repeat"
        )}>
        <div className="mx-auto w-full max-w-[1734] px-6 md:px-[88px]">
          <section>
            <h1 className="heading-md max-w-[756px] font-extrabold text-brand-white md:heading-lg md:mt-[151px]">
              Purchase a Myria Node
            </h1>
          </section>

          <div className="mt-[80px] flex flex-col md:flex-row">
            <div className="mb-8 md:mb-0 md:mr-8 md:w-[calc((100%-32px)*0.675)]">
              <License />
            </div>
            <div className="sticky top-5 h-full md:w-[calc((100%-32px)*0.325)]">
              <Order />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Nodes;
