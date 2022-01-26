import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import PlayCircleIcon from 'src/components/icons/PlayCircleIcon';
import Socials from 'src/components/Social';
import Video from 'src/components/Video';
import { headerHeight } from '../components/Header';
import Page from '../components/Page';
import { paddingX } from '../utils';
import ReactPlayer from 'react-player';
import CloseIcon from 'src/components/icons/CloseIcon';

const video = {
  src: 'https://assets.contentstack.io/v3/assets/blt1d37b8e155757b13/blta62df75337fb6aa7/6166e691dd1cf90b821def45/Key_Feature_Video_1_1.mp4',
  image: '/images/game-detail/metarush-bg.png',
  youtube: 'https://www.youtube.com/watch?v=YqgCESVWNNI'
};

const Interoperability: React.FC = () => {
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
                  <button
                    onClick={() => setOpenVideo(true)}
                    className="absolute top-0 flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-50">
                    <span className="w-[122px] transition duration-300 group-hover:scale-[0.8] text-brand-gold group-hover:text-brand-light-blue">
                      <PlayCircleIcon />
                    </span>
                    <p className="uppercase text-[20px] font-extrabold mt-[28px] group-hover:text-brand-light-blue">
                      Play video
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[88px] ')}>
          <div className="grid items-center gap-[26px] md:gap-[99px] mx-auto md:grid-cols-2 max-w-content">
            <div>
              <Image
                src="/images/interoperability/hat.png"
                alt=""
                width={1757}
                height={1368}
                layout="responsive"
              />
            </div>
            <div className="text-center md:text-left md:order-[-1]">
              <p className="text-[14px] md:text-[26px] leading-[1.25] text-brand-light-blue font-extrabold md:font-bold">
                How it works
              </p>
              <h2 className="heading-md md:text-[50px] mt-2 md:mt-[17px]">
                The new standard for interoperable NFTs
              </h2>
              <p className="mt-6 md:mt-[17px] body-sm md:body text-light">
                At Myria, we believe NFTs should not only endow players with verifiable ownerships,
                but also allow players to take their NFTs from one game to another.
              </p>
            </div>
          </div>
        </section>
        <section className={clsx(paddingX, 'mt-[88px] ')}>
          <div className="flex flex-col-reverse items-center justify-center md:flex-row">
            <div className="md:self-end">
              <Image
                src="/images/interoperability/cowboy-cartoon-separate.png"
                alt=""
                width={454}
                height={790}
              />
            </div>
            <div className="max-w-[607px] text-center mt-[27px] mb-[40px]">
              <h1 className="heading-lg lg:heading-massive text-brand-light-blue">
                Morphing NFTs™
              </h1>
              <p className="heading-massive lg:text-[70px] font-bold">
                Own your metaverse identity
              </p>
            </div>
            <div>
              <Image
                src="/images/interoperability/cowboy-human-separate.png"
                alt=""
                width={648}
                height={1438}
              />
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
};

export default Interoperability;
