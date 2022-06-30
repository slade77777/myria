import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { negativeMarginXSm } from 'src/utils';

const games = [
  {
    link: '/cricket/',
    name: 'AB Cricket Game',
    publisher: 'AB DE VILLIERS',
    image: '/images/home/game-1.png'
  },
  {
    link: '/game-detail/moonville-farms/',
    name: 'Moonville Farms',
    publisher: 'LEAPBLOCK STUDIOS',
    image: '/images/home/game-2.png'
  },
  {
    link: '/game-detail/metarush/',
    name: 'Metarush',
    publisher: 'MYRIA STUDIOS',
    image: '/images/home/game-3.png'
  }
];
const Item: React.FC<{ item: typeof games[number] }> = ({ item }) => {
  return (
    <Link href={item.link}>
      <a
        style={{
          backgroundImage: `url(${item.image})`
        }}
        className={clsx(
          'relative flex h-[450px] flex-col justify-end overflow-hidden rounded-[10px] bg-cover pb-5 pl-9 transition duration-300 hover:md:scale-105'
        )}>
        <div className="mt-4 flex text-[14px] font-bold leading-[1.5] text-white">
          <span>{item.publisher}</span>
        </div>
        <p className="mt-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-[22px] font-medium leading-[1.5] text-white">
          {item.name}
        </p>
      </a>
    </Link>
  );
};

const OurGames: React.FC = () => {
  return (
    <div>
      <h2 className="text-center text-[24px] font-medium leading-[1.25] md:text-[28px]">
        Upcoming games
      </h2>
      <div
        className={clsx(
          negativeMarginXSm,
          'mt-8 flex space-x-11 overflow-auto px-6 md:mx-0 md:mt-20 md:overflow-visible md:px-0'
        )}>
        {games.map((item, idx) => (
          <div key={idx} className="min-w-[350px] flex-1 md:min-w-0">
            <Item item={item} />
          </div>
        ))}
      </div>
      <div className="mt-[73px] flex justify-center">
        <Link href="/games">
          <a className="btn-lg rounded-lg border border-white transition duration-300 hover:-translate-y-1">
            SEE MORE GAMES
          </a>
        </Link>
      </div>
    </div>
  );
};

export default OurGames;
