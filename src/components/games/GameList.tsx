import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { negativeMarginXSm } from 'src/utils';
import Collapse from '../Collapse';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import MinusIcon from '../icons/MinusIcon';
import PlusIcon from '../icons/PlusIcon';
import Input from '../Input';

const filters = [
  {
    title: 'Features',
    options: ['Single Player', 'Multi Player']
  },
  {
    title: 'Genre',
    options: ['Strategy', 'Simulation', 'Casual', 'Survival', 'Action', 'Racing']
  },
  {
    title: 'Another filter',
    options: ['Myria Studios', 'Leapblock Studio', 'Playware Games']
  }
] as const;

type Filter = typeof filters;

type FilterKey = Filter[number]['title'];
type FilterOptions = Filter[number]['options'][number];
type FilterMap = {
  [k in FilterKey]: string[];
};

const games: {
  image: string;
  title: string;
  feature: Filter[0]['options'][number];
  genre: Filter[1]['options'][number][];
  studio: Filter[2]['options'][number];
}[] = [
  {
    image: '/images/our-games/aer.png',
    title: 'AER Memories of Old',
    feature: 'Multi Player',
    genre: ['Survival'],
    studio: 'Myria Studios'
  },
  {
    image: '/images/our-games/jars.png',
    title: 'JARS',
    feature: 'Multi Player',
    genre: ['Survival'],
    studio: 'Myria Studios'
  },
  {
    image: '/images/our-games/valhalla.png',
    title: 'Assasin’s Creed Valhalla',
    feature: 'Multi Player',
    genre: ['Survival'],
    studio: 'Myria Studios'
  },
  {
    image: '/images/our-games/battlefront.png',
    title: 'STAR WARS Battlefront I...',
    feature: 'Multi Player',
    genre: ['Survival'],
    studio: 'Myria Studios'
  },
  {
    image: '/images/our-games/pillars.png',
    title: 'Ken Follett’s The Pillars of...',
    feature: 'Multi Player',
    genre: ['Survival'],
    studio: 'Myria Studios'
  },
  {
    image: '/images/our-games/aer.png',
    title: 'AER Memories of Old',
    feature: 'Multi Player',
    genre: ['Survival'],
    studio: 'Myria Studios'
  },
  {
    image: '/images/our-games/jars.png',
    title: 'JARS',
    feature: 'Multi Player',
    genre: ['Survival'],
    studio: 'Myria Studios'
  },
  {
    image: '/images/our-games/valhalla.png',
    title: 'Assasin’s Creed Valhalla',
    feature: 'Single Player',
    genre: ['Survival'],
    studio: 'Myria Studios'
  }
];

const GameItem: React.FC<{ item: typeof games[number] }> = ({ item }) => {
  return (
    <div className="min-w-[300px] md:min-w-0">
      <div className="relative h-[344px] overflow-hidden rounded-[5px]">
        <Image src={item.image} alt="" layout="fill" objectFit="cover" />
      </div>
      <p className="mt-4 text-[14px] font-bold uppercase leading-[1.5] text-brand-light-blue">
        {item.studio}
      </p>
      <p className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-[18px] font-medium leading-[1.5]">
        {item.title}
      </p>
    </div>
  );
};

const Filter: React.FC<{
  filter: FilterMap;
  setFilter: React.Dispatch<React.SetStateAction<FilterMap>>;
}> = ({ filter, setFilter }) => {
  const handleFilter = (filterKey: FilterKey, value: string) => {
    const newFilterOption = filter[filterKey].includes(value)
      ? filter[filterKey].filter((v) => v !== value)
      : [...filter[filterKey], value];
    setFilter({
      ...filter,
      [filterKey]: newFilterOption
    });
  };

  console.log(filter);

  return (
    <>
      <div className="hidden md:block">
        <p className="text-[20px] font-medium leading-[1.5]">Filter</p>
        {filters.map((f, idx) => (
          <Collapse defaultOpen key={idx} asChild>
            {({ open }) => (
              <div className="mt-7">
                <div className="flex justify-between">
                  <p className="text-[16px] font-medium leading-[1.5]">{f.title}</p>
                  <Collapse.Trigger asChild>
                    <button className=" box-content w-4 rounded-[4px] bg-brand-deep-blue p-2 text-white">
                      {open ? <MinusIcon /> : <PlusIcon />}
                    </button>
                  </Collapse.Trigger>
                </div>
                <Collapse.Content>
                  <div className="mt-4 space-y-4">
                    {f.options.map((option, idx) => (
                      <label
                        key={idx}
                        className="flex items-center space-x-2 text-[14px] leading-[17px] text-light">
                        <Input
                          className="h-4 w-4"
                          type="checkbox"
                          checked={filter[f.title].includes(option)}
                          onChange={() => handleFilter(f.title, option)}
                        />
                        <span>{option}</span>
                      </label>
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
  const [filter, setFilter] = useState<FilterMap>({
    Features: [...filters[0].options],
    Genre: [...filters[1].options],
    'Another filter': [...filters[2].options]
  });

  const filteredGames = games.filter((game) => {
    return (
      (filter['Features'].length == 0 || filter['Features'].includes(game.feature)) &&
      (filter['Genre'].length == 0 || filter['Genre'].includes(game.genre[0])) &&
      (filter['Another filter'].length == 0 || filter['Another filter'].includes(game.studio))
    );
  });

  return (
    <div className="grid gap-0 md:grid-cols-[auto_1fr] md:gap-8">
      <div className="min-w-[184px]">
        <Filter filter={filter} setFilter={setFilter} />
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
          'mt-8 grid snap-x grid-flow-col gap-x-6 gap-y-8 overflow-auto px-6 md:mx-0 md:grid-flow-row md:grid-cols-4 md:px-0'
        )}>
        {filteredGames.map((item, idx) => (
          <div key={idx} className="snap-start">
            <GameItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;
