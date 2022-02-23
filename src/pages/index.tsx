import clsx from 'clsx';
import { headerHeight } from '../components/Header';
import DiscordIcon from '../components/icons/DiscordIcon';
import OurGames from '../components/OurGames';
import Image from 'next/image';
import JoinTheRevolution from '../components/JoinTheRevolution';
import ExperenceLogos from '../components/ExperienceLogos';
import { paddingX } from '../utils';
import Page from '../components/Page';
import Link from 'next/link';
import { socialLinks } from 'src/configs';
import AOS from 'aos';
import { CSSProperties, useEffect, useRef } from 'react';
import Subscribe from 'src/components/Subscribe';
import 'aos/dist/aos.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { CustomEase } from 'gsap/dist/CustomEase';
import { t, Trans } from '@lingui/macro';
import useIsomorphicLayoutEffect from 'src/hooks/useIsomorphicLayoutEffect';
import Hero from 'src/components/home/Hero';

const PLANNET_MOVE_X = 300;
const PLANNET_MOVE_Y = 300;
const OTHER_PLANNET_X = 400;
const CHARACTER_ON_ROCK_MOVE_Y = 200;

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
    <>
      <div className="flex flex-col items-center justify-center bg-brand-light-blue p-4 text-center md:flex-row md:py-2 md:text-left">
        <p className="text-[14px] font-medium leading-[1.23] ">
          <span className="font-bold">$MYRIA</span> <Trans>Node & NFT sales coming soon!</Trans>
        </p>
        <a
          href={socialLinks.discord}
          target="_blank"
          className="btn-icon-sm btn-white mt-4 flex items-center px-4 text-[12px] md:mt-0 md:ml-6"
          rel="noreferrer">
          <span className="w-[16px]">
            <DiscordIcon />
          </span>
          <span className="ml-1">
            <Trans>JOIN DISCORD</Trans>
          </span>
        </a>
      </div>
      <Page action="join-discord">
        <div>
          <Hero />
          <section id="our-games" className={clsx('pt-[116px] md:pt-[86px]', paddingX)}>
            <h2 data-aos="fade-up" className="heading-md text-center md:heading-lg">
              <Trans>Our games</Trans>
            </h2>
            <div className="mx-auto mt-10 max-w-content md:mt-[58px]">
              <OurGames />
            </div>
          </section>
          <section
            className={clsx(
              'relative isolate mt-[100px] flex items-start justify-center overflow-hidden pb-6 md:mt-0 md:min-h-[944px] md:pt-[300px]',
              paddingX
            )}>
            <div className="absolute top-0 right-0 z-[-1] hidden h-full w-full md:block md:w-[90%]">
              <Image
                src="/images/home/blockchain-bg.png"
                alt=""
                layout="fill"
                objectFit="contain"
              />
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
                    Our range of free-to-play AAA games spans across an entire interconnected
                    ecosystem. Players experience intertwining lore, characters, and rich storylines
                    that carry across each game world, and Myria tokens and NFTs can be used across
                    the Myriaverse.
                  </Trans>
                </p>
                <Link href="/ecosystem">
                  <a data-aos="fade-up" className="btn-lg btn-primary mt-[38px]">
                    <Trans>READ ABOUT OUR ECOSYSTEM</Trans>
                  </a>
                </Link>
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
                    <span className=" aos-text-slide-right text-brand-light-blue">
                      Interoperable
                    </span>{' '}
                    & Interconnected NFTs
                  </Trans>
                </h2>
                <p data-aos="fade-up" className="body mt-6 text-light">
                  Morphing interoperable NFTs is the new standard created by Myria. Players will be
                  able to utilize their NFTs across different avatars, games and metaverses. Truly
                  own your digital assets and collectibles.
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
                    src="/images/home/tacco_guy_op_trans.png"
                    alt=""
                    layout="responsive"
                    width={554}
                    height={630}
                  />
                </div>
                <div className="flex justify-center md:hidden">
                  <Image src="/images/home/tacco_guy_op_trans.png" alt="" width={554} height={630} />
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
                  src="/images/home/character-on-rock_op.png"
                  alt=""
                  layout="responsive"
                  width={1440}
                  height={811}
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
          <section
            className={clsx(
              'relative isolate mt-[130px] grid grid-cols-1 grid-rows-1 items-center justify-center py-20 md:mt-0 md:min-h-[790px]'
            )}>
            <div className="[grid-area:1/1/-1/-1] md:hidden">
              <Image src="/images/home/globe.png" width={856} height={1034} alt="" />
            </div>
            <div className="pointer-events-none hidden justify-end [grid-area:1/1/-1/-1] md:flex">
              {/* <Video
                isVisible={true}
                options={{
                  sources: [
                    {
                      src: '/images/home/video-bg.mp4'
                    }
                  ],
                  aspectRatio: '16:9',
                  autoplay: true,
                  muted: true,
                  poster: '',
                  responsive: true,
                  controlBar: false,
                  loop: true
                }}
              /> */}
              <div className="w-[700px]">
                <Image
                  src="/images/home/globe-desktop.png"
                  width={1001}
                  height={1172}
                  alt=""
                  layout="intrinsic"
                />
              </div>
            </div>
            <div
              className={clsx(
                paddingX,
                'z-[1] flex items-center justify-center [grid-area:1/1/-1/-1]'
              )}>
              <div className="w-full max-w-content text-center md:text-left">
                <div>
                  <p data-aos="fade-up" className="caption text-brand-light-blue">
                    <Trans>Grow with myria</Trans>
                  </p>
                  <h2 data-aos="fade-up" className="heading-md mt-4 md:heading-lg">
                    <Trans>Join the thriving Myria ecosystem </Trans>
                  </h2>
                  <div className="body-sm mt-6 max-w-[616px] text-light md:body">
                    <p data-aos="fade-up" className="">
                      <Trans>
                        Get the latest updates on our games, token and NFT releases, play-to-earn
                        mechanics, and have the opportunity to access alpha gameplay.
                      </Trans>
                    </p>
                    <p data-aos="fade-up" className="mt-6">
                      <Trans>
                        Operate a Myria node from your home computer and earn rewards for your
                        contribution to the network.
                      </Trans>
                    </p>
                  </div>
                  <div className="mt-[60px] flex items-center justify-center md:justify-start">
                    <a
                      data-aos="fade-up"
                      className="btn-icon btn-white flex items-center"
                      href={socialLinks.discord}
                      target="_blank"
                      rel="noreferrer">
                      <span className="w-[30px]">
                        <DiscordIcon />
                      </span>
                      <span>
                        <Trans>JOIN DISCORD</Trans>
                      </span>
                    </a>
                    <Link href="/nodes">
                      <a data-aos="fade-up" className="btn-lg btn-primary ml-4 md:ml-[31px]">
                        <Trans>RUN A NODE</Trans>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={clsx(paddingX, 'mt-[152px] md:mt-[128px]')}>
            <div className="mx-auto grid max-w-content grid-cols-1 gap-6 md:grid-cols-2 md:gap-[32px]">
              <div className="relative isolate h-[470px] overflow-hidden rounded-[20px] bg-brand-deep-blue p-[32px] md:h-[540px] md:p-10">
                <div className="absolute inset-0 z-[-1]">
                  <Image src="/images/home/for-gamers.png" alt="" layout="fill" objectFit="cover" />
                </div>
                <h2 data-aos="fade-up" className="heading-md md:heading-lg">
                  <Trans>For Gamers</Trans>
                </h2>
                <p
                  data-aos="fade-up"
                  className="body mt-4 max-w-[284px] text-light md:body md:mt-6">
                  <Trans>Discover the best games built on the blockchain</Trans>
                </p>
                <Link href="/games">
                  <a data-aos="fade-up" className="btn-lg btn-primary mt-6 md:mt-10">
                    <Trans>Learn more</Trans>
                  </a>
                </Link>
              </div>
              <div className="relative isolate h-[470px] overflow-hidden rounded-[20px] bg-brand-deep-blue p-[32px] md:h-[540px] md:p-10">
                <div className="absolute inset-0 z-[-1]">
                  <Image
                    src="/images/home/for-studios_op.png"
                    alt=""
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h2 data-aos="fade-up" className="heading-md md:heading-lg">
                  <Trans>For Studios</Trans>
                </h2>
                <p
                  data-aos="fade-up"
                  className="body mt-4 max-w-[310px] text-light md:body md:mt-6">
                  <Trans>Myria helps studios join the blockchain revolution</Trans>
                </p>
                <Link href="/for-studios">
                  <a data-aos="fade-up" className="btn-lg btn-light-blue mt-6 md:mt-10">
                    <Trans>Learn more</Trans>
                  </a>
                </Link>
              </div>
            </div>
          </section>
          <section className={clsx(paddingX, 'mt-[168px] hidden flex-col md:flex')}>
            <h1 data-aos="fade-up" className="heading-massive mx-auto max-w-[1024px] text-center">
              <Trans>Founded by leading gaming and blockchain industry veterans</Trans>
            </h1>
            <p
              data-aos="fade-up"
              className="body-lg mx-auto mt-[32px] max-w-[717px] text-center text-light">
              <Trans>
                Myria has been built by an all-star team of over 60+ people, united with a common
                vision of revolutionizing gaming with blockchain technology.{' '}
              </Trans>
            </p>
            <Link href={'/about-us'}>
              <a data-aos="fade-up" className="btn-lg btn-primary mx-auto mt-10 flex">
                <Trans>MEET THE TEAM</Trans>
              </a>
            </Link>
          </section>
          <section className={clsx(paddingX, 'mt-[123px] md:mt-[152px]')}>
            <h2 data-aos="fade-up" className="heading-md text-center md:heading-lg">
              <Trans>Our Experience</Trans>
            </h2>
            <div data-aos="fade-up" className="mt-[59px]">
              <ExperenceLogos />
            </div>
          </section>
          <section className={clsx(paddingX, 'mt-[43px] md:mt-[168px]')}>
            <div className="mx-auto max-w-content">
              <JoinTheRevolution textAnimation="fade-up" />
            </div>
          </section>
          <section className={clsx(paddingX, 'mt-[64px] mb-[156px] md:mb-[168px]')}>
            <div className="mx-auto max-w-content">
              <Subscribe />
            </div>
          </section>
        </div>
      </Page>
    </>
  );
};

export default Index;
