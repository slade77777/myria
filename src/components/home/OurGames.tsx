import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { negativeMarginXSm } from 'src/utils';
import Badge from '../Badge';
import { games } from '../games/GameList';
import Overlay from '../overlay/Overlay';

const Item: React.FC<{ item: typeof games[number] }> = ({ item }) => {
  return (
    <Link href={`/game-detail/${item.id}`}>
      <a
        className={clsx('block', {
          'pointer-events-none': item.disabled
        })}>
        <Overlay className="h-[300px] overflow-hidden rounded-[5px]">
          <Image src={item.image} alt="" layout="fill" objectFit="cover" />
        </Overlay>
        <div className="mt-4 flex text-[14px] font-bold leading-[1.5] text-brand-light-blue">
          <span>{item.publisher}</span>
          {item.disabled && (
            <div className="ml-auto">
              <Badge>
                <Trans>COMING SOON</Trans>
              </Badge>
            </div>
          )}
        </div>
        <p className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-[18px] font-medium leading-[1.5]">
          {item.title}
        </p>
      </a>
    </Link>
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
          'mt-8 flex space-x-6 overflow-auto px-6 md:mx-0 md:overflow-visible md:px-0'
        )}>
        {games
          .filter((g) => g.id !== 'hotslice')
          .map((item, idx) => (
            <div key={idx} className="min-w-[233px] flex-1 md:min-w-0">
              <Item item={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default OurGames;
