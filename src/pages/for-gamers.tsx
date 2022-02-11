import { t, Trans } from '@lingui/macro';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { headerHeight } from '../components/Header';
import LoveIcon from '../components/icons/LoveIcon';
import SafetyIcon from '../components/icons/SafetyIcon';
import UserIcon from '../components/icons/UserIcon';
import OurGames from '../components/OurGames';
import Page from '../components/Page';
import { paddingX } from '../utils';

const principles = [
  {
    icon: (
      <div className="w-[32px]">
        <LoveIcon />
      </div>
    ),
    title: t`Gameplay first`,
    description: t`Myria develops fun AAA games that are enhanced by the blockchain, not vice versa. `
  },
  {
    icon: (
      <div className="w-[32px]">
        <SafetyIcon />
      </div>
    ),
    title: t`Empowering players`,
    description: t`We believe players should have true verifiable ownership and control over in-game assets. `
  },
  {
    icon: (
      <div className="w-[32px]">
        <UserIcon />
      </div>
    ),
    title: t`Powered by the community`,
    description: t`Myria is supported by a network of community-powered nodes, who receive rewards for their contributions. `
  }
];

const ForGamers: React.FC = () => {
  const [currentPrinciple, setCurrentPrinciple] = useState(0);

  const elRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      let idx = currentPrinciple;
      for (let i = 0; i < elRefs.current.length; i++) {
        const el = elRefs.current[i];
        const elInfo = el?.getBoundingClientRect();
        if (elInfo && elInfo.top > 100 && elInfo.top < 300) {
          idx = i;
        }
      }
      setCurrentPrinciple(idx);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPrinciple]);

  return (
    <Page>
      <div>
        <section
          style={{
            paddingTop: headerHeight,
            backgroundPositionY: headerHeight
          }}
          className={clsx(paddingX, 'relative isolate md:min-h-screen ')}>
          <div
            style={{
              top: headerHeight
            }}
            className="absolute left-0 z-[-2] h-[783px] w-full">
            <div className="relative h-full w-full ">
              <Image src="/images/header-bg.png" alt="" layout="fill" objectFit="cover" priority />
            </div>
          </div>
          <div className="absolute left-0 bottom-0 z-[-1] w-[910px] max-w-full">
            <Image
              src="/images/for-gamers/game.png"
              alt=""
              layout="responsive"
              objectFit="cover"
              width={910}
              height={1047}
            />
          </div>
          <div className="mx-auto w-full max-w-content ">
            <h1 className="heading-lg mx-auto mt-[50px] max-w-[607px] text-center text-brand-white md:heading-massive md:mt-[120px]">
              <Trans>
                Connecting the world through <span className=" text-brand-gold">play</span>
              </Trans>
            </h1>
            <div className="ml-auto mt-[200px] md:mt-[424px] md:w-1/2 md:pb-[148px] lg:pr-[100px]">
              <p className="caption text-brand-light-blue">
                <Trans>SHIFTING POWER BACK TO THE PEOPLE</Trans>
              </p>
              <h3 className="heading-sm mt-2 md:heading-md">
                <Trans>Our Principles</Trans>
              </h3>
              <div>
                {principles.map((item, idx) => (
                  <div
                    ref={(el) => (elRefs.current[idx] = el)}
                    style={{
                      boxShadow: '0px 0px 40px 10px rgba(0, 0, 0, 0.3)'
                    }}
                    className={clsx(
                      'mt-6 flex items-start rounded-[20px] p-6 opacity-50 transition duration-300',
                      {
                        'bg-brand-deep-blue !opacity-100': idx == currentPrinciple
                      }
                    )}
                    key={idx}>
                    <div className="w-[32px] flex-shrink-0">{item.icon}</div>
                    <div className="ml-4">
                      <h4 className="text-[24px] font-bold leading-[1.25]">{item.title}</h4>
                      <p className="body mt-2 text-light">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[53px]')}>
          <div className="mx-auto max-w-content">
            <h3 className="heading-sm text-center md:heading-md">
              <Trans>Our games</Trans>
            </h3>
            <div className="mt-[48px]">
              <OurGames />
            </div>
          </div>
        </section>
        <section
          className={clsx(
            paddingX,
            "mt-[115px] mb-[180px] flex min-h-[792px] w-full flex-col justify-center  bg-[url('/images/globe.png')] bg-center bg-no-repeat md:bg-right"
          )}>
          <div className="mx-auto max-w-content ">
            <div className="md:w-1/2">
              <h3 className="heading-sm md:heading-md">
                <Trans>Pupose-built infrastructure</Trans>
              </h3>
              <p className="body mt-6">
                <Trans>
                  The Myria ecosystem is built on Myria blockchain, our Ethereum L2 built for
                  gaming. Our team have developed proprietary technology to make the gaming and
                  trading experience seamless, including a decentralized exchange, marketplace, and
                  cryptocurrency wallet.
                </Trans>
              </p>
              <button className="btn-lg btn-primary mt-10">
                <Trans>GET A NODE</Trans>
              </button>
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
};

export default ForGamers;
