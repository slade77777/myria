import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

const Backdrop = () => {
  return (
    <svg viewBox="0 0 616 105" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.7"
        d="M0 0L616 16V85C616 96.0457 607.046 105 596 105H20C8.95431 105 0 96.0457 0 85V0Z"
        fill="#050E15"
      />
    </svg>
  );
};

const data = [
  {
    logo: (
      <div className="w-full max-w-[288px]">
        <Image
          src="/images/our-games/metarush.png"
          alt="metarush"
          layout="responsive"
          width={865}
          height={145}
        />
      </div>
    ),
    background: '/images/our-games/metarush-bg.png',
    title: 'A multiplayer obstacle course game',
    link: '/',
    layout: 'row'
  },
  {
    logo: (
      <div className="w-full max-w-[126px]">
        <Image
          src="/images/our-games/block-royale.png"
          alt="block-royale"
          layout="responsive"
          width={378}
          height={339}
        />
      </div>
    ),
    background: '/images/our-games/block-royale-bg.png',
    title: 'A battle-royale shooter game',
    link: '/',
    layout: 'col'
  },
  {
    logo: (
      <div className="w-full max-w-[242px]">
        <Image
          src="/images/our-games/metakart.png"
          alt="metakart"
          layout="responsive"
          width={242}
          height={51}
        />
      </div>
    ),
    background: '/images/our-games/metakart-bg.png',
    title: 'A multiplayer go-kart racing game',
    link: '/',
    layout: 'row'
  },
  {
    logo: (
      <div className="w-full max-w-[245px]">
        <Image
          src="/images/our-games/starstrike.png"
          alt="metakart"
          layout="responsive"
          width={245}
          height={78}
        />
      </div>
    ),
    background: '/images/our-games/starstrike-bg.png',
    title: 'An objective-based shooter game',
    link: '/',
    layout: 'row'
  }
] as const;

const OurGames: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-[24px] md:gap-[32px] text-brand-white">
      {data.map((item, idx) => {
        return (
          <div
            key={idx}
            style={{
              backgroundImage: `url("${item.background}")`
            }}
            className="overflow-hidden relative isolate h-[342px] flex justify-between items-end bg-cover bg-center rounded-[20px]">
            <div
              className={clsx(
                'mb-[22px] md:mb-4 xl:mb-6 justify-items-center flex-grow xl:justify-items-start xl:ml-[32px] grid content-end gap-y-4 md:gap-y-3 xl:gap-y-6',
                {
                  'xl:grid-cols-[126px_auto] gap-x-[21px] xl:items-end': item.layout === 'col'
                }
              )}>
              {item.logo}
              <p className="text-[20px] md:text-[16px] xl:text-[20px] text-center xl:text-left leading-[1.15] font-extrabold md:max-w-[194px] xl:max-w-none">
                {item.title}
              </p>
            </div>
            <button className="hidden mb-6 ml-4 mr-6 xl:block btn-lg btn-white whitespace-nowrap">
              Learn more
            </button>
            <div className="absolute z-[-1] min-w-[616px] -translate-x-1/2 w-[calc(100%+2px)] bottom-0 left-1/2">
              <Backdrop />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OurGames;
