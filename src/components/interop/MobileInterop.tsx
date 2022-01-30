import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import PlayCircleIcon from 'src/components/icons/PlayCircleIcon';
import Video from 'src/components/Video';
import { headerHeight } from '../Header';
import Page from '../Page';
import { paddingX } from '../../utils';
import ReactPlayer from 'react-player';
import CloseIcon from 'src/components/icons/CloseIcon';

const video = {
  src: '/videos/interoperability/video.mp4',
  image: '/images/interoperability/video-poster.png',
  youtube: 'https://www.youtube.com/watch?v=YqgCESVWNNI'
};

const MobileInterop: React.FC = () => {
  const [openVideo, setOpenVideo] = useState(false);

  useEffect(() => {
    if (openVideo) {
      document.querySelector('body')!.style.overflow = 'hidden';
      return () => {
        document.querySelector('body')!.style.overflow = 'unset';
      };
    }
  }, [openVideo]);
  return (
    <Page headerClassName={openVideo ? '!fixed bg-dark' : ''}>
      <div
        style={{
          top: headerHeight,
          display: openVideo ? 'block' : 'none'
        }}
        className={clsx('fixed z-[20] bottom-0 w-full bg-black bg-opacity-50 pb-10')}>
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
            paddingTop: headerHeight
          }}
          className={clsx(paddingX, 'relative isolate ')}>
          <div className="absolute left-0 h-[650px] w-full z-[-1]">
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
            <h1 className="heading-lg text-brand-white mt-[150px] max-w-[607px] mx-auto text-center">
              The world’s first Morphing NFTs™
            </h1>
          </div>
          <div className="max-w-[630px] mx-auto mt-[111px]">
            <div className="relative isolate group">
              <div className=" bg-brand-gold group-hover:bg-brand-light-blue absolute inset-0 z-[-1] transtion duration-300 translate-x-[5px] group-hover:translate-x-[7px] group-hover:translate-y-[-8px] translate-y-[-6px]" />
              <div className="p-[11px] bg-brand-gold">
                <div className="relative">
                  <Video
                    isVisible={false}
                    options={{
                      sources: [
                        {
                          src: video.src
                        }
                      ],
                      aspectRatio: '16:9',
                      autoplay: false,
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
                    <div className="flex flex-col items-center translate-y-[20px]">
                      <span className="w-[73px] transition duration-300 group-hover:scale-[0.8] text-brand-gold group-hover:text-brand-light-blue">
                        <PlayCircleIcon />
                      </span>
                      <p className="uppercase text-[20px] font-extrabold mt-[15px] group-hover:text-brand-light-blue">
                        Trailer Coming Soon
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[88px] ')}>
          <div className="grid items-center gap-[26px] mx-auto max-w-content">
            <div className="w-[300px] mx-auto">
              <Image
                src="/images/interoperability/hat2.png"
                alt=""
                width={634}
                height={648}
                layout="responsive"
              />
            </div>
            <div className="text-center">
              <p className="uppercase text-[14px] leading-[1.25] text-brand-light-blue font-extrabold">
                How it works
              </p>
              <h2 className="mt-2 heading-md">The new standard for interoperable NFTs</h2>
              <p className="mt-6 body-sm text-light">
                At Myria, we believe NFTs should not only endow players with verifiable ownership,
                but also allow players to take their NFTs from one game to another.
              </p>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[88px] ')}>
          <div className="grid items-center gap-[26px] mx-auto max-w-content">
            <div className="w-[300px] mx-auto">
              <Image
                src="/images/interoperability/cowboy-human.png"
                alt=""
                width={1268}
                height={1306}
                layout="responsive"
              />
            </div>
            <div className="text-center">
              <p className="uppercase text-[14px] leading-[1.25] text-brand-light-blue font-extrabold">
                How it works
              </p>
              <h2 className="mt-2 heading-md">Own your metaverse identity. Anywhere. Any game.</h2>
              <p className="mt-6 body-sm text-light">
                Your NFT is your digital identity. Take your NFT with you on your metaverse
                explorations. Equip and level up in different games and worlds. Truly own your
                metaverse identity with Myria.
              </p>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[88px] ')}>
          <div className="grid items-center gap-[26px] mx-auto max-w-content">
            <div className="w-[300px] mx-auto">
              <Image
                src="/images/interoperability/cowboy-cartoon.png"
                alt=""
                width={1268}
                height={1306}
                layout="responsive"
              />
            </div>
            <div className="text-center">
              <p className="uppercase text-[14px] leading-[1.25] text-brand-light-blue font-extrabold">
                How it works
              </p>
              <h2 className="mt-2 heading-md">Morphing NFTs™ that adapt to your avatars</h2>
              <p className="mt-6 body-sm text-light">
                No matter the shape and size of your avatar, use the same NFT on them all. Buy once,
                use on any character. Designed to be interoperable.
              </p>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[64px] mb-[66px]')}>
          <div className="grid items-center mx-auto max-w-content">
            <div className="w-[200px] mx-auto">
              <Image
                src="/images/interoperability/2character.png"
                alt=""
                width={698}
                height={1148}
                layout="responsive"
              />
            </div>
            <div className="max-w-[607px] text-center mt-[57px]">
              <h1 className="heading-lg text-brand-light-blue">Morphing NFTs™</h1>
              <p className="font-bold heading-lg mt-[31px]">Own your metaverse identity</p>
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
};

export default MobileInterop;
