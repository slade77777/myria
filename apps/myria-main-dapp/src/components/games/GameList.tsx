import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Badge from '../Badge';
import Filter, { ActiveFilter, FilterList } from '../Filter';
import Overlay from '../overlay/Overlay';
import dataJson from 'src/components/games/data-json';
import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';
import { IResGameDetail, LogoImg } from 'src/hooks/useDetailGames';

const filters: FilterList = [
  // {
  //   title: 'Features',
  //   id: 'Features',
  //   options: [
  //     {
  //       id: 'Single Player',
  //       name: 'Single Player'
  //     },
  //     {
  //       id: 'Multi Player',
  //       name: 'Multi Player'
  //     }
  //   ]
  // },
  {
    title: 'Genre',
    id: 'Genre',
    options: [
      {
        id: 'Action',
        name: 'Action'
      },
      {
        id: 'Casual',
        name: 'Casual'
      },
      {
        id: 'Collectable Cards',
        name: 'Collectable Cards'
      },
      {
        id: 'Combat',
        name: 'Combat'
      },
      {
        id: 'GameFi',
        name: 'GameFi'
      },
      {
        id: 'MMORPG',
        name: 'MMORPG'
      },
      {
        id: 'MOBA',
        name: 'MOBA'
      },
      {
        id: 'Racing',
        name: 'Racing'
      },
      {
        id: 'RPG',
        name: 'RPG'
      },
      {
        id: 'Survival',
        name: 'Survival'
      },
      {
        id: 'Shooter',
        name: 'Shooter'
      },
      {
        id: 'Simulation',
        name: 'Simulation'
      },
      {
        id: 'Sports',
        name: 'Sports'
      },
      {
        id: 'Strategy',
        name: 'Strategy'
      }
    ]
  },
  {
    title: 'Publisher',
    id: 'Publisher',
    options: [
      {
        id: 'Myria Studios',
        name: 'Myria Studios'
      },
      {
        id: 'Ecosystem Developer',
        name: 'Ecosystem Developer'
      }
    ]
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
  feature: string;
  genre: string[];
  publisher: string;
  id: string;
  disabled?: true;
  comingsoon?: boolean;
  link?: string;
}[] = [
  {
    image: '/images/our-games/metarush_op1.jpg',
    title: 'Metarush',
    feature: 'Multi Player',
    genre: ['Survival', 'Racing'],
    publisher: 'Myria Studios',
    id: 'metarush',
    category: 'Games'
  },
  {
    image: '/images/our-games/metakart_op.png',
    title: 'Metakart',
    feature: 'Multi Player',
    genre: ['Racing'],
    publisher: 'Myria Studios',
    id: 'metakart',
    category: 'Games'
  },
  {
    image: '/images/our-games/block-royale_op.png',
    title: 'Block Royale ',
    feature: 'Multi Player',
    genre: ['Shooter'],
    publisher: 'Myria Studios',
    id: 'block-royale',
    category: 'Games'
  },
  // {
  //   image: '/images/our-games/starstrike_updated_card_op.png',
  //   title: 'Starstrike Legends',
  //   feature: 'Multi Player',
  //   genre: ['Shooter'],
  //   publisher: 'Myria Studios',
  //   id: 'starstrike',
  //   category: 'Games'
  // },
  {
    image: '/images/our-games/moonville_op1.png',
    title: 'Moonville Farms',
    feature: 'Multi Player',
    genre: ['Simulation'],
    publisher: 'Ecosystem Developer',
    id: 'moonville-farms',
    category: 'Games'
  },
  {
    image: '/images/our-games/mr_360_cricket.png',
    title: 'Mr 360 Cricket',
    feature: 'Multi Player',
    genre: ['Casual', 'Sports'],
    publisher: 'Ecosystem Developer',
    id: 'mr-360-cricket',
    category: 'Games',
    link: '/cricket'
  },

  ...Object.values(dataJson).map((item: any) => item.shortcut)
];

async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  };

  // Build request URL
  const requestUrl = process.env.NEXT_PUBLIC_URL_GAME_ADMIN + `/api${path}&populate=*`;

  // Trigger API call
  const data: UseQueryResult<IResData | null, unknown> = await (
    await axios.get(requestUrl, mergedOptions)
  ).data;
  return data;
}

