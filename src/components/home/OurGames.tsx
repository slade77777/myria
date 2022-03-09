import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { negativeMarginXSm } from 'src/utils';

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
  }
];

const Item: React.FC<{ item: typeof games[number] }> = ({ item }) => {
  return (
    <div>
      <div className="relative h-[300px]">
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

const OurGames: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-[24px] font-medium leading-[1.25] md:text-[30px]">Our Games</h2>
        <Link href="/games">
          <a className="link">
            <Trans>Discover more</Trans>
          </a>
        </Link>
      </div>
      <div
        className={clsx(
          negativeMarginXSm,
          'mt-8 flex space-x-6 overflow-auto px-6 md:mx-0 md:px-0'
        )}>
        {games.map((item, idx) => (
          <div key={idx} className="min-w-[233px] flex-1">
            <Item item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurGames;
