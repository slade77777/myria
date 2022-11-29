import clsx from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';
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
import PlayButton from '../../components/game-detail/PlayButton';
import dataJson from 'src/components/games/data-json';
import { useDetailGames } from 'src/hooks/useDetailGames';
import ReactMarkdown from 'react-markdown';

export type Asset = {
  type: 'video' | 'image';
  src: string;
  image?: string;
};

const components = (header: boolean) => {
  return {
    ol: ({ ...props }) => {
      return (
        <ol {...props} className="body text-light mt-6 list-inside list-decimal space-y-2"></ol>
      );
    },
    ul: ({ ...props }) => {
      return <ul {...props} className="body text-light mt-6 list-inside list-disc space-y-2"></ul>;
    },
    h4: (
      props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
    ) => {
      return <h4 {...props} className="heading-sm mt-[48px]"></h4>;
    },
    p: (
      props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
    ) => {
      if (header) {
        return <p {...props} className="body-lg mt-[70px]"></p>;
      } else return <p {...props} className="body text-light mt-3"></p>;
    }
  };
};

const labelStatus = {
  developer: 'Developer',
  platform: 'Platform',
  genre: 'Genre',
  status: 'Status'
};

const GameDetail: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const { event } = useGA4();
  const { id } = router.query;
  const { data } = useDetailGames(id?.toString() || '');

  if (typeof id !== 'string') {
    return null;
  }

  if (data) {
    const { game_name, content, content_title, header_background, game_url } = data;
    const info = [
      {
        label: labelStatus.developer,
        value: data.developer || ''
      },
      {
        label: labelStatus.platform,
        value: data.platform || ''
      },
      {
        label: labelStatus.genre,
        value: data.genre?.data.toString() || ''
      },
      {
        label: labelStatus.status,
        value: data.status
      }
    ];

    return (
      <Page stickyHeader={false}>
        <div>
          <section
            style={{
              paddingTop: headerHeight
            }}
            className={clsx(paddingX, 'relative isolate mb-[120px] md:min-h-screen ')}>
            {header_background.data && (
              // {headerBg && !data.isPartner && (
              <div className="absolute left-0 z-[-1] h-[809px] w-full">
                <div className="relative h-full w-full ">
                  <Image
                    src={header_background.data.attributes.formats.large.url}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            )}
            <div className="max-w-content mx-auto mt-10 w-full">
              <h3 className="heading-lg text-center font-extrabold md:text-left">{game_name}</h3>
              <div className="mt-[32px] flex flex-col lg:flex-row lg:items-start">
                <div className="lg:w-[calc((100%-32px)*0.675)]">
                  {data.media_carousel.data && (
                    <div>
                      <FirstSlider
                        currentSlide={currentSlide}
                        setCurrentSlide={setCurrentSlide}
                        assets={data.media_carousel.data}
                      />
                    </div>
                  )}
                  {data.media_carousel.data && (
                    <div className="mt-6">
                      <SecondSlider
                        currentSlide={currentSlide}
                        setCurrentSlide={setCurrentSlide}
                        assets={data.media_carousel.data}
                        assetsThumbnail={data.thumbnail_media_carousel.data}
                      />
                    </div>
                  )}
                  <div className="">
                    <ReactMarkdown components={components(true)}>
                      {content_title || ''}
                    </ReactMarkdown>
                    <ReactMarkdown components={components(false)}>{content || ''}</ReactMarkdown>
                  </div>
                </div>

                <div className="top-5 order-[-1] mb-6 lg:sticky lg:order-1 lg:mb-0 lg:ml-[32px] lg:w-[calc((100%-32px)*0.325)]">
                  <div className="lg:hidden">
                    {data.logo_mobile.data && (
                      <img
                        src={
                          process.env.NEXT_PUBLIC_URL_GAME_ADMIN +
                          (data.logo_mobile.data.attributes.formats.medium?.url ||
                            data.logo_mobile.data.attributes.formats.small?.url ||
                            data.logo_mobile.data.attributes.formats.large?.url ||
                            data.logo_mobile.data.attributes.formats.thumbnail?.url)
                        }
                        className="w-full"
                        alt=""
                      />
                    )}
                  </div>
                  {data.logo_desktop.data && (
                    <div className="hidden justify-center px-[30px] lg:flex">
                      <img
                        src={
                          process.env.NEXT_PUBLIC_URL_GAME_ADMIN +
                          (data.logo_desktop.data.attributes.formats.medium?.url ||
                            data.logo_desktop.data.attributes.formats.small?.url ||
                            data.logo_desktop.data.attributes.formats.large?.url ||
                            data.logo_desktop.data.attributes.formats.thumbnail?.url)
                        }
                        className="w-full"
                        alt=""
                      />
                    </div>
                  )}

                  <div className="bg-brand-deep-blue mt-[32px] flex flex-col rounded-[20px] p-[32px]">
                    <div className="grid gap-6">
                      {info.map(
                        (item, idx) =>
                          (item.label !== labelStatus.status ||
                            (item.label === labelStatus.status &&
                              item.value === 'IN DEVELOPMENT')) && (
                            <div className="flex items-center justify-between" key={idx}>
                              <p className="body-sm">{item.label}</p>
                              <div className="caption text-brand-light-blue max-w-[70%] rounded-[8px] bg-[#0F2F45] py-[7px] px-[12px] font-bold">
                                {item.value}
                              </div>
                            </div>
                          )
                      )}
                    </div>
                    <div className="order-[-1] mb-6 md:order-1 md:mb-0 md:mt-[48px] ">
                      {game_url && <PlayButton gameUrl={game_url} />}
                      {data.twitter_link && (
                        <a
                          href={data.twitter_link}
                          target="_blank"
                          className="btn-icon mt-6 flex w-full items-center justify-center bg-[#1DA1F2]"
                          rel="noreferrer"
                          onClick={() => {
                            event('Discord Button Clicked', {
                              button_location: 'Game',
                              game_name: data.twitter_link
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
                      {data.discord_link && (
                        <a
                          href={data.discord_link}
                          target="_blank"
                          className="btn-icon mt-6 flex w-full items-center justify-center bg-[#5B66F5]"
                          rel="noreferrer"
                          onClick={() => {
                            event('Discord Button Clicked', {
                              button_location: 'Game',
                              game_name: data.discord_link
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
                  {data.provide_text && (
                    <div className="bg-brand-deep-blue mt-[32px] flex flex-col rounded-[20px] p-[32px]">
                      <div className="text-brand-light-blue">{data.provide_text}</div>
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
  } else {
    return <></>;
  }
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
      // { params: { id: 'starstrike' } },
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
