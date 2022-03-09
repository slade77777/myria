import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { negativeMarginXSm } from 'src/utils';
import Collapse from '../Collapse';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import MinusIcon from '../icons/MinusIcon';
import PlusIcon from '../icons/PlusIcon';
import Input from '../Input';
const games = [
  {
    image: '/images/our-games/aer.png',
    subtitle: 'MYRIA STUDIO',
    title: 'AER Memories of Old'
  },
  {
    image: '/images/our-games/jars.png',
    subtitle: 'MYRIA STUDIO',
    title: 'JARS'
  },
  {
    image: '/images/our-games/valhalla.png',
    subtitle: 'MYRIA STUDIO',
    title: 'Assasin’s Creed Valhalla'
  },
  {
    image: '/images/our-games/battlefront.png',
    subtitle: 'LEAPBLOCK STUDIO',
    title: 'STAR WARS Battlefront I...'
  },
  {
    image: '/images/our-games/pillars.png',
    subtitle: 'BLOCK88 STUDIO',
    title: 'Ken Follett’s The Pillars of...'
  },
  {
    image: '/images/our-games/aer.png',
    subtitle: 'MYRIA STUDIO',
    title: 'AER Memories of Old'
  },
  {
    image: '/images/our-games/jars.png',
    subtitle: 'MYRIA STUDIO',
    title: 'JARS'
  },
  {
    image: '/images/our-games/valhalla.png',
    subtitle: 'MYRIA STUDIO',
    title: 'Assasin’s Creed Valhalla'
  }
];

const GameItem: React.FC<{ item: typeof games[number] }> = ({ item }) => {
  return (
    <div className="min-w-[300px] md:min-w-0">
      <div className="relative h-[344px] overflow-hidden rounded-[5px]">
        <Image src={item.image} alt="" layout="fill" objectFit="cover" />
      </div>
      <p className="mt-4 text-[14px] font-bold leading-[1.5] text-brand-light-blue">
        {item.subtitle}
      </p>
      <p className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-[18px] font-medium leading-[1.5]">
        {item.title}
      </p>
    </div>
  );
};

const filters = [
  {
    title: 'Features',
    options: ['Single Player', 'Multi Player']
  },
  {
    title: 'Genre',
    options: ['Strategy', 'Simulation', 'Casual', 'Action', 'Racing']
  }
];

const Filter: React.FC = () => {
  return (
    <>
      <div className="hidden md:block">
        <p className="text-[20px] font-medium leading-[1.5]">Filter</p>
        {filters.map((filter, idx) => (
          <Collapse defaultOpen key={idx} asChild>
            {({ open }) => (
              <div className="mt-7">
                <div className="flex justify-between">
                  <p className="text-[16px] font-medium leading-[1.5]">{filter.title}</p>
                  <Collapse.Trigger asChild>
                    <button className=" box-content w-4 rounded-[4px] bg-brand-deep-blue p-2 text-white">
                      {open ? <MinusIcon /> : <PlusIcon />}
                    </button>
                  </Collapse.Trigger>
                </div>
                <Collapse.Content>
                  <div className="mt-4 space-y-4">
                    {filter.options.map((option, idx) => (
                      <p
                        key={idx}
                        className="flex items-center space-x-2 text-[14px] leading-[17px] text-light">
                        <Input className="h-4 w-4" type="checkbox" />
                        <span>{option}</span>
                      </p>
                    ))}
                  </div>
                </Collapse.Content>
              </div>
            )}
          </Collapse>
        ))}
      </div>
      <Collapse className="relative md:hidden">
        <Collapse.Trigger asChild>
          <div className="flex justify-between rounded-lg bg-brand-dark-blue py-5 px-6">
            <p className="text-[18px] font-medium leading-none">Filter</p>
            <span className="w-6">
              <ChevronDownIcon />
            </span>
          </div>
        </Collapse.Trigger>
        <Collapse.Content className="absolute top-[calc(100%-16px)] left-0 z-[5] w-full rounded-lg bg-brand-dark-blue">
          <div className="space-y-6 p-6">
            {filters.map((filter, idx) => (
              <div key={idx}>
                <p className="text-[18px] leading-none">{filter.title}</p>
                <div className="mt-6 space-y-6">
                  {filter.options.map((option, idx) => (
                    <label
                      key={idx}
                      className="flex items-center justify-between space-x-2 text-[18px] leading-none text-light">
                      <span>{option}</span>
                      <Input className="h-4 w-4" type="checkbox" />
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Collapse.Content>
      </Collapse>
    </>
  );
};

const GameList: React.FC = () => {
  return (
    <div className="grid gap-0 md:grid-cols-[auto_1fr] md:gap-8">
      <div className="min-w-[184px]">
        <Filter />
      </div>
      <div className="mt-6 flex items-center justify-between md:hidden">
        <h2 className="text-[24px] font-medium leading-[1.25]">Our Games</h2>
        <Link href="/games">
          <a className="link">
            <Trans>Discover more</Trans>
          </a>
        </Link>
      </div>
      <div
        className={clsx(
          negativeMarginXSm,
          'mt-8 grid grid-flow-col gap-x-6 gap-y-8 overflow-auto px-6 md:mx-0 md:grid-flow-row md:grid-cols-4 md:px-0'
        )}>
        {games.map((item, idx) => (
          <GameItem key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default GameList;
