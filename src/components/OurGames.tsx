import { t, Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const data = [
  {
    logo: (
      <div
        className="w-[225px] md:w-[288px]"
        style={{
          filter: `drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.7))`
        }}>
        <Image
          src="/images/our-games/metarush-noshadow.png"
          alt="metarush"
          layout="responsive"
          width={926}
          height={177}
        />
      </div>
    ),
    background: '/images/our-games/metarush-bg.png',
    title: <Trans>A multiplayer obstacle course game</Trans>,
    link: '/game-detail/metarush',
    layout: 'row'
  },
  {
    logo: (
      <div className="w-[75px] md:w-[138px]">
        <Image
          src="/images/our-games/block-royale.png"
          alt="block-royale"
          layout="responsive"
          width={138}
          height={122}
        />
      </div>
    ),
    background: '/images/our-games/block-royale-bg_updated.png',
    title: <Trans>A battle-royale shooter game</Trans>,
    link: '/game-detail/block-royale',
    layout: 'row'
  },
  {
    logo: (
      <div className="w-[224px] md:w-[300px]">
        <Image
          src="/images/our-games/metakart.png"
          alt="metakart"
          layout="responsive"
          width={364}
          height={45}
        />
      </div>
    ),
    background: '/images/our-games/metakart-bg.png',
    title: <Trans>A multiplayer go-kart racing game</Trans>,
    link: '/game-detail/metakart',
    layout: 'row'
  },
  {
    logo: (
      <div className="w-[187px] md:w-[245px]">
        <Image
          src="/images/our-games/starstrike_updated.png"
          alt="metakart"
          layout="responsive"
          width={685}
          height={153}
        />
      </div>
    ),
    background: '/images/our-games/starstrike-bg.png',
    title: <Trans>An objective-based shooter game</Trans>,
    link: '/game-detail/starstrike',
    layout: 'row'
  }
] as const;

const OurGames: React.FC<{ btnLabel?: string }> = ({ btnLabel = 'Learn more' }) => {
  return (
    <div className="grid gap-[24px] text-brand-white md:grid-cols-2 md:gap-[32px]">
      {data.map((item, idx) => {
        return (
          <Link href={item.link} key={idx}>
            <a
              data-aos="fade-up"
              style={{
                backgroundImage: `url("${item.background}")`
              }}
              className="relative isolate flex h-[211px] items-end justify-between overflow-hidden rounded-lg bg-cover bg-center transition duration-300 hover:[box-shadow:0_0_0_3px_#fff] md:h-[342px]">
              <div
                className={clsx(
                  'mb-[22px] grid flex-grow content-end justify-items-center gap-y-4 md:mb-4 md:gap-y-3 xl:mb-6 xl:ml-[32px] xl:justify-items-start xl:gap-y-6',
                  {
                    'gap-x-[21px] xl:grid-cols-[126px_auto] xl:items-end':
                      (item.layout as any) === 'col'
                  }
                )}>
                {item.logo}
                <p className=" text-center text-[20px] font-bold leading-[1.15] md:max-w-[194px] md:text-[16px] xl:max-w-none xl:text-left xl:text-[20px]">
                  {item.title}
                </p>
              </div>
              <div
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0, 0, 0, 0) 62.5%, rgba(0, 0, 0, 0.48) 100%)'
                }}
                className="absolute inset-0 z-[-1]"></div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default OurGames;
