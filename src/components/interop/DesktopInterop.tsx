import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import PlayCircleIcon from 'src/components/icons/PlayCircleIcon';
import Video from 'src/components/Video';
import Subscribe from 'src/components/Subscribe';
import ReactPlayer from 'react-player';
import CloseIcon from 'src/components/icons/CloseIcon';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Page from 'src/components/Page';
import { headerHeight } from 'src/components/Header';
import { paddingX } from 'src/utils';
import { Trans } from '@lingui/macro';

const video = {
  src: '/videos/interoperability/video.mp4',
  image: '/images/game-detail/metarush-bg.png',
  youtube: 'https://www.youtube.com/watch?v=YqgCESVWNNI'
};

const DesktopInterop: React.FC = () => {
  const [openVideo, setOpenVideo] = useState(false);

  gsap.registerPlugin(ScrollTrigger);
  const el = useRef(null);
  const elMorphing = useRef(null);

  useEffect(() => {
    if (openVideo) {
      document.querySelector('body')!.style.overflow = 'hidden';
      return () => {
        document.querySelector('body')!.style.overflow = 'unset';
      };
    }
  }, [openVideo]);

  useLayoutEffect(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: '.gsap-image-container',
        start: 'top top',
        endTrigger: '.gsap-text-how-work-container',
        end: 'bottom bottom',
        scrub: true,
        pin: true,
        pinSpacing: false
      }
    });

    const tl_img = gsap.timeline({
      scrollTrigger: {
        trigger: '.gsap-image',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
    tl_img.fromTo(
      '.gsap-image',
      {
        width: '100%'
      },
      {
        width: '50%'
      }
    );
  }, []);

  useLayoutEffect(() => {
    const targets = ['.gsap-text-how-work-1', '.gsap-text-how-work-2', '.gsap-text-how-work-3'];
    gsap.set('.gsap-img-2, .gsap-img-3', { opacity: 0 });

    targets.forEach((target, idx) => {
      gsap.set(target, { opacity: 0 });
      const tl_text_bottom = gsap.timeline({
        scrollTrigger: {
          trigger: target,
          start: 'top bottom-=200',
          end: 'center center',
          scrub: true,
          toggleActions: 'restart pause resume pause'
        }
      });

      tl_text_bottom.fromTo(
        target,
        {
          opacity: 0,
          ease: 'slow(0.7, 0.7, false)'
        },
        {
          opacity: 1,
          ease: 'slow(0.7, 0.7, false)'
        }
      );

      const tl_text_top = gsap.timeline({
        scrollTrigger: {
          trigger: target,
          start: 'top top',
          scrub: true
        }
      });

      tl_text_top.to(target, {
        opacity: 0
      });

      if (idx !== targets.length - 1) {
        tl_text_top.to(`.gsap-img-${idx + 2}`, {
          opacity: 1,
          duration: 0.3
        });
      }
    });
  }, []);

  useEffect(() => {
    const elementMorphing = gsap.utils.selector(elMorphing.current);

    const tl_elementMorphing = gsap.timeline({
      scrollTrigger: {
        trigger: elementMorphing('.elMorphing')[0],
        start: 'top bottom',
        end: 'bottom-=20 center+=250',
        scrub: 1
      }
    });

    tl_elementMorphing
      .from(elementMorphing('.elMorphing-text'), {
        opacity: 0,
        scale: 0.5
      })
      .to(
        elementMorphing('.elMorphing-img'),
        {
          x: 0
        },
        '>-0.5'
      );
  }, []);

  return (
    <Page headerClassName={openVideo ? '!fixed bg-dark' : ''}>
      <div
        style={{
          top: headerHeight,
          display: openVideo ? 'block' : 'none'
        }}
        className={clsx('fixed bottom-0 z-[20] w-full bg-black bg-opacity-50 pb-10 md:px-16')}>
        <ReactPlayer width="100%" height="100%" url={video.youtube} playing={openVideo} />
        <button className="absolute top-4 right-4 z-[1] flex h-[50px] w-[50px] items-center justify-center bg-brand-gold">
          <span className="w-[32px] text-white" onClick={() => setOpenVideo(false)}>
            <CloseIcon />
          </span>
        </button>
      </div>
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
            className="absolute left-0 z-[-1] h-[783px] w-full">
            <div className="relative h-full w-full ">
              <Image
                src="/images/interoperability/header-bg.png"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="mx-auto w-full max-w-content ">
            <h1 className="heading-lg mx-auto mt-[50px] max-w-[607px] text-center text-brand-white md:heading-massive md:mt-[180px]">
              <Trans>The world’s first Morphing NFTs™</Trans>
            </h1>
          </div>
          <div className="mx-auto mt-[111px] max-w-[630px]">
            <div className="group relative isolate">
              <div className=" transtion absolute inset-0 z-[-1] translate-x-[12px] translate-y-[-14px] bg-brand-gold duration-300 group-hover:translate-x-[16px] group-hover:translate-y-[-18px] group-hover:bg-brand-light-blue" />
              <div className="bg-brand-gold p-[11px]">
                <div className="relative">
                  <Video
                    isVisible={true}
                    options={{
                      sources: [
                        {
                          src: video.src
                        }
                      ],
                      aspectRatio: '16:9',
                      autoplay: true,
                      muted: true,
                      poster: video.image,
                      responsive: true,
                      controlBar: false,
                      loop: true
                    }}
                  />
                  {/* <button
                    onClick={() => setOpenVideo(true)}
                    className="absolute top-0 flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-50">
                    <span className="w-[122px] transition duration-300 group-hover:scale-[0.8] text-brand-gold group-hover:text-brand-light-blue">
                      <PlayCircleIcon />
                    </span>
                    <p className="uppercase text-[20px] font-extrabold mt-[28px] group-hover:text-brand-light-blue">
                      Play video
                    </p>
                  </button> */}
                  <a className="absolute top-0 flex h-full w-full cursor-not-allowed flex-col items-center justify-center bg-black bg-opacity-50">
                    <span className="w-[122px] text-brand-gold transition duration-300 group-hover:scale-[0.8] group-hover:text-brand-light-blue">
                      <PlayCircleIcon />
                    </span>
                    <p className="mt-[28px] text-[20px] font-extrabold uppercase group-hover:text-brand-light-blue">
                      <Trans>Trailer Coming Soon</Trans>
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[88px]')} ref={el}>
          <div className=" mx-auto max-w-content">
            <div className="gsap-image-container flex justify-end ">
              <div className="gsap-image relative grid h-screen w-full">
                <div className="2 3tems-center z-[1] flex justify-end [grid-area:1/1/-1/-1]">
                  <img
                    src="/images/interoperability/hat3.png"
                    alt=""
                    width={1268}
                    height={1306}
                    className="w-full object-contain"
                  />
                </div>
                <div className="gsap-img-2 z-[1] flex items-center justify-end [grid-area:1/1/-1/-1]">
                  <img
                    src="/images/interoperability/cowboy-cartoon.png"
                    alt=""
                    width={1268}
                    height={1306}
                    className="w-full object-contain"
                  />
                </div>
                <div className="gsap-img-3 z-[1] flex items-center justify-end [grid-area:1/1/-1/-1]">
                  <img
                    src="/images/interoperability/cowboy-human.png"
                    alt=""
                    width={1268}
                    height={1306}
                    className="w-full object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 items-center gap-[26px] overflow-hidden">
              <div className="">
                <div className="gsap-text-how-work-container pb-[250px]">
                  <div className="gsap-text-how-work-1 mx-auto mt-[500px] grid max-w-content items-center gap-[26px] md:gap-[99px]">
                    <div className="text-center md:order-[-1] md:text-left">
                      <p className="text-[14px] font-extrabold leading-[1.25] text-brand-light-blue md:text-[26px] md:font-bold">
                        <Trans>How it works</Trans>
                      </p>
                      <h2 className="heading-md mt-2 md:mt-[17px] md:text-[50px]">
                        <Trans>The new standard for interoperable NFTs</Trans>
                      </h2>
                      <p className="body-sm mt-6 text-light md:body md:mt-[17px]">
                        <Trans>At Myria, we believe NFTs should not only endow players with verifiable
                        ownership, but also allow players to take their NFTs from one game to
                        another.</Trans>
                      </p>
                    </div>
                  </div>

                  <div className="gsap-text-how-work-2 mx-auto mt-[300px] grid max-w-content items-center gap-[26px] md:gap-[99px]">
                    <div className="text-center md:order-[-1] md:text-left">
                      <p className="text-[14px] font-extrabold leading-[1.25] text-brand-light-blue md:text-[26px] md:font-bold">
                      <Trans>How it works</Trans>
                      </p>
                      <h2 className="heading-md mt-2 md:mt-[17px] md:text-[50px]">
                        <Trans>Own your metaverse identity. Anywhere. Any game.</Trans>
                      </h2>
                      <p className="body-sm mt-6 text-light md:body md:mt-[17px]">
                        <Trans>Your NFT is your digital identity. Take your NFT with you on your metaverse
                        explorations. Equip and level up in different games and worlds. Truly own
                        your metaverse identity with Myria.</Trans>
                      </p>
                    </div>
                  </div>

                  <div className="gsap-text-how-work-3 mx-auto mt-[300px] grid max-w-content items-center gap-[26px] md:gap-[99px]">
                    <div className="text-center md:order-[-1] md:text-left">
                      <p className="text-[14px] font-extrabold leading-[1.25] text-brand-light-blue md:text-[26px] md:font-bold">
                        <Trans>How it works</Trans>
                      </p>
                      <h2 className="heading-md mt-2 md:mt-[17px] md:text-[50px]">
                        <Trans>Morphing NFTs™ that adapt to your avatars</Trans>
                      </h2>
                      <p className="body-sm mt-6 text-light md:body md:mt-[17px]">
                        <Trans>No matter the shape and size of your avatar, use the same NFT on them all.
                        Buy once, use on any character. Designed to be interoperable.</Trans>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[100px]')} ref={elMorphing}>
          <div className="elMorphing flex flex-col-reverse items-center justify-center md:flex-row">
            <div className="elMorphing-img w-[334px] translate-x-[140%] overflow-hidden md:self-end">
              <div className="w-[600px] -translate-x-1/4">
                <Image
                  src="/images/interoperability/cowboy-cartoon-separate.png"
                  alt=""
                  width={597}
                  height={336}
                />
              </div>
            </div>
            <div className="elMorphing-text mt-[27px] mb-[40px] max-w-[607px] text-center">
              <h1 className="heading-lg text-brand-light-blue lg:heading-massive">
                <Trans>Morphing NFTs™</Trans>
              </h1>
              <p className="heading-massive font-bold lg:text-[70px]">
                <Trans>Own your metaverse identity</Trans>
              </p>
            </div>
            <div className="elMorphing-img w-[334px] -translate-x-[115%]">
              <Image
                src="/images/interoperability/cowboy-human-separate.png"
                alt=""
                width={334}
                height={612}
              />
            </div>
          </div>
        </section>
        <div className="mb-[107px] mt-[96px]">
          <Subscribe />
        </div>
      </div>
    </Page>
  );
};

export default DesktopInterop;
