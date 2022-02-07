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
import { useAnimation, motion } from 'framer-motion';
import Subscribe from 'src/components/Subscribe';
import 'aos/dist/aos.css';
import Video from 'src/components/Video';

const Index = () => {
  const img1Animation = useAnimation();
  const img2Animation = useAnimation();
  const img3Animation = useAnimation();
  const img4Animation = useAnimation();

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
          <motion.div
            onMouseMove={(e) => handleMouseMove(e)}
            style={{
              paddingTop: headerHeight,
              paddingBottom: headerHeight
            }}
            className={clsx(
              paddingX,
              'flex flex-col items-center md:justify-center min-h-[900px] overflow-hidden relative isolate md:min-h-[789px] '
            )}>
            <div className="md:hidden absolute left-0 w-full z-[-1]">
              <div className="relative w-full h-[815px] overflow-hidden">
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
              className="hidden md:block absolute left-0 w-full z-[-1] h-[697px]">
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

            <div className="max-w-[607px] text-center mt-[50px] md:mt-0">
              <h1
                data-aos="fade-up"
                data-aos-duration="1000"
                className="heading-lg md:heading-massive text-brand-white">
                Connecting the world through{' '}
                <span className=" text-brand-gold aos-text-slide-right [--animated-color:#F5B941]">
                  play
                </span>
              </h1>
              <h3
                data-aos="fade-up"
                data-aos-duration="2000"
                className="heading-sm-mobile md:heading-sm mt-6 md:mt-[32px]">
                <span className="text-white aos-text-slide-right ![animation-delay:0.5s] [--current-color:#97AAB5] [--animated-color:white]">
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
              {/* <a
                href="#our-games"
                className="md:hidden flex items-center justify-center mt-[237px] bg-[#96C5DF] w-[64px] h-[64px] rounded-full mx-auto bg-opacity-20">
                <span className="w-[40px]">
                  <ArrowDownIcon />
                </span>
              </a> */}
            </div>
          </motion.div>
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
            <div className="hidden md:block absolute h-full w-full md:w-[90%] top-0 right-0 z-[-1]">
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
                  A{' '}
                  <span className=" text-brand-light-blue aos-text-slide-right">
                    decentralized ecosystem
                  </span>{' '}
                  of blockchain games and worlds
                </h2>
                <p data-aos="fade-up" className="mt-[38px] body text-light">
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
              'mt-[100px] md:mt-0 md:min-h-[745px] flex items-center justify-center relative isolate',
              paddingX
            )}>
            <div className="max-w-content w-full mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-y-[53px] gap-x-[83px]">
              <div className="text-center md:text-left">
                <h2 data-aos="fade-up" className="heading-md md:heading-lg text-[#FFFDFD]">
                  <span className=" text-brand-light-blue aos-text-slide-right">Interoperable</span>{' '}
                  & Interconnected NFTs
                </h2>
                <p data-aos="fade-up" className="mt-6 body text-light">
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
              <div data-aos="fade-up" className="order-[-1] md:order-1">
                <div className="hidden md:block">
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
              'mt-[100px] md:mt-0 md:min-h-[629px] flex items-center justify-center relative isolate',
              paddingX
            )}>
            <div className="max-w-content w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-[53px] gap-x-[83px]">
              <div data-aos="fade-up">
                <div className="hidden md:block">
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
                  <h2 data-aos="fade-up" className="heading-md md:heading-lg text-[#FFFDFD]">
                    Powered and governed by{' '}
                    <span className=" text-brand-light-blue aos-text-slide-right">$MYRIA</span>
                  </h2>
                  <p data-aos="fade-up" className="mt-10 body text-light">
                    $MYRIA is the native governance and utility token that encapsulates the Myria
                    ecosystem. Players will be able to use $MYRIA to buy, trade, upgrade, vote and
                    more!
                  </p>
                  <button data-aos="fade-up" className="btn-lg btn-primary mt-[70px] mr-auto">
                    TOKEN SALE COMING SOON
                  </button>
                  <div className="hidden md:block absolute z-[-1] top-[-40px] right-0">
                    <Image src="/images/home/coins-bg.png" alt="" width={262} height={510} />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            className={clsx(
              'mt-[100px] py-4 min-h-[760px] items-end md:min-h-[849px] flex md:items-center justify-center relative isolate',
              paddingX
            )}>
            <div className="hidden md:block absolute h-full w-full md:w-[90%] top-0 right-0 z-[-1]">
              <Image src="/images/home/myriaverse.png" alt="" layout="fill" objectFit="cover" />
            </div>
            <div className="md:hidden absolute h-full w-full md:w-[90%] top-0 right-0 z-[-1]">
              <Image
                src="/images/home/myriaverse-mobile.png"
                alt=""
                layout="fill"
                objectFit="cover"
              />
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
            <div className="md:hidden [grid-area:1/1/-1/-1]">
              <Image src="/images/home/globe.png" width={856} height={1034} alt="" />
            </div>
            <div className="hidden md:flex [grid-area:1/1/-1/-1] pointer-events-none justify-end">
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
                  <div className="max-w-[616px] mt-6 text-light body-sm md:body">
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
            <div className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[32px]">
              <div className="relative isolate p-[32px] md:p-10 h-[470px] md:h-[540px] bg-brand-deep-blue rounded-[20px] overflow-hidden">
                <div className="absolute inset-0 z-[-1]">
                  <Image src="/images/home/for-gamers.png" alt="" layout="fill" objectFit="cover" />
                </div>
                <h2 data-aos="fade-up" className="heading-md md:heading-lg">
                  For Gamers
                </h2>
                <p
                  data-aos="fade-up"
                  className="mt-4 md:mt-6 body md:body max-w-[284px] text-light">
                  Discover the best games built on the blockchain
                </p>
                <Link href="/games">
                  <a data-aos="fade-up" className="mt-6 md:mt-10 btn-lg btn-primary">
                    Learn more
                  </a>
                </Link>
              </div>
              <div className="relative isolate p-[32px] md:p-10 h-[470px] md:h-[540px] bg-brand-deep-blue rounded-[20px] overflow-hidden">
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
                  className="mt-4 md:mt-6 body md:body max-w-[310px] text-light">
                  Myria helps studios join the blockchain revolution
                </p>
                <Link href="/for-studios">
                  <a data-aos="fade-up" className="mt-6 md:mt-10 btn-lg btn-light-blue">
                    Learn more
                  </a>
                </Link>
              </div>
            </div>
          </section>
          <section className={clsx(paddingX, 'mt-[168px] hidden md:flex flex-col')}>
            <h1 data-aos="fade-up" className="heading-massive max-w-[1024px] text-center mx-auto">
              Founded by leading gaming and blockchain industry veterans
            </h1>
            <p
              data-aos="fade-up"
              className="max-w-[717px] text-center mx-auto body-lg mt-[32px] text-light">
              Myria has been built by an all-star team of over 60+ people, united with a common
              vision of revolutionizing gaming with blockchain technology.{' '}
            </p>
            <Link href={'/about-us'}>
              <a data-aos="fade-up" className="flex mx-auto mt-10 btn-lg btn-primary">
                MEET THE TEAM
              </a>
            </Link>
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
