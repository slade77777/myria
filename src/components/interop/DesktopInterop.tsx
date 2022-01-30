import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import PlayCircleIcon from 'src/components/icons/PlayCircleIcon';
import Video from 'src/components/Video';
import Subscribe from 'src/components/Subscribe';
import { headerHeight } from '../Header';
import Page from '../Page';
import { paddingX } from '../../utils';
import ReactPlayer from 'react-player';
import CloseIcon from 'src/components/icons/CloseIcon';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

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

  useEffect(() => {
    let element = gsap.utils.selector(el.current);

    const tl_howWork_text_top = gsap.timeline({
      scrollTrigger: {
        trigger: element('.gsap-total-how-word')[0],
        start: 'top+=300 bottom-=200',
        end: 'top+=600 top+=200',
        scrub: 1
      }
    });

    tl_howWork_text_top
      .fromTo(
        element('.gsap-text-how-work-1'),
        {
          opacity: 0,
          y: 400
        },
        {
          opacity: 1,
          y: 200
        }
      )
      .to(element('.gsap-text-how-work-1'), {
        opacity: 0,
        y: -200
      })
      .to(
        element('.gsap-img-hat'),
        {
          opacity: 0,
          y: -200
        },
        '>-0.5'
      );

    const tl_howWork_text_center = gsap.timeline({
      scrollTrigger: {
        trigger: element('.gsap-total-how-word')[0],
        start: 'top+=630 bottom-=200',
        end: 'top+=900 top+=200',
        scrub: 1
      }
    });

    tl_howWork_text_center
      .fromTo(
        element('.gsap-text-how-work-2'),
        {
          opacity: 0,
          y: 250
        },
        {
          opacity: 1,
          y: 0
        }
      )
      .from(
        element('.gsap-img-human'),
        {
          opacity: 0,
          y: 200
        },
        '>-0.5'
      )
      .to(element('.gsap-text-how-work-2'), {
        opacity: 0,
        y: -200
      })
      .to(
        element('.gsap-img-human'),
        {
          opacity: 0,
          y: -200
        },
        '>-0.5'
      );

    const tl_howWork_text_bottom = gsap.timeline({
      scrollTrigger: {
        trigger: element('.gsap-total-how-word')[0],
        start: 'top+=1100 bottom-=200',
        end: 'top+=1200 center',
        scrub: 1
      }
    });

    tl_howWork_text_bottom
      .fromTo(
        element('.gsap-text-how-work-3'),
        {
          opacity: 0,
          y: 0
        },
        {
          opacity: 1,
          y: -300
        }
      )
      .from(
        element('.gsap-img-cartoon'),
        {
          opacity: 0,
          y: 200
        },
        '>-0.5'
      );

    const tl_animation_image = gsap.timeline({
      scrollTrigger: {
        trigger: element('.gsap-total-how-word')[0],
        start: 'center-=100 bottom',
        end: 'center center',
        scrub: 1
      }
    });

    tl_animation_image.fromTo(
      element('.gsap-image-how-work-item'),
      {
        scale: 2.5,
        x: '-80%',
        y: '20%'
      },
      {
        scale: 1,
        x: 0,
        y: '0%'
      }
    );

    gsap.timeline({
      scrollTrigger: {
        trigger: element('.gsap-wrap-image-how-work')[0],
        start: 'center+=350 center+=200',
        end: '+=1143',
        pin: true,
        scrub: 1
      }
    });
    gsap.timeline({
      scrollTrigger: {
        trigger: element('.gsap-wrap-text-how-work')[0],
        start: 'center+=200 bottom-=200',
        end: '+=1000',
        pin: true,
        scrub: 1
      }
    });
  }, []);

  useEffect(() => {
    const elementMorphing = gsap.utils.selector(elMorphing.current);

    const tl_elementMorphing = gsap.timeline({
      scrollTrigger: {
        trigger: elementMorphing('.elMorphing')[0],
        start: 'top+=200 bottom',
        end: 'center center+=100',
        scrub: 1
        // markers: true
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
        className={clsx('fixed z-[20] bottom-0 w-full bg-black bg-opacity-50 md:px-16 pb-10')}>
        <ReactPlayer width="100%" height="100%" url={video.youtube} playing={openVideo} />
        <button className="flex absolute z-[1] top-4 right-4 w-[50px] h-[50px] items-center justify-center bg-brand-gold">
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
            className="absolute left-0 h-[783px] w-full z-[-1]">
            <div className="relative w-full h-full ">
              <Image
                src="/images/interoperability/header-bg.png"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="w-full mx-auto max-w-content ">
            <h1 className="heading-lg md:heading-massive text-brand-white mt-[50px] md:mt-[180px] max-w-[607px] mx-auto text-center">
              The world’s first Morphing NFTs™
            </h1>
          </div>
          <div className="max-w-[630px] mx-auto mt-[111px]">
            <div className="relative isolate group">
              <div className=" bg-brand-gold group-hover:bg-brand-light-blue absolute inset-0 z-[-1] transtion duration-300 translate-x-[12px] group-hover:translate-x-[16px] group-hover:translate-y-[-18px] translate-y-[-14px]" />
              <div className="p-[11px] bg-brand-gold">
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
                  <a className="absolute top-0 flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-50 cursor-not-allowed">
                    <span className="w-[122px] transition duration-300 group-hover:scale-[0.8] text-brand-gold group-hover:text-brand-light-blue">
                      <PlayCircleIcon />
                    </span>
                    <p className="uppercase text-[20px] font-extrabold mt-[28px] group-hover:text-brand-light-blue">
                      Trailer Coming Soon
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'xl:px-[196px] mt-[88px]')} ref={el}>
          <div className="gsap-total-how-word flex gap-[26px]">
            <div className="min-w-[500px]">
              <div className="gsap-wrap-text-how-work">
                <div className="grid items-center gap-[26px] md:gap-[99px] mx-auto max-w-content">
                  <div className="text-center md:text-left md:order-[-1] gsap-text-how-work-1">
                    <p className="text-[14px] md:text-[26px] leading-[1.25] text-brand-light-blue font-extrabold md:font-bold">
                      How it works
                    </p>
                    <h2 className="heading-md md:text-[50px] mt-2 md:mt-[17px]">
                      The new standard for interoperable NFTs
                    </h2>
                    <p className="mt-6 md:mt-[17px] body-sm md:body text-light">
                      At Myria, we believe NFTs should not only endow players with verifiable
                      ownership, but also allow players to take their NFTs from one game to another.
                    </p>
                  </div>
                </div>

                <div className="grid items-center gap-[26px] md:gap-[99px] mx-auto max-w-content">
                  <div className="text-center md:text-left md:order-[-1] gsap-text-how-work-2">
                    <p className="text-[14px] md:text-[26px] leading-[1.25] text-brand-light-blue font-extrabold md:font-bold">
                      How it works
                    </p>
                    <h2 className="heading-md md:text-[50px] mt-2 md:mt-[17px]">
                      Own your metaverse identity. Anywhere. Any game.
                    </h2>
                    <p className="mt-6 md:mt-[17px] body-sm md:body text-light">
                      Your NFT is your digital identity. Take your NFT with you on your metaverse
                      explorations. Equip and level up in different games and worlds. Truly own your
                      metaverse identity with Myria.
                    </p>
                  </div>
                </div>

                <div className="grid items-center gap-[26px] md:gap-[99px] mx-auto max-w-content">
                  <div className="text-center md:text-left md:order-[-1] gsap-text-how-work-3">
                    <p className="text-[14px] md:text-[26px] leading-[1.25] text-brand-light-blue font-extrabold md:font-bold">
                      How it works
                    </p>
                    <h2 className="heading-md md:text-[50px] mt-2 md:mt-[17px]">
                      Morphing NFTs™ that adapt to your avatars
                    </h2>
                    <p className="mt-6 md:mt-[17px] body-sm md:body text-light">
                      No matter the shape and size of your avatar, use the same NFT on them all. Buy
                      once, use on any character. Designed to be interoperable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-w-[500px]">
              <div className="gsap-wrap-image-how-work">
                <div className="w-full gsap-image-how-work-item image-content">
                  <div className="relative w-full h-full min-h-[200px]">
                    <div className="absolute top-0 w-full">
                      <Image
                        src="/images/interoperability/Vortex@2x.png"
                        alt=""
                        width={1757}
                        height={1757}
                        layout="responsive"
                      />
                    </div>
                    <div className="absolute top-0 w-full gsap-img-hat">
                      <Image
                        src="/images/interoperability/Hat@2x.png"
                        alt=""
                        width={1757}
                        height={1757}
                        layout="responsive"
                        className="absolute top-0 object-contain w-full scale-75"
                      />
                    </div>
                    <div className="absolute top-0 w-full gsap-img-human">
                      <Image
                        src="/images/interoperability/Cowboy Human@2x.png"
                        alt=""
                        width={1757}
                        height={1757}
                        layout="responsive"
                        className="absolute top-0 w-full scale-90 object-contain rounded-[50%]"
                      />
                    </div>
                    <div className="absolute top-0 w-full gsap-img-cartoon">
                      <Image
                        src="/images/interoperability/Cowboy Cartoon@2x.png"
                        alt=""
                        width={1757}
                        height={1757}
                        layout="responsive"
                        className="absolute top-0 object-contain w-full scale-90"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, '-translate-y-[10%]')} ref={elMorphing}>
          <div className="flex flex-col-reverse items-center justify-center md:flex-row elMorphing">
            <div className="md:self-end translate-x-[140%] elMorphing-img">
              <Image
                src="/images/interoperability/cowboy-cartoon-separate.png"
                alt=""
                width={597}
                height={336}
              />
            </div>
            <div className="max-w-[607px] text-center mt-[27px] mb-[40px] elMorphing-text">
              <h1 className="heading-lg lg:heading-massive text-brand-light-blue">
                Morphing NFTs™
              </h1>
              <p className="heading-massive lg:text-[70px] font-bold">
                Own your metaverse identity
              </p>
            </div>
            <div className="-translate-x-[115%] elMorphing-img">
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