const GameItem: React.FC<{ item: ResData }> = ({ item }) => {
  return (
    <Link
      href={
        item.attributes.game_id.data
          ? '/game-detail/' + item.attributes.game_id.data.attributes.game_id
          : ''
      }>
      <a
        className={clsx('block', {
          'pointer-events-none': item.attributes.disabled || !item.attributes.game_id.data
        })}>
        <Overlay className="h-[232px] overflow-hidden rounded-[5px] md:h-[344px]">
          {item.attributes.thumbnail.data && (
            <Image
              src={
                item.attributes.thumbnail.data.attributes.formats.medium?.url ||
                item.attributes.thumbnail.data.attributes.formats.small?.url ||
                item.attributes.thumbnail.data.attributes.formats.large?.url ||
                item.attributes.thumbnail.data.attributes.formats.thumbnail?.url
              }
              alt=""
              layout="fill"
              objectFit="cover"
              priority
            />
          )}
        </Overlay>
        <p className="text-brand-light-blue mt-4 flex text-[14px] font-bold uppercase leading-[1.5]">
          <span>{item.attributes.publisher}</span>
          {item.attributes.coming_soon && (
            <div className="ml-auto">
              <Badge>
                <Trans>COMING SOON</Trans>
              </Badge>
            </div>
          )}
        </p>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-medium leading-[1.5] md:text-[18px]">
          {item.attributes.title}
        </p>
      </a>
    </Link>
  );
};

interface IGenre {
  data: string[];
}

interface IGameIdAttributes {
  attributes: IResGameDetail;
}

interface IGameId {
  data: IGameIdAttributes;
}
interface IAttributes {
  title: string;
  publisher: string;
  thumbnail: LogoImg;
  feature: string;
  category: string;
  genre: IGenre;
  link?: string;
  disabled?: boolean;
  coming_soon?: boolean;
  game_id: IGameId;
  game_detail_link: string;
}

interface ResData {
  id: string;
  attributes: IAttributes;
}
interface IResData {
  data: ResData[];
}

const GameList: React.FC = () => {
  const [filter, setFilter] = useState<ActiveFilter>({
    Features: [],
    Genre: [],
    Publisher: []
  });

  const data: UseQueryResult<IResData | null, unknown> = useQuery('test', async () => {
    return fetchAPI('/games-ecosystems?sort[0]=id%3Aasc');
  });
  if (!data) {
    return null;
  }

  const filteredGames = data.data
    ? data.data.data.filter(({ attributes }) => {
        return (
          (filter['Features']?.length == 0 ||
            filter['Features']?.find((f) => f.id === attributes.feature)) &&
          (filter['Genre']?.length == 0 ||
            filter['Genre']?.find((f) => f.id === attributes.genre.data[0]) ||
            filter['Genre']?.find((f) => f.id === attributes.genre.data[1])) &&
          (filter['Publisher']?.length == 0 ||
            filter['Publisher']?.find((f) => f.id === attributes.publisher))
        );
      })
    : null;

  return (
    <div className="grid w-full gap-0 md:grid-cols-[auto_1fr] md:gap-8">
      <div className="min-w-[184px]">
        <p className="hidden text-[20px] font-medium leading-[1.5] md:block">Filter</p>
        <Filter
          filterList={filters}
          activeFilter={filter}
          setFilter={(activeFilter) => setFilter(activeFilter)}
        />
      </div>
      <div className="w-full">
        <div className={clsx('mt-7 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4')}>
          {filteredGames &&
            filteredGames.map((item, idx) => (
              <div key={idx} className="snap-start">
                <GameItem item={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GameList;
