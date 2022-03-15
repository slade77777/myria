import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useRef, useState } from 'react';
import useClickOutside from 'src/hooks/useClickOutside';
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
    options: ['Simulation', 'Casual', 'Survival', 'Action', 'Racing', 'Shooter']
  },
  {
    title: 'Publisher',
    options: ['Myria Studios', 'Leapblock Studios', 'Playware Games']
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
  publisher: Filter[2]['options'][number][];
}[] = [
    {
      image: '/images/our-games/aer.png',
      title: 'Metarush',
      feature: 'Multi Player',
      genre: ['Survival', 'Racing'],
      publisher: ['Myria Studios']
    },
    {
      image: '/images/our-games/jars.png',
      title: 'Metakart',
      feature: 'Multi Player',
      genre: ['Racing', 'Casual'],
      publisher: ['Myria Studios']
    },
    {
      image: '/images/our-games/valhalla.png',
      title: 'Block Royale ',
      feature: 'Multi Player',
      genre: ['Survival', 'Action', 'Shooter'],
      publisher: ['Myria Studios']
    },
    {
      image: '/images/our-games/battlefront.png',
      title: 'Starstrike Legends',
      feature: 'Multi Player',
      genre: ['Action', 'Shooter'],
      publisher: ['Myria Studios']
    },
    {
      image: '/images/our-games/pillars.png',
      title: 'Moonville Farm',
      feature: 'Single Player',
      genre: ['Casual', 'Simulation'],
      publisher: ['Leapblock Studios']
    },
    {
      image: '/images/our-games/aer.png',
      title: 'Hot Slice Tycoon',
      feature: 'Single Player',
      genre: ['Casual', 'Simulation'],
      publisher: ['Playware Games']
    }
  ];

const GameItem: React.FC<{ item: typeof games[number] }> = ({ item }) => {
  return (
    <div className="">
      <div className="relative h-[232px] overflow-hidden rounded-[5px] md:h-[344px]">
        <Image src={item.image} alt="" layout="fill" objectFit="cover" />
      </div>
      <p className="mt-4 text-[14px] font-bold uppercase leading-[1.5] text-brand-light-blue">
        {item.publisher}
      </p>
      <p className="overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-medium leading-[1.5] md:text-[18px]">
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

  const [open, setOpen] = useState(false);

  const collapseRef = useRef(null);

  const handleCollapse = useCallback(() => {
    setOpen(false);
  }, []);

  useClickOutside(collapseRef, handleCollapse);

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
      <div ref={collapseRef}>
        <Collapse open={open} onOpenChange={(open) => setOpen(open)} className="relative md:hidden">
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
      </div>
    </>
  );
};

const GameList: React.FC = () => {
  const [filter, setFilter] = useState<FilterMap>({
    Features: [],
    Genre: [],
    'Publisher': []
  });

  const filteredGames = games.filter((game) => {
    return (
      (filter['Features'].length == 0 || filter['Features'].includes(game.feature)) &&
      (filter['Genre'].length == 0 || filter['Genre'].includes(game.genre[0]) || filter['Genre'].includes(game.genre[1])) &&
      (filter['Publisher'].length == 0 || filter['Publisher'].includes(game.publisher[0]) || filter['Publisher'].includes(game.publisher[1]) || filter['Publisher'].includes(game.publisher[2]))
    );
  });

  return (
    <div className="grid gap-0 md:grid-cols-[auto_1fr] md:gap-8">
      <div className="min-w-[184px]">
        <Filter filter={filter} setFilter={setFilter} />
      </div>
      <div className={clsx('mt-7 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4')}>
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
