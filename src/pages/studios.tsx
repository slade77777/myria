import clsx from 'clsx';
import Image from 'next/image';
import { paddingX } from '../utils';
import Page from '../components/Page';
import Link from 'next/link';
import AOS from 'aos';
import { useEffect, useRef } from 'react';
import Subscribe from 'src/components/Subscribe';
import 'aos/dist/aos.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { CustomEase } from 'gsap/dist/CustomEase';
import { t, Trans } from '@lingui/macro';
import useIsomorphicLayoutEffect from 'src/hooks/useIsomorphicLayoutEffect';
import { bannerHeight, bannerSpacingClassName } from 'src/components/Header/Header';
import BuyerNode from 'src/components/BuyerNodeCard';
import JoinMyriaCard from 'src/components/JoinMyriaCard';
import useLocalStorage from 'src/hooks/useLocalStorage';

const PLANNET_MOVE_X = 300;
const PLANNET_MOVE_Y = 300;
const OTHER_PLANNET_X = 400;
const CHARACTER_ON_ROCK_MOVE_Y = 0;

const Index = () => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(CustomEase);

  const myriaverseRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    let animations: gsap.core.Timeline[] = [];
    ScrollTrigger.matchMedia({
      '(min-width: 768px)': function () {
        const targets = [
          '.gsap-image-parallax-container-1',
          '.gsap-image-parallax-container-2',
          '.gsap-image-parallax-container-3'
        ];
        targets.forEach((target) => {
          let tl_foreground_parallax = gsap.timeline({
            scrollTrigger: {
              trigger: target,
              start: 'top bottom',
              scrub: 2
            }
          });

          tl_foreground_parallax.fromTo(
            `${target} .gsap-image-parallax`,
            {
              y: '200px',
              ease: 'slow'
            },
            {
              y: '-150px',
              ease: 'slow'
            }
          );
          animations.push(tl_foreground_parallax);
        });
      }
    });
    return () => {
      animations.forEach((tl) => tl.kill());
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    let animations: gsap.core.Timeline[] = [];
    ScrollTrigger.matchMedia({
      '(min-width: 768px)': function () {
        const q = gsap.utils.selector(myriaverseRef.current);

        let tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: myriaverseRef.current,
            start: 'top bottom',
            end: 'center top',
            scrub: 1
          }
        });

        tl1.to(q('#other-plannet'), {
          x: OTHER_PLANNET_X
        });

        let tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: myriaverseRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });

        tl2.to(q('#plannet'), {
          x: PLANNET_MOVE_X * 1.5,
          y: -PLANNET_MOVE_Y * 1.5
        });

        let tl3 = gsap.timeline({
          scrollTrigger: {
            trigger: myriaverseRef.current,
            start: 'bottom-=100px bottom',
            end: 'bottom center',
            scrub: 1
          }
        });

        tl3.to(q('#character-on-rock'), {
          y: -CHARACTER_ON_ROCK_MOVE_Y
          // ease: 'power4.out'
        });

        animations.push(tl1, tl2, tl3);
      }
    });
    return () => {
      animations.forEach((tl) => tl.kill());
    };
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      disable: function () {
        const maxWidth = 768;
        return window.innerWidth < maxWidth;
      }
    });
  }, []);

  return (
    <Page action={'auto'}>
      <div className={bannerSpacingClassName}>
        <section
          className={clsx(
            paddingX,
            "relative isolate min-h-[782px] bg-[url('/images/studios/header-bg-mobile_op.png')] bg-cover bg-top md:min-h-[872px] md:bg-none"
          )}>
          <div
            data-aos="fade-left"
            className="absolute inset-0 z-[-1] hidden bg-[url('/images/studios/header-bg_op.png')] bg-cover bg-top bg-no-repeat md:block"></div>
          <div
            style={{ background: 'linear-gradient(180deg, #003552 0%, #050E15 100%)' }}
            className="absolute top-0 left-0 z-[-2] hidden h-[606px] w-full md:block"
          />
          <div className="flex flex-col items-center pt-[112px] text-center md:items-start md:pt-[255px] md:pl-10 md:text-left">
            <div className="w-[192px] md:w-[252px]">
              <Image
                src="/images/studios/studios_op.png"
                alt=""
                width={252}
                height={146}
                data-aos="fade-right"
              />
            </div>
            <p
              data-aos="fade-right"
              className="mt-4 max-w-[447px] text-[20px] leading-[1.5] md:mt-6 md:text-[24px]">
              <Trans>Creating the new standard for blockchain games and experiences</Trans>
            </p>
          </div>
        </section>
        <section
          className={clsx(
            'relative isolate mt-0 flex items-start justify-center overflow-hidden pb-6 md:mt-[-150px] md:min-h-[944px] md:pt-[300px]',
            paddingX
          )}>
          <div className="absolute top-0 right-0 z-[-1] hidden h-full w-full md:block md:w-[90%]">
            <Image src="/images/home/blockchain-bg.png" alt="" layout="fill" objectFit="contain" />
          </div>
          <div className="gsap-image-parallax-container-1 mx-auto grid w-full max-w-content grid-cols-1 items-center gap-y-[53px] gap-x-[83px] md:grid-cols-2">
            <div className="gsap-image-parallax">
              <Image
                src="/images/home/character-circle.png"
                alt=""
                layout="responsive"
                width={1260}
                height={1306}
              />
            </div>
            <div className="text-center md:text-left">
              <h2 data-aos="fade-up" className="heading-md text-[#FFFDFD] md:heading-lg">
                <Trans>
                  A{' '}
                  <span className=" aos-text-slide-right text-brand-light-blue">
                    decentralized ecosystem
                  </span>{' '}
                  of blockchain games and worlds
                </Trans>
              </h2>
              <p data-aos="fade-up" className="body mt-[38px] text-light">
                <Trans>
                  Myria Studios is building a range of free-to-play AAA games spans across an entire
                  interconnected ecosystem. Players experience intertwining lore, characters, and
                  rich storylines that carry across each game world, and Myria tokens and NFTs can
                  be used across the Myriaverse.
                </Trans>
              </p>
            </div>
          </div>
        </section>
        <section
          className={clsx(
            'relative isolate z-0 mt-[100px] flex items-center justify-center bg-dark md:mt-0 md:min-h-[745px]',
            paddingX
          )}>
          <div className="mx-auto grid w-full max-w-content grid-cols-1 items-center gap-y-[53px] gap-x-[83px] md:grid-cols-2">
            <div className="text-center md:text-left">
              <h2 data-aos="fade-up" className="heading-md text-[#FFFDFD] md:heading-lg">
                <Trans>
                  <span className=" aos-text-slide-right text-brand-light-blue">Interoperable</span>{' '}
                  & Interconnected NFTs
                </Trans>
              </h2>
              <p data-aos="fade-up" className="body mt-6 text-light">
                <Trans>
                  Morphing interoperable NFTs is the new standard created by Myria. Players will be
                  able to utilize their NFTs across different avatars, games and metaverses. Truly
                  own your digital assets and collectibles.
                </Trans>
              </p>
              <Link href={'/interoperability'}>
                <a data-aos="fade-up" className="btn-lg btn-primary mt-[45px]">
                  <Trans>LEARN MORE</Trans>
                </a>
              </Link>
            </div>
            <div className="gsap-image-parallax-container-2 order-[-1] md:order-1">
              <div className="gsap-image-parallax hidden md:block">
                <Image
                  src="/images/home/cowboys.png"
                  alt=""
                  layout="responsive"
                  width={922}
                  height={1490}
                />
              </div>
              <div className="flex justify-center md:hidden">
                <Image src="/images/home/cowboys.png" alt="" width={233} height={377} />
              </div>
            </div>
          </div>
        </section>
        <section
          className={clsx(
            'relative isolate z-0 flex items-center justify-center bg-dark pt-[100px] pb-[100px] md:min-h-[629px] md:pb-0 md:pt-0',
            paddingX
          )}>
          <div className="mx-auto grid w-full max-w-content grid-cols-1 gap-y-[53px] gap-x-[83px] md:grid-cols-2">
            <div className="gsap-image-parallax-container-3">
              <div className="gsap-image-parallax hidden md:block">
                <Image
                  src="/images/home/tacco_guy_op1.png"
                  alt=""
                  layout="responsive"
                  width={554}
                  height={630}
                />
              </div>
              <div className="flex justify-center md:hidden">
                <Image src="/images/home/tacco_guy_op1.png" alt="" width={554} height={630} />
              </div>
            </div>
            <div className="relative flex flex-col justify-center overflow-hidden text-center md:text-left">
              <div className="relative isolate ">
                <h2 data-aos="fade-up" className="heading-md text-[#FFFDFD] md:heading-lg">
                  <Trans>
                    Powered and governed by{' '}
                    <span className=" aos-text-slide-right text-brand-light-blue">$MYRIA</span>
                  </Trans>
                </h2>
                <p data-aos="fade-up" className="body mt-10 text-light">
                  <Trans>
                    $MYRIA is the native governance and utility token that encapsulates the Myria
                    ecosystem. Players will be able to use $MYRIA to buy, trade, upgrade, vote and
                    more!
                  </Trans>
                </p>
                <button data-aos="fade-up" className="btn-lg btn-primary mt-[70px] mr-auto">
                  <Trans>TOKEN LAUNCH COMING SOON</Trans>
                </button>
                <div className="absolute top-[-40px] right-0 z-[-1] hidden md:block">
                  <Image src="/images/home/coins-bg.png" alt="" width={262} height={510} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          ref={myriaverseRef}
          className={clsx(
            'relative isolate flex min-h-[936px] items-end justify-center overflow-hidden py-4 md:min-h-[811px] md:items-center',
            paddingX
          )}>
          <div className="absolute top-0 right-0 z-[-1] hidden h-full w-full md:block">
            <div
              id="other-plannet"
              style={{
                right: `calc(64px + ${OTHER_PLANNET_X}px)`
              }}
              className="absolute top-[62px]">
              <Image src="/images/home/other-plannet_op.png" alt="" width={726} height={597} />
            </div>
            <div
              id="plannet"
              style={{
                right: PLANNET_MOVE_X,
                top: 62 + PLANNET_MOVE_Y
              }}
              className="absolute">
              <Image src="/images/home/plannet_op.png" alt="" width={906} height={525} />
            </div>
            <div
              id="character-on-rock"
              style={{
                bottom: 0
              }}
              className="absolute w-full">
              <Image
                src="/images/home/character-on-rock_op2.png"
                alt=""
                layout="responsive"
                width={1440}
                height={811}
              />
              <div
                style={{
                  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 86.46%, #050E15 100%)'
                }}
                className="absolute inset-0"
              />
            </div>
          </div>
          <div className="absolute top-0 right-0 z-[-1] h-full w-full md:hidden">
            <Image
              src="/images/home/myriaverse-mobile_op.png"
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="mx-auto mb-[90px] grid w-full max-w-content grid-cols-1 items-center gap-y-[53px] gap-x-[83px] md:grid-cols-2">
            <div className="text-center md:text-left">
              <h2 data-aos="fade-up" className="heading-md text-[#FFFDFD] md:heading-lg">
                <Trans>Unified through the Myriaverse</Trans>
              </h2>
              <p data-aos="fade-up" className="body mt-[51px] text-light">
                <Trans>
                  Myriaverse is the wider social metaverse connecting players, communities and
                  guilds. Players will be able to quest, explore, craft, invest and so much more.
                  The ever expanding Myriaverse is a virtual society and economy that offers
                  bountiful earning opportunities for the brave adventurer.
                </Trans>
              </p>
              <button data-aos="fade-up" className="btn-lg btn-primary mt-[51px]">
                <Trans>More details coming soon</Trans>
              </button>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[58px]')}>
          <div className="mx-auto grid max-w-content gap-8 md:grid-cols-2">
            <BuyerNode />
            <JoinMyriaCard />
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[64px] mb-[156px] md:mb-[168px]')}>
          <div className="mx-auto max-w-content">
            <Subscribe />
          </div>
        </section>
      </div>
    </Page>
  );
};

export default Index;
