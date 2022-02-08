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
        className={clsx('fixed bottom-0 z-[20] w-full bg-black bg-opacity-50 pb-10')}>
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
            paddingTop: headerHeight
          }}
          className={clsx(paddingX, 'relative isolate ')}>
          <div className="absolute left-0 z-[-1] h-[650px] w-full">
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
            <h1 className="heading-lg mx-auto mt-[150px] max-w-[607px] text-center text-brand-white">
              The world’s first Morphing NFTs™
            </h1>
          </div>
          <div className="mx-auto mt-[111px] max-w-[630px]">
            <div className="group relative isolate">
              <div className=" transtion absolute inset-0 z-[-1] translate-x-[5px] translate-y-[-6px] bg-brand-gold duration-300 group-hover:translate-x-[7px] group-hover:translate-y-[-8px] group-hover:bg-brand-light-blue" />
              <div className="bg-brand-gold p-[11px]">
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
                  <a className="absolute top-0 flex h-full w-full cursor-not-allowed flex-col items-center justify-center bg-black bg-opacity-50">
                    <div className="flex translate-y-[20px] flex-col items-center">
                      <span className="w-[73px] text-brand-gold transition duration-300 group-hover:scale-[0.8] group-hover:text-brand-light-blue">
                        <PlayCircleIcon />
                      </span>
                      <p className="mt-[15px] text-[20px] font-extrabold uppercase group-hover:text-brand-light-blue">
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
          <div className="mx-auto grid max-w-content items-center gap-[26px]">
            <div className="mx-auto w-[300px]">
              <Image
                src="/images/interoperability/hat3.png"
                alt=""
                width={1268}
                height={1306}
                layout="responsive"
              />
            </div>
            <div className="text-center">
              <p className="text-[14px] font-extrabold uppercase leading-[1.25] text-brand-light-blue">
                How it works
              </p>
              <h2 className="heading-md mt-2">The new standard for interoperable NFTs</h2>
              <p className="body-sm mt-6 text-light">
                At Myria, we believe NFTs should not only endow players with verifiable ownership,
                but also allow players to take their NFTs from one game to another.
              </p>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[88px] ')}>
          <div className="mx-auto grid max-w-content items-center gap-[26px]">
            <div className="mx-auto w-[300px]">
              <Image
                src="/images/interoperability/cowboy-human.png"
                alt=""
                width={1268}
                height={1306}
                layout="responsive"
              />
            </div>
            <div className="text-center">
              <p className="text-[14px] font-extrabold uppercase leading-[1.25] text-brand-light-blue">
                How it works
              </p>
              <h2 className="heading-md mt-2">Own your metaverse identity. Anywhere. Any game.</h2>
              <p className="body-sm mt-6 text-light">
                Your NFT is your digital identity. Take your NFT with you on your metaverse
                explorations. Equip and level up in different games and worlds. Truly own your
                metaverse identity with Myria.
              </p>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[88px] ')}>
          <div className="mx-auto grid max-w-content items-center gap-[26px]">
            <div className="mx-auto w-[300px]">
              <Image
                src="/images/interoperability/cowboy-cartoon.png"
                alt=""
                width={1268}
                height={1306}
                layout="responsive"
              />
            </div>
            <div className="text-center">
              <p className="text-[14px] font-extrabold uppercase leading-[1.25] text-brand-light-blue">
                How it works
              </p>
              <h2 className="heading-md mt-2">Morphing NFTs™ that adapt to your avatars</h2>
              <p className="body-sm mt-6 text-light">
                No matter the shape and size of your avatar, use the same NFT on them all. Buy once,
                use on any character. Designed to be interoperable.
              </p>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[64px] mb-[66px]')}>
          <div className="mx-auto grid max-w-content items-center">
            <div className="mx-auto w-[200px]">
              <Image
                src="/images/interoperability/2character.png"
                alt=""
                width={698}
                height={1148}
                layout="responsive"
              />
            </div>
            <div className="mt-[57px] max-w-[607px] text-center">
              <h1 className="heading-lg text-brand-light-blue">Morphing NFTs™</h1>
              <p className="heading-lg mt-[31px] font-bold">Own your metaverse identity</p>
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
};

export default MobileInterop;
