import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Backdrop = () => {
  return (
    <svg viewBox="0 0 616 105" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.7"
        d="M0 0L616 16V93C616 99.6274 610.627 105 604 105H12C5.37259 105 0 99.6274 0 93V0Z"
        fill="#050E15"
      />
    </svg>
  );
};

const data = [
  {
    logo: (
      <div className="w-[225px] md:w-[288px]">
        <Image
          src="/images/our-games/metarush_updated.png"
          alt="metarush"
          layout="responsive"
          width={926}
          height={177}
        />
      </div>
    ),
    background: '/images/our-games/metarush-bg.png',
    title: 'A multiplayer obstacle course game',
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
    title: 'A battle-royale shooter game',
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
    title: 'A multiplayer go-kart racing game',
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
    title: 'An objective-based shooter game',
    link: '/game-detail/starstrike',
    layout: 'row'
  }
] as const;

const OurGames: React.FC<{ btnLabel?: string }> = ({ btnLabel = 'Learn more' }) => {
  return (
    <div className="grid md:grid-cols-2 gap-[24px] md:gap-[32px] text-brand-white gsap-our-games-container">
      {data.map((item, idx) => {
        return (
          <Link href={item.link} key={idx}>
            <a
              style={{
                backgroundImage: `url("${item.background}")`
              }}
              className="hover:[box-shadow:0_0_0_3px_#fff] overflow-hidden relative isolate h-[211px] md:h-[342px] flex justify-between items-end bg-cover bg-center rounded-lg gsap-our-games">
              <div
                className={clsx(
                  'mb-[22px] md:mb-4 xl:mb-6 justify-items-center flex-grow xl:justify-items-start xl:ml-[32px] grid content-end gap-y-4 md:gap-y-3 xl:gap-y-6',
                  {
                    'xl:grid-cols-[126px_auto] gap-x-[21px] xl:items-end':
                      (item.layout as any) === 'col'
                  }
                )}>
                {item.logo}
                <p className=" font-bold text-[20px] md:text-[16px] xl:text-[20px] text-center xl:text-left leading-[1.15] md:max-w-[194px] xl:max-w-none">
                  {item.title}
                </p>
              </div>
              <button className="hidden mb-6 ml-4 mr-6 xl:block btn-lg btn-white whitespace-nowrap">
                {btnLabel}
              </button>
              <div className="absolute z-[-1] min-w-[500px] md:min-w-[616px] -translate-x-1/2 w-[calc(100%+5px)] bottom-0 left-1/2">
                <Backdrop />
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default OurGames;
