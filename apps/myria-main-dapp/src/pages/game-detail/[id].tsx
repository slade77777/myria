import clsx from 'clsx';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useGA4 } from 'src/lib/ga';
import { headerHeight } from '../../components/Header';
import DiscordIcon from '../../components/icons/DiscordIcon';
import TwitterIcon from 'src/components/icons/TwitterIcon';
import Page from '../../components/Page';
import { paddingX } from '../../utils';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FirstSlider from '../../components/game-detail/FirstSlider';
import SecondSlider from '../../components/game-detail/SecondSlider';
import { useRouter } from 'next/router';
import Subscribe from 'src/components/Subscribe';
import { Trans } from '@lingui/macro';
import useGamesData from '../../hooks/useGamesData';
import PlayButton from '../../components/game-detail/PlayButton';
import dataJson from 'src/components/games/data-json';

export type Asset = {
  type: 'video' | 'image';
  src: string;
  image?: string;
};

const GameDetail: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const { event } = useGA4();
  const { id } = router.query;
  const games = useGamesData();

  if (typeof id !== 'string') {
    return null;
  }

  const game = games[id];
  const { title, assets, logo, logoMobile, content, info, image, description, headerBg, gameUrl } =
    game;

  console.log('debug: game', game);

  return (
    <Page stickyHeader={false}>
      <div>
        <section
          style={{
            paddingTop: headerHeight
          }}
          className={clsx(paddingX, 'relative isolate mb-[120px] md:min-h-screen ')}>
          {headerBg && !game.isPartner && (
            <div className="absolute left-0 z-[-1] h-[809px] w-full">
              <div className="relative h-full w-full ">
                <Image src={headerBg} alt="" layout="fill" objectFit="cover" />
              </div>
            </div>
          )}
          <div className="max-w-content mx-auto mt-10 w-full">
            <h3 className="heading-lg text-center font-extrabold md:text-left">{title}</h3>
            <div className="mt-[32px] flex flex-col lg:flex-row lg:items-start">
              <div className="lg:w-[calc((100%-32px)*0.675)]">
                {!game.isPartner && (
                  <div>
                    <FirstSlider
                      currentSlide={currentSlide}
                      setCurrentSlide={setCurrentSlide}
                      assets={assets}
                    />
                  </div>
                )}
                {!game.isPartner && (
                  <div className="mt-6">
                    <SecondSlider
                      currentSlide={currentSlide}
                      setCurrentSlide={setCurrentSlide}
                      assets={assets}
                    />
                  </div>
                )}
                <div className="">
                  <p className="body-lg mt-[70px]">{description}</p>
                  {image && (
                    <div className="mt-[84px] flex overflow-hidden rounded-[5px]">
                      <Image src={image.src} alt="" width={image.width} height={image.height} />
                    </div>
                  )}
                  {content.map((item, idx) => (
                    <div key={idx} className="mt-[48px] space-y-3">
                      <h4 className="heading-sm">{item.heading}</h4>
                      {item.paragraph?.map((p, idx) => {
                        if (typeof p === 'string') {
                          return (
                            <p
                              dangerouslySetInnerHTML={{ __html: p }}
                              className="body text-light mt-1"
                              key={idx}
                            />
                          );
                        }

                        return p;
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className="top-5 order-[-1] mb-6 lg:sticky lg:order-1 lg:mb-0 lg:ml-[32px] lg:w-[calc((100%-32px)*0.325)]">
                <div className="lg:hidden">
                  <img src={logoMobile} className="w-full" alt="" />
                </div>
                <div className="hidden justify-center px-[30px] lg:flex">
                  <img src={logo} alt="" />
                </div>

                <div className="bg-brand-deep-blue mt-[32px] flex flex-col rounded-[20px] p-[32px]">
                  <div className="grid gap-6">
                    {info.map((item, idx) => (
                      <div className="flex items-center justify-between" key={idx}>
                        <p className="body-sm">{item.label}</p>
                        <div className="caption text-brand-light-blue rounded-[8px] bg-[#0F2F45] py-[7px] px-[12px] font-bold">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="order-[-1] mb-6 md:order-1 md:mb-0 md:mt-[48px] ">
                    {/* <PlayButton gameUrl={gameUrl} /> */}
                    {game.twitter && (
                      <a
                        href={game.twitter}
                        target="_blank"
                        className="btn-icon mt-6 flex w-full items-center justify-center bg-[#1DA1F2]"
                        rel="noreferrer"
                        onClick={() => {
                          event('Discord Button Clicked', {
                            button_location: 'Game',
                            game_name: game.title
                          });
                        }}>
                        <span className="w-[30px]">
                          <TwitterIcon />
                        </span>
                        <span className="ml-2 text-base font-bold leading-5">
                          <Trans>TWITTER</Trans>
                        </span>
                      </a>
                    )}
                    {game.discord && (
                      <a
                        href={game.discord}
                        target="_blank"
                        className="btn-icon mt-6 flex w-full items-center justify-center bg-[#5B66F5]"
                        rel="noreferrer"
                        onClick={() => {
                          event('Discord Button Clicked', {
                            button_location: 'Game',
                            game_name: game.title
                          });
                        }}>
                        <span className="w-[30px]">
                          <DiscordIcon />
                        </span>
                        <span className="ml-2 text-base font-bold leading-5">
                          <Trans>JOIN DISCORD</Trans>
                        </span>
                      </a>
                    )}
                  </div>
                </div>
                {game.isPartner && (
                  <div className="bg-brand-deep-blue mt-[32px] flex flex-col rounded-[20px] p-[32px]">
                    <div className="text-brand-light-blue">
                      The information is provided by the owner of the associated project and not
                      affiliated with Myria. Conduct your own research with projects listed on this
                      directory.
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-10">
              <Subscribe />
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
};

export async function getStaticPaths() {
  const listIdGame = Object.keys(dataJson).map((item) => {
    return { params: { id: item } };
  });
  return {
    paths: [
      { params: { id: 'metarush' } },
      { params: { id: 'metakart' } },
      { params: { id: 'block-royale' } },
      { params: { id: 'starstrike' } },
      { params: { id: 'moonville-farms' } },
      ...listIdGame
    ],
    fallback: false
  };
}

export async function getStaticProps() {
  return {
    props: {}
  };
}

export default GameDetail;
