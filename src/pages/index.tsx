import clsx from 'clsx';
import { headerHeight } from '../components/Header';
import DiscordIcon from '../components/icons/DiscordIcon';
import OurGames from '../components/OurGames';
import Image from 'next/image';
import JoinTheRevolution from '../components/JoinTheRevolution';
import ExperenceLogos from '../components/ExperienceLogos';
import { paddingX } from '../utils';
import ArrowDownIcon from '../components/icons/ArrowDownIcon';
import Page from '../components/Page';
import Link from 'next/link';
import { socialLinks } from 'src/configs';
import AOS from 'aos';
import { useEffect, useLayoutEffect } from 'react';
import { useAnimation, motion } from 'framer-motion';
import Subscribe from 'src/components/Subscribe';
import 'aos/dist/aos.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { CustomEase } from 'gsap/dist/CustomEase';
import Video from 'src/components/Video';

const Index = () => {
  const img1Animation = useAnimation();
  const img2Animation = useAnimation();
  const img3Animation = useAnimation();
  const img4Animation = useAnimation();

  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(CustomEase);

  useLayoutEffect(() => {
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
        });
      }
    });
  }, []);

  useLayoutEffect(() => {
    ScrollTrigger.matchMedia({
      '(min-width: 768px)': function () {
        gsap.set('.gsap-bg-parallax', {
          transform: 'matrix(1.2, 0, 0, 1.2, 0, 472)'
        });

        gsap.to('.gsap-bg-parallax', {
          transform: 'matrix(1, 0, 0, 1, 0, 0)',
          ease: 'none',
          scrollTrigger: {
            trigger: '.gsap-bg-parallax-container',
            scrub: true,
            end: 'bottom top+=100'
          }
        });

        gsap.set('.gsap-text-fade-in', {
          opacity: 0,
          transform: 'scale(0.7)'
        });

        gsap.to('.gsap-text-fade-in', {
          opacity: 1,
          transform: 'scale(1)',
          ease: 'none',
          scrollTrigger: {
            trigger: '.gsap-bg-parallax-container',
            scrub: true,
            start: 'bottom bottom',
            end: 'bottom+=100 top+=200'
          }
        });
      }
    });
  }, []);

  useLayoutEffect(() => {
    ScrollTrigger.matchMedia({
      '(min-width: 768px)': function () {
        const tl_our_games = gsap.timeline({
          scrollTrigger: {
            trigger: '.gsap-our-games-container',
            start: 'top 80%',
            end: 'bottom top'
          }
        });

        tl_our_games.from('.gsap-our-games', {
          xPercent: '100',
          opacity: 0,
          stagger: 0.3,
          ease: 'back',
          duration: 2
        });
      }
    });
  }, []);

  const handleMouseMove = (e: any) => {
    const { clientX, clientY } = e;
    const moveX = clientX - window.innerWidth / 2;
    const moveY = clientY - window.innerHeight / 2;
    const offsetFactor = 5;

    img1Animation.start({
      x: -moveX / (offsetFactor + 15),
      y: -moveY / (offsetFactor + 15)
    });
    img2Animation.start({
      x: -moveX / (offsetFactor + 7),
      y: -moveY / (offsetFactor + 7)
    });
    img3Animation.start({
      x: -moveX / (offsetFactor + 15),
      y: -moveY / (offsetFactor + 15)
    });
    img4Animation.start({
      x: -moveX / (offsetFactor + 7),
      y: -moveY / (offsetFactor + 7)
    });
  };

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
          <span className="font-bold">$MYRIA</span> Token Sale and Node Sale coming soon!
        </p>
        <a
          href={socialLinks.discord}
          target="_blank"
          className="btn-icon-sm btn-white mt-4 flex items-center px-4 text-[12px] md:mt-0 md:ml-6"
          rel="noreferrer">
          <span className="w-[16px]">
            <DiscordIcon />
          </span>
          <span className="ml-1">JOIN DISCORD</span>
        </a>
      </div>
      <Page action="join-discord">
        <div>
          <motion.div
            onMouseMove={(e) => handleMouseMove(e)}
            style={{
              paddingTop: headerHeight,
              paddingBottom: headerHeight
            }}
            className={clsx(
              paddingX,
              'relative isolate flex min-h-[900px] flex-col items-center overflow-hidden md:min-h-[789px] md:justify-center '
            )}>
            <div className="absolute left-0 z-[-1] w-full md:hidden">
              <div className="relative h-[815px] w-full overflow-hidden">
                <Image
                  src="/images/home/header-bg-mobile.png"
                  alt=""
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
            <div
              style={{
                background: 'radial-gradient(50% 50% at 50% 50%, #022138 0%, #050E15 100%)'
              }}
              className="absolute left-0 z-[-1] hidden h-[697px] w-full md:block">
              <motion.div animate={img1Animation} className="absolute bottom-0 left-0 w-[394px]">
                <Image src="/images/home/char1.png" alt="" width={651} height={947} />
              </motion.div>
              <motion.div
                animate={img2Animation}
                className="absolute bottom-0 left-[50px] w-[400px]">
                <Image src="/images/home/char2.png" alt="" width={446} height={561} />
              </motion.div>
              <motion.div
                animate={img3Animation}
                className="absolute bottom-[15px] right-[90px] w-[643px]">
                <Image src="/images/home/char3.png" alt="" width={643} height={362} />
              </motion.div>
              <motion.div
                animate={img4Animation}
                className="absolute bottom-[10px] right-[10px] w-[310px]">
                <Image src="/images/home/char4.png" alt="" width={570} height={766} />
              </motion.div>
            </div>

            <div className="mt-[50px] max-w-[607px] text-center md:mt-0">
              <h1
                data-aos="fade-up"
                data-aos-duration="1000"
                className="heading-lg text-brand-white md:heading-massive">
                Connecting the world through{' '}
                <span className=" aos-text-slide-right text-brand-gold [--animated-color:#F5B941]">
                  play
                </span>
              </h1>
              <h3
                data-aos="fade-up"
                data-aos-duration="2000"
                className="heading-sm-mobile mt-6 md:heading-sm md:mt-[32px]">
                <span className="aos-text-slide-right text-white ![animation-delay:0.5s] [--current-color:#97AAB5] [--animated-color:white]">
                  Myria is a blockchain gaming ecosystem powered by the Myria blockchain.
                </span>
              </h3>
              <a
                data-aos="fade-up"
                data-aos-duration="3000"
                href={socialLinks.discord}
                target="_blank"
                className="btn-icon btn-primary mx-auto mt-[38px] inline-flex items-center"
                rel="noreferrer">
                <span className="w-[30px]">
                  <DiscordIcon />
                </span>
                <span>JOIN DISCORD</span>
              </a>
              {/* <a
                href="#our-games"
                className="md:hidden flex items-center justify-center mt-[237px] bg-[#96C5DF] w-[64px] h-[64px] rounded-full mx-auto bg-opacity-20">
                <span className="w-[40px]">
                  <ArrowDownIcon />
                </span>
              </a> */}
            </div>
          </motion.div>
          <section id="our-games" className={clsx('overflow-hidden pt-[14px]', paddingX)}>
            <h2 data-aos="fade-up" className="heading-md text-center md:heading-lg">
              Our games
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
                  A{' '}
                  <span className=" aos-text-slide-right text-brand-light-blue">
                    decentralized ecosystem
                  </span>{' '}
                  of blockchain games and worlds
                </h2>
                <p data-aos="fade-up" className="body mt-[38px] text-light">
                  Our range of free-to-play AAA games spans across an entire interconnected
                  ecosystem. Players experience intertwining lore, characters, and rich storylines
                  that carry across each game world, and Myria tokens and NFTs can be used across
                  the Myriaverse.
                </p>
                <Link href="/ecosystem">
                  <a data-aos="fade-up" className="btn-lg btn-primary mt-[38px]">
                    READ ABOUT OUR ECOSYSTEM
                  </a>
                </Link>
              </div>
            </div>
          </section>
          <section
            className={clsx(
              'relative isolate z-10 mt-[100px] flex items-center justify-center bg-dark md:mt-0 md:min-h-[745px]',
              paddingX
            )}>
            <div className="mx-auto grid w-full max-w-content grid-cols-1 items-center gap-y-[53px] gap-x-[83px] md:grid-cols-2">
              <div className="text-center md:text-left">
                <h2 data-aos="fade-up" className="heading-md text-[#FFFDFD] md:heading-lg">
                  <span className=" aos-text-slide-right text-brand-light-blue">Interoperable</span>{' '}
                  & Interconnected NFTs
                </h2>
                <p data-aos="fade-up" className="body mt-6 text-light">
                  Morphing interoperable NFTs is the new standard created by Myria. Players will be
                  able to utilize their NFTs across different avatars, games and metaverses. Truly
                  own your digital assets and collectibles.
                </p>
                <Link href={'/interoperability'}>
                  <a data-aos="fade-up" className="btn-lg btn-primary mt-[45px]">
                    LEARN MORE
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
              'relative isolate z-10 flex items-center justify-center bg-dark pt-[100px] pb-[100px] md:min-h-[629px] md:pt-0',
              paddingX
            )}>
            <div className="mx-auto grid w-full max-w-content grid-cols-1 gap-y-[53px] gap-x-[83px] md:grid-cols-2">
              <div className="gsap-image-parallax-container-3">
                <div className="gsap-image-parallax hidden md:block">
                  <Image
                    src="/images/home/tacoguy.png"
                    alt=""
                    layout="responsive"
                    width={804}
                    height={1206}
                  />
                </div>
                <div className="flex justify-center md:hidden">
                  <Image src="/images/home/tacoguy.png" alt="" width={254} height={382} />
                </div>
              </div>
              <div className="relative flex flex-col justify-center overflow-hidden text-center md:text-left">
                <div className="relative isolate ">
                  <h2 data-aos="fade-up" className="heading-md text-[#FFFDFD] md:heading-lg">
                    Powered and governed by{' '}
                    <span className=" aos-text-slide-right text-brand-light-blue">$MYRIA</span>
                  </h2>
                  <p data-aos="fade-up" className="body mt-10 text-light">
                    $MYRIA is the native governance and utility token that encapsulates the Myria
                    ecosystem. Players will be able to use $MYRIA to buy, trade, upgrade, vote and
                    more!
                  </p>
                  <button data-aos="fade-up" className="btn-lg btn-primary mt-[70px] mr-auto">
                    TOKEN SALE COMING SOON
                  </button>
                  <div className="absolute top-[-40px] right-0 z-[-1] hidden md:block">
                    <Image src="/images/home/coins-bg.png" alt="" width={262} height={510} />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="relative md:mt-[-100vh] md:h-[200vh]">
            <section
              className={clsx(
                'gsap-bg-parallax-container sticky top-0 isolate flex h-screen items-end justify-center overflow-hidden py-4 md:items-center',
                paddingX
              )}>
              <div
                className="gsap-bg-parallax absolute top-0 right-0 z-[-1] hidden h-full w-full bg-cover bg-center bg-no-repeat md:block md:w-[90%]"
                style={{ backgroundImage: 'url(/images/home/myriaverse.png)' }}
              />
              <div className="absolute top-0 right-0 z-[-1] h-full w-full md:hidden md:w-[90%]">
                <Image
                  src="/images/home/myriaverse-mobile.png"
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="gsap-text-fade-in mx-auto grid w-full max-w-content grid-cols-1 items-center gap-y-[53px] gap-x-[83px] md:grid-cols-2">
                <div className="text-center md:text-left">
                  <h2 className="heading-md text-[#FFFDFD] md:heading-lg">
                    Unified through the Myriaverse
                  </h2>
                  <p className="body mt-[51px] text-light">
                    Myriaverse is the wider social metaverse connecting players, communities and
                    guilds. Players will be able to quest, explore, craft, invest and so much more.
                    The ever expanding Myriaverse is a virtual society and economy that offers
                    bountiful earning opportunities for the brave adventurer.
                  </p>
                  <button className="btn-lg btn-primary mt-[51px]">More details coming soon</button>
                </div>
              </div>
            </section>
          </div>
          <section
            className={clsx(
              'relative isolate mt-[130px] grid grid-cols-1 grid-rows-1 items-center justify-center py-10 md:mt-0 md:min-h-[790px]'
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
                    Grow with myria
                  </p>
                  <h2 data-aos="fade-up" className="heading-md mt-4 md:heading-lg">
                    Join the thriving Myria ecosystem{' '}
                  </h2>
                  <div className="body-sm mt-6 max-w-[616px] text-light md:body">
                    <p data-aos="fade-up" className="">
                      Get the latest updates on our games, token and NFT releases, play-to-earn
                      mechanics, and have the opportunity to access alpha gameplay.
                    </p>
                    <p data-aos="fade-up" className="mt-6">
                      Operate a Myria node from your home computer and earn rewards for your
                      contribution to the network.
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
                      <span>JOIN DISCORD</span>
                    </a>
                    <Link href="/nodes">
                      <a data-aos="fade-up" className="btn-lg btn-primary ml-4 md:ml-[31px]">
                        RUN A NODE
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
                  For Gamers
                </h2>
                <p
                  data-aos="fade-up"
                  className="body mt-4 max-w-[284px] text-light md:body md:mt-6">
                  Discover the best games built on the blockchain
                </p>
                <Link href="/games">
                  <a data-aos="fade-up" className="btn-lg btn-primary mt-6 md:mt-10">
                    Learn more
                  </a>
                </Link>
              </div>
              <div className="relative isolate h-[470px] overflow-hidden rounded-[20px] bg-brand-deep-blue p-[32px] md:h-[540px] md:p-10">
                <div className="absolute inset-0 z-[-1]">
                  <Image
                    src="/images/home/for-studios.png"
                    alt=""
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <h2 data-aos="fade-up" className="heading-md md:heading-lg">
                  For Studios
                </h2>
                <p
                  data-aos="fade-up"
                  className="body mt-4 max-w-[310px] text-light md:body md:mt-6">
                  Myria helps studios join the blockchain revolution
                </p>
                <Link href="/for-studios">
                  <a data-aos="fade-up" className="btn-lg btn-light-blue mt-6 md:mt-10">
                    Learn more
                  </a>
                </Link>
              </div>
            </div>
          </section>
          <section className={clsx(paddingX, 'mt-[168px] hidden flex-col md:flex')}>
            <h1 data-aos="fade-up" className="heading-massive mx-auto max-w-[1024px] text-center">
              Founded by leading gaming and blockchain industry veterans
            </h1>
            <p
              data-aos="fade-up"
              className="body-lg mx-auto mt-[32px] max-w-[717px] text-center text-light">
              Myria has been built by an all-star team of over 60+ people, united with a common
              vision of revolutionizing gaming with blockchain technology.{' '}
            </p>
            <Link href={'/about-us'}>
              <a data-aos="fade-up" className="btn-lg btn-primary mx-auto mt-10 flex">
                MEET THE TEAM
              </a>
            </Link>
          </section>
          <section className={clsx(paddingX, 'mt-[123px] md:mt-[152px]')}>
            <h2 data-aos="fade-up" className="heading-md text-center md:heading-lg">
              Our Experience
            </h2>
            <div data-aos="fade-up" className="mt-[59px]">
              <ExperenceLogos />
            </div>
          </section>
          <section className={clsx(paddingX, 'mt-[122px] md:mt-[168px]')}>
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
