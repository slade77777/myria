import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useRef, useState } from 'react';
import useClickOutside from 'src/hooks/useClickOutside';
import Badge from '../Badge';
import Collapse from '../Collapse';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import MinusIcon from '../icons/MinusIcon';
import PlusIcon from '../icons/PlusIcon';
import Input from '../Input';
import Overlay from '../overlay/Overlay';

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

export const games: {
  image: string;
  title: string;
  feature: Filter[0]['options'][number];
  genre: Filter[1]['options'][number][];
  publisher: Filter[2]['options'][number];
  id: string;
  disabled?: true;
}[] = [
  {
    image: '/images/our-games/metarush_op.png',
    title: 'Metarush',
    feature: 'Multi Player',
    genre: ['Survival', 'Racing'],
    publisher: 'Myria Studios',
    id: 'metarush'
  },
  {
    image: '/images/our-games/metakart_op.png',
    title: 'Metakart',
    feature: 'Multi Player',
    genre: ['Racing', 'Casual'],
    publisher: 'Myria Studios',
    id: 'metakart'
  },
  {
    image: '/images/our-games/block-royale_op.png',
    title: 'Block Royale ',
    feature: 'Multi Player',
    genre: ['Survival', 'Action', 'Shooter'],
    publisher: 'Myria Studios',
    id: 'block-royale'
  },
  {
    image: '/images/our-games/starstrike_updated_card_op.png',
    title: 'Starstrike Legends',
    feature: 'Multi Player',
    genre: ['Action', 'Shooter'],
    publisher: 'Myria Studios',
    id: 'starstrike'
  },
  {
    image: '/images/our-games/moonville_op.png',
    title: 'Moonville Farm',
    feature: 'Single Player',
    genre: ['Casual', 'Simulation'],
    publisher: 'Leapblock Studios',
    id: 'moonville',
    disabled: true
  },
  {
    image: '/images/our-games/hot-slice_op.png',
    title: 'Hot Slice Tycoon',
    feature: 'Single Player',
    genre: ['Casual', 'Simulation'],
    publisher: 'Playware Games',
    id: 'hotslice',
    disabled: true
  }
];

const GameItem: React.FC<{ item: typeof games[number] }> = ({ item }) => {
  return (
    <Link href={'/game-detail/' + item.id}>
      <a className={clsx('block', {
          'pointer-events-none': item.disabled
        })}>
        <Overlay className="h-[232px] overflow-hidden rounded-[5px] md:h-[344px]">
          <Image src={item.image} alt="" layout="fill" objectFit="cover" />
        </Overlay>
        <p className="mt-4 flex text-[14px] font-bold uppercase leading-[1.5] text-brand-light-blue">
          <span>{item.publisher}</span>
          {item.disabled && <div className="ml-auto">
            <Badge>
              <Trans>COMING SOON</Trans>
            </Badge>
          </div>}
        </p>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-medium leading-[1.5] md:text-[18px]">
          {item.title}
        </p>
      </a>
    </Link>
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
              {filters.map((f, idx) => (
                <div key={idx}>
                  <p className="text-[18px] leading-none">{f.title}</p>
                  <div className="mt-6 space-y-6">
                    {f.options.map((option, idx) => (
                      <label
                        key={idx}
                        className="flex items-center justify-between space-x-2 text-[18px] leading-none text-light">
                        <span>{option}</span>
                        <Input className="h-4 w-4"
                          type="checkbox"
                          checked={filter[f.title].includes(option)}
                          onChange={() => handleFilter(f.title, option)} />
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
    Publisher: []
  });

  const filteredGames = games.filter((game) => {
    return (
      (filter['Features'].length == 0 || filter['Features'].includes(game.feature)) &&
      (filter['Genre'].length == 0 ||
        filter['Genre'].includes(game.genre[0]) ||
        filter['Genre'].includes(game.genre[1])) &&
      (filter['Publisher'].length == 0 || filter['Publisher'].includes(game.publisher))
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
