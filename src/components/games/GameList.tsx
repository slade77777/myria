import Image from 'next/image';
import React from 'react';
import Collapse from '../Collapse';
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
    <div>
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
    <div className="">
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
      <div></div>
    </div>
  );
};

const GameList: React.FC = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-8">
      <div className="min-w-[184px]">
        <Filter />
      </div>
      <div className="grid grid-cols-4 gap-x-6 gap-y-8">
        {games.map((item, idx) => (
          <GameItem key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default GameList;
