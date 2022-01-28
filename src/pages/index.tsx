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
import { useEffect } from 'react';
import 'aos/dist/aos.css';
import { useAnimation, motion } from 'framer-motion';
import Subscribe from 'src/components/Subscribe';

const Index = () => {
  const imgAnimation = useAnimation();

  const handleMouseMove = (e: any) => {
    const { clientX, clientY } = e;
    const moveX = clientX - window.innerWidth / 2;
    const moveY = clientY - window.innerHeight / 2;
    const offsetFactor = 35;
    imgAnimation.start({
      x: -moveX / offsetFactor,
      y: -moveY / offsetFactor
    });
  };

  useEffect(() => {
    AOS.init({
      duration: 1000
    });
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 text-center md:py-2 md:text-left md:flex-row bg-brand-light-blue">
        <p className="text-[14px] leading-[1.23] font-medium ">
          <span className="font-bold">$MYRIA</span> Token Sale and Node Sale coming soon!
        </p>
        <a
          href={socialLinks.discord}
          target="_blank"
          className="flex items-center mt-4 md:mt-0 md:ml-6 btn-icon-sm text-[12px] px-4 btn-white"
          rel="noreferrer">
          <span className="w-[16px]">
            <DiscordIcon />
          </span>
          <span className="ml-1">JOIN DISCORD</span>
        </a>
      </div>
      <Page action="join-discord">
        <div>
          <section
            style={{
              paddingTop: headerHeight,
              paddingBottom: headerHeight
            }}
            className={clsx(
              paddingX,
              'flex flex-col items-center justify-center min-h-[809px] relative isolate md:min-h-screen '
            )}>
            <motion.div
              animate={imgAnimation}
              onMouseMove={(e) => handleMouseMove(e)}
              style={{
                top: headerHeight
              }}
              className="absolute left-0 w-full z-[-1]">
              <div className="relative w-full h-[697px]" data-depth="0.2">
                <Image src="/images/home/header-bg.png" alt="" layout="fill" objectFit="contain" />
              </div>
            </motion.div>

            <motion.div
              className="max-w-[607px] text-center"
              onMouseMove={(e) => handleMouseMove(e)}>
              <h1
                data-aos="fade-up"
                data-aos-duration="1000"
                className="heading-lg md:heading-massive text-brand-white">
                Connecting the world through{' '}
                <span className="aos-text-slide-right [--animated-color:#F5B941]">play</span>
              </h1>
              <h3
                data-aos="fade-up"
                data-aos-duration="2000"
                className="heading-sm-mobile md:heading-sm mt-6 md:mt-[32px]">
                <span className="aos-text-slide-right ![animation-delay:0.5s] [--current-color:#97AAB5] [--animated-color:white]">
                  Myria is a blockchain gaming ecosystem powered by the Myria blockchain.
                </span>
              </h3>
              <a
                data-aos="fade-up"
                data-aos-duration="3000"
                href={socialLinks.discord}
                target="_blank"
                className="mt-[38px] btn-icon btn-primary inline-flex items-center mx-auto"
                rel="noreferrer">
                <span className="w-[30px]">
                  <DiscordIcon />
                </span>
                <span>JOIN DISCORD</span>
              </a>
              <a
                href="#our-games"
                className="md:hidden flex items-center justify-center mt-[237px] bg-[#96C5DF] w-[64px] h-[64px] rounded-full mx-auto bg-opacity-20">
                <span className="w-[40px]">
                  <ArrowDownIcon />
                </span>
              </a>
            </motion.div>
          </section>
          <section id="our-games" className={clsx('pt-[14px]', paddingX)}>
            <h2 data-aos="fade-up" className="text-center heading-md md:heading-lg">
              Our games
            </h2>
            <div className="mt-10 md:mt-[58px] max-w-content mx-auto">
              <OurGames />
            </div>
          </section>
          <section
            className={clsx(
              'overflow-hidden md:pt-[300px] pb-6 mt-[100px] md:mt-0 md:min-h-[944px] flex items-start justify-center relative isolate',
              paddingX
            )}>
            <div className="absolute h-full w-full md:w-[90%] top-0 right-0 z-[-1]">
              <Image
                src="/images/home/blockchain-bg.png"
                alt=""
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="max-w-content w-full mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-y-[53px] gap-x-[83px]">
              <div data-aos="fade-up">
                <Image
                  src="/images/home/character-circle.png"
                  alt=""
                  layout="responsive"
                  width={1260}
                  height={1306}
                />
              </div>
              <div className="text-center md:text-left">
                <h2 data-aos="fade-up" className="heading-md md:heading-lg text-[#FFFDFD]">
                  A <span className="aos-text-slide-right">decentralized ecosystem</span> of
                  blockchain games and worlds
                </h2>
                <p data-aos="fade-up" className="mt-[38px] body text-light">
                  Our range of free-to-play AAA games spans across an entire interconnected
                  ecosystem. Players experience intertwining lore, characters, and rich storylines
                  that carry across each game world, and Myria tokens and NFTs can be used across
                  the Myriaverse.
                </p>
                <Link href="/ecosystem">
                  <button data-aos="fade-up" className="btn-lg btn-primary mt-[38px]">
                    READ ABOUT OUR ECOSYSTEM
                  </button>
                </Link>
              </div>
            </div>
          </section>
          <section
            className={clsx(
              'mt-[100px] md:mt-0 md:min-h-[745px] flex items-center justify-center relative isolate',
              paddingX
            )}>
            <div className="max-w-content w-full mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-y-[53px] gap-x-[83px]">
              <div className="text-center md:text-left">
                <h2 data-aos="fade-up" className="heading-md md:heading-lg text-[#FFFDFD]">
                  <span className="aos-text-slide-right">Interoperable</span> & Interconnected NFTs
                </h2>
                <p data-aos="fade-up" className="mt-6 body text-light">
                  Morphing interoperable NFTs is the new standard created by Myria. Players will be
                  able to utilize their NFTs across different avatars, games and metaverses. Truly
                  own your digital assets and collectibles.
                </p>
                <Link href={'/interoperability'}>
                  <button data-aos="fade-up" className="btn-lg btn-primary mt-[45px]">
                    LEARN MORE
                  </button>
                </Link>
              </div>
              <div data-aos="fade-up" className="order-[-1] md:order-1">
                <Image
                  src="/images/home/cowboys.png"
                  alt=""
                  layout="responsive"
                  width={922}
                  height={1490}
                />
              </div>
            </div>
          </section>
          <section
            className={clsx(
              'mt-[100px] md:mt-0 md:min-h-[629px] flex items-center justify-center relative isolate',
              paddingX
            )}>
            <div className="max-w-content w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-[53px] gap-x-[83px]">
              <div data-aos="fade-up">
                <Image
                  src="/images/home/tacoguy.png"
                  alt=""
                  layout="responsive"
                  width={804}
                  height={1206}
                />
              </div>
              <div className="relative flex flex-col justify-center overflow-hidden text-center md:text-left">
                <div className="relative isolate ">
                  <h2 data-aos="fade-up" className="heading-md md:heading-lg text-[#FFFDFD]">
                    Powered and governed by <span className="aos-text-slide-right">$MYRIA</span>
                  </h2>
                  <p data-aos="fade-up" className="mt-10 body text-light">
                    $MYRIA is the native governance and utility token that encapsulates the Myria
                    ecosystem. Players will be able to use $MYRIA to buy, trade, upgrade, vote and
                    more!
                  </p>
                  <button data-aos="fade-up" className="btn-lg btn-primary mt-[70px] mr-auto">
                    TOKEN SALE COMING SOON
                  </button>
                  <div className="absolute z-[-1] top-[-40px] right-0">
                    <Image src="/images/home/coins-bg.png" alt="" width={262} height={510} />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            className={clsx(
              'mt-[100px] py-4 md:min-h-[849px] flex items-center justify-center relative isolate',
              paddingX
            )}>
            <div className="absolute h-full w-full md:w-[90%] top-0 right-0 z-[-1]">
              <Image src="/images/home/myriaverse.png" alt="" layout="fill" objectFit="cover" />
            </div>
            <div className="max-w-content w-full mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-y-[53px] gap-x-[83px]">
              <div className="text-center md:text-left">
                <h2 data-aos="fade-up" className="heading-md md:heading-lg text-[#FFFDFD]">
                  Unified through the Myriaverse
                </h2>
                <p data-aos="fade-up" className="mt-[51px] body text-light">
                  Myriaverse is the wider social metaverse connecting players, communities and
                  guilds. Players will be able to quest, explore, craft, invest and so much more.
                  The ever expanding Myriaverse is a virtual society and economy that offers
                  bountiful earning opportunities for the brave adventurer.
                </p>
                <button data-aos="fade-up" className="btn-lg btn-primary mt-[51px]">
                  More details coming soon
                </button>
              </div>
            </div>
          </section>
          <section
            className={clsx(
              'mt-[130px] md:mt-0 md:min-h-[790px] grid grid-cols-1 grid-rows-1 items-center justify-center py-10 relative isolate'
            )}>
            <video autoPlay muted loop className="h-full w-full [grid-area:1/1/-1/-1]">
              <source src="/images/home/video-bg.mp4" type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
            <div
              className={clsx(
                paddingX,
                '[grid-area:1/1/-1/-1] z-[1] flex items-center justify-center'
              )}>
              <div className="w-full text-center max-w-content md:text-left">
                <div>
                  <p data-aos="fade-up" className="caption text-brand-light-blue">
                    Grow with myria
                  </p>
                  <h2 data-aos="fade-up" className="mt-4 heading-md md:heading-lg">
                    Join the thriving Myria ecosystem{' '}
                  </h2>
                  <div className="max-w-[616px] mt-6 text-light body-sm md:body-lg">
                    <p data-aos="fade-up" className="">
                      Get the latest updates on our games, token and NFT releases, play-to-earn
                      mechanics, and have the opportunity to access alpha gameplay.
                    </p>
                    <p data-aos="fade-up" className="mt-6">
                      Operate a Myria node from your home computer and earn rewards for your
                      contribution to the network.
                    </p>
                  </div>
                  <div className="justify-center md:justify-start flex items-center mt-[60px]">
                    <a
                      data-aos="fade-up"
                      className="flex items-center btn-icon btn-white"
                      href={socialLinks.discord}
                      target="_blank"
                      rel="noreferrer">
                      <span className="w-[30px]">
                        <DiscordIcon />
                      </span>
                      <span>JOIN DISCORD</span>
                    </a>
                    <Link href="/nodes">
                    <button data-aos="fade-up" className="btn-lg btn-primary ml-4 md:ml-[31px]">
                      RUN A NODE
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={clsx(paddingX, 'mt-[152px] md:mt-[128px]')}>
            <div className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[32px]">
              <div className="relative isolate p-[32px] md:p-10 h-[470px] md:h-[540px] bg-brand-deep-blue rounded-[20px]">
                <div className="absolute inset-0 z-[-1]">
                  <Image src="/images/home/for-gamers.png" alt="" layout="fill" objectFit="cover" />
                </div>
                <h2 data-aos="fade-up" className="heading-md md:heading-lg">
                  For Gamers
                </h2>
                <p
                  data-aos="fade-up"
                  className="mt-4 md:mt-6 body md:body-lg max-w-[284px] text-light">
                  Discover the best games built on the blockchain
                </p>
                <Link href="/games">
                  <a data-aos="fade-up" className="mt-6 md:mt-10 btn-lg btn-primary">
                    Learn more
                  </a>
                </Link>
              </div>
              <div className="relative isolate p-[32px] md:p-10 h-[470px] md:h-[540px] bg-brand-deep-blue rounded-[20px]">
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
                  className="mt-4 md:mt-6 body md:body-lg max-w-[310px] text-light">
                  Myria helps studios join the blockchain revolution
                </p>
                <Link href="/for-studios">
                  <a data-aos="fade-up" className="mt-6 md:mt-10 btn-lg btn-primary">
                    Learn more
                  </a>
                </Link>
              </div>
            </div>
          </section>
          <section className={clsx(paddingX, 'mt-[168px] hidden md:block')}>
            <h1 data-aos="fade-up" className="heading-massive max-w-[1024px] text-center mx-auto">
              Founded by leading gaming and blockchain industry veterans
            </h1>
            <p
              data-aos="fade-up"
              className="max-w-[717px] text-center mx-auto body-lg mt-[32px] text-light">
              Myria has been built by an all-star team of over 100 people, united with a common
              vision of revolutionizing gaming with blockchain technology.{' '}
            </p>
            <button data-aos="fade-up" className="flex mx-auto mt-10 btn-lg btn-primary">
              MEET THE TEAM
            </button>
          </section>
          <section className={clsx(paddingX, 'mt-[123px] md:mt-[152px]')}>
            <h2 data-aos="fade-up" className="text-center heading-md md:heading-lg">
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
