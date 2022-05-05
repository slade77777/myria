import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Badge from '../Badge';
import Filter, { FilterList } from '../Filter';
import Overlay from '../overlay/Overlay';

const filters: FilterList = [
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
];

type Filter = typeof filters;

type FilterKey = Filter[number]['title'];
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
    id: 'moonville-farms'
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
      <a
        className={clsx('block', {
          'pointer-events-none': item.disabled
        })}>
        <Overlay className="h-[232px] overflow-hidden rounded-[5px] md:h-[344px]">
          <Image src={item.image} alt="" layout="fill" objectFit="cover" />
        </Overlay>
        <p className="mt-4 flex text-[14px] font-bold uppercase leading-[1.5] text-brand-light-blue">
          <span>{item.publisher}</span>
          {item.disabled && (
            <div className="ml-auto">
              <Badge>
                <Trans>COMING SOON</Trans>
              </Badge>
            </div>
          )}
        </p>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-medium leading-[1.5] md:text-[18px]">
          {item.title}
        </p>
      </a>
    </Link>
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
        <p className="text-[20px] font-medium leading-[1.5]">Filter</p>
        <Filter
          filterList={filters}
          activeFilter={filter}
          setFilter={(activeFilter) => setFilter(activeFilter)}
        />
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
