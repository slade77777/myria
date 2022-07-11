import clsx from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';
import { useGA4 } from 'src/lib/ga';
import { headerHeight } from '../../components/Header';
import DiscordIcon from '../../components/icons/DiscordIcon';
import Page from '../../components/Page';
import { paddingX } from '../../utils';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FirstSlider from '../../components/game-detail/FirstSlider';
import SecondSlider from '../../components/game-detail/SecondSlider';
import { useRouter } from 'next/router';
import Subscribe from 'src/components/Subscribe';
import { Trans } from '@lingui/macro';
import { socialLinks } from 'src/configs';
import useGamesData from '../../hooks/useGamesData';
import SignInModal from 'src/components/SignIn/Modal';
import { AuthenticationProvider, useAuthenticationContext } from 'src/context/authentication';
import Input from 'src/components/Input';
import { useMutation } from 'react-query';
import { devApiClient } from 'src/client';

export type Asset = {
  type: 'video' | 'image';
  src: string;
  image?: string;
};

const GameDetail: React.FC = () => {
  const { mutate: login } = useMutation(
    (_data: any) => devApiClient.post(`accounts/login`, _data),
    {
      onSuccess: (res) => {
        setIsLoggedIn(true);
      },
      onError: (error: any) => {
        alert(error.message);
      }
    }
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState({
    login: '',
    password: ''
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const { event } = useGA4();
  const { id } = router.query;
  const games = useGamesData();
  const { user } = useAuthenticationContext();
  if (typeof id !== 'string') {
    return null;
  }

  const game = games[id];
  const { title, assets, logo, logoMobile, content, info, image, description, headerBg } = game;
  const onChange = (e: any) => {
    console.log(e.target.name, { ...data, [e.target.name]: e.target.value });
    setData({ ...data, [e.target.name]: e.target.value });
  };

  if (!isLoggedIn) {
    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await login(data);
          } catch (err: any) {
            alert(err.message);
          }
        }}>
        <input
          autoComplete="new-password"
          placeholder="login"
          style={{ color: 'black' }}
          name="login"
          onChange={onChange}
          value={data.login}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          style={{ color: 'black' }}
          onChange={onChange}
          value={data.password}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
  return (
    <Page stickyHeader={false}>
      <div>
        <section
          style={{
            paddingTop: headerHeight
          }}
          className={clsx(paddingX, 'relative isolate mb-[120px] md:min-h-screen ')}>
          {headerBg && (
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
                <div>
                  <FirstSlider
                    currentSlide={currentSlide}
                    setCurrentSlide={setCurrentSlide}
                    assets={assets}
                  />
                </div>
                <div className="mt-6">
                  <SecondSlider
                    currentSlide={currentSlide}
                    setCurrentSlide={setCurrentSlide}
                    assets={assets}
                  />
                </div>
                <div className="">
                  <p className="body-lg mt-[70px]">{description}</p>
                  {image && (
                    <div className="mt-[84px] flex overflow-hidden rounded-[5px]">
                      <Image src={image.src} alt="" width={image.width} height={image.height} />
                    </div>
                  )}
                  {content.map((item, idx) => (
                    <div key={idx} className="mt-[48px] ">
                      <h4 className="heading-sm">{item.heading}</h4>
                      {item.paragraph?.map((p, idx) => {
                        if (typeof p === 'string') {
                          return (
                            <p className="body text-light mt-6" key={idx}>
                              {p}
                            </p>
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
                    {game.action ? (
                      <a
                        href={game.action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-lg btn-primary w-full justify-center">
                        <Trans>{game.action.label}</Trans>
                      </a>
                    ) : (
                      <button className="btn-lg btn-primary w-full justify-center">
                        <Trans>IN DEVELOPMENT</Trans>
                      </button>
                    )}
                    <a
                      href={game.discord}
                      target="_blank"
                      className="btn-icon btn-white mt-6 flex w-full items-center justify-center"
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
                      <span>
                        <Trans>JOIN DISCORD</Trans>
                      </span>
                    </a>
                  </div>
                </div>
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
  return {
    paths: [
      { params: { id: 'metarush' } },
      { params: { id: 'metakart' } },
      { params: { id: 'block-royale' } },
      { params: { id: 'starstrike' } },
      { params: { id: 'moonville-farms' } }
    ],
    fallback: false
  };
}

export async function getStaticProps() {
  return {
    props: {}
  };
}

// eslint-disable-next-line react/display-name
export default () => {
  return (
    <AuthenticationProvider>
      <GameDetail />
    </AuthenticationProvider>
  );
};
