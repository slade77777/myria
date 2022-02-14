import clsx from 'clsx';
import Image from 'next/image';
import React, { useState } from 'react';
import { headerHeight } from '../../components/Header';
import DiscordIcon from '../../components/icons/DiscordIcon';
import Page from '../../components/Page';
import { paddingX } from '../../utils';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FirstSlider from '../../components/game-detail/FirstSlider';
import SecondSlider from '../../components/game-detail/SecondSlider';
import { useRouter } from 'next/router';
import { socialLinks } from 'src/configs';
import Subscribe from 'src/components/Subscribe';

export type Asset = {
  type: 'video' | 'image';
  src: string;
  image?: string;
};

const games: Record<
  string,
  {
    headerBg: string;
    title: string;
    description: string;
    logo: string;
    logoMobile: string;
    image?: {
      src: string;
      width: number;
      height: number;
    };
    info: {
      label: string;
      value: string;
    }[];
    assets: Asset[];
    content: {
      heading?: string;
      paragraph?: string[];
    }[];
  }
> = {
  metarush: {
    headerBg: '/images/game-detail/header-bg-1.png',
    title: 'Metarush',
    description:
      'A hilarious multiplayer game that will have your sides splitting as you bounce, tumble, and bowl over your friends and foes. Battle it out through increasingly wacky landscapes and claim your spot in the hall of glory.',
    logo: '/images/game-detail/metarush/logo.png',
    logoMobile: '/images/game-detail/metarush/logo-alt.png',
    image: {
      src: '/images/game-detail/metarush/1.png',
      width: 1854,
      height: 1042
    },
    assets: [
      {
        type: 'image',
        src: '/images/game-detail/metarush/3.png'
      },
      {
        type: 'image',
        src: '/images/game-detail/metarush/2.png'
      },

      {
        type: 'image',
        src: '/images/game-detail/metarush/1.png'
      },
      {
        type: 'image',
        src: '/images/game-detail/metarush/4.png'
      }
    ],
    content: [
      {
        heading: 'About the game',
        paragraph: [
          'The objective is simple – get to the finish line first and don’t fall to your doom while trying. Each match starts with a horde of players who get eliminated through a series of obstacles along the course to the final. The surviving players continue the battle in rounds with increasing difficulty until there is only one rushling standing.',
          'In this part of the Myriaverse, visitors are transformed into Bobble-Head form. This is according to this world’s terms of use and the laws of the metaverse that can be only broken by the mysterious Administrators...but more on that later.'
        ]
      },
      {
        heading: 'Endless online fun',
        paragraph: [
          'It was a calm day in the land of candy hammers and fiery strawberry lakes when a mysterious portal suddenly spawned a roaring crowd of brave players. Ready to rock, they started to roll down the hill of chocolate donuts in a chaotic race for the win. '
        ]
      },
      {
        heading: 'Compete, survive, win and earn!',
        paragraph: [
          'Choose the game mode that best suits your playstyle and fight for your right to party! Play alone or with friends and collect endless rewards.'
        ]
      },
      {
        heading: 'Roll with style!',
        paragraph: [
          'Choose the best outfit that expresses your personality. Unlock and collect multiple cosmetic skins and items that will carry over to other games as interoperable NFTs.'
        ]
      }
    ],
    info: [
      {
        label: 'Developer',
        value: 'MYRIA'
      },
      {
        label: 'Platform',
        value: 'WEB, IOS, ANDROID'
      },
      {
        label: 'Genre',
        value: 'OBSTACLE  BATTLE RACER'
      },
      {
        label: 'Status',
        value: 'IN DEVELOPMENT'
      }
    ]
  },
  metakart: {
    headerBg: '/images/game-detail/header-bg-2.png',
    title: 'Metakart',
    description:
      'Drift around thrilling tracks in a race for the finish line. Have endless fun shooting at your opponents and wreaking havoc all around you to gain extra points and climb the leaderboards. Dive into our numerous game modes and tracks to claim your rightful spot among the racing legends of the Myriaverse.',
    logo: '/images/game-detail/metakart/logo.png',
    logoMobile: '/images/game-detail/metakart/logo-alt.png',
    image: {
      src: '/images/game-detail/metakart/1.png',
      width: 927,
      height: 521
    },
    assets: [
      {
        type: 'image',
        src: '/images/game-detail/metakart/1.png'
      },
      {
        type: 'image',
        src: '/images/game-detail/metakart/2.png'
      },
      {
        type: 'image',
        src: '/images/game-detail/metakart/3.png'
      },
      {
        type: 'image',
        src: '/images/game-detail/metakart/4.png'
      }
    ],
    content: [
      {
        heading: 'About the game',

        paragraph: [
          `Are you ready for a crazy ride that is nothing short of hilarious? Hop into your shiny kart and race till your wheels burn. Can you handle the heat and destroy your opponents before they throw you off the track?
          `,
          `In this lawless racing game, you’ll need to do whatever it takes to thwart your rivals’ attempts at reaching the finish line before you. Choosing the optimal combination of driver and kart parts could be the difference between triumph and defeat. But don’t worry if your ride isn’t souped-up, you still have your shot at 1st place. Just make good use of the vicious power-ups scattered around the track to literally blast your competition into oblivion!`
        ]
      },
      {
        heading: 'Drift it up! ',
        paragraph: [
          'Throw your prized vehicle around the deadly turns of the track as you throw a dice to decide your destiny. Drifting and performing crazy stunts is your way of expressing your inner speed demons, so don’t be shy– let them come out and play!'
        ]
      },
      {
        heading: 'It’s all in your hands ',
        paragraph: [
          'Combine the right amount of acceleration, handling, and looks to nail the right recipe for the current track. You can also sprinkle in a bit of armour – just to play it safe – because, as my grandma always says, “if you ain’t ready for some rockets down the road, boy, you better come home!”'
        ]
      },
      {
        heading: 'Vanity factor number 1 ',
        paragraph: [
          `“Mirror, mirror on the wall, who's the fairest of them all?”
          If you’re still wondering whether those shiny pink rims or the NFT unicorn sticker on the hood are going to make you stand out on the track, then wonder no more. You're gonna shine like a star as your opponents remain a distant glimpse in the rear-view mirror.`
        ]
      }
    ],
    info: [
      {
        label: 'Developer',
        value: 'MYRIA'
      },
      {
        label: 'Platform',
        value: 'WEB, IOS, ANDROID'
      },
      {
        label: 'Genre',
        value: 'KART RACING'
      },
      {
        label: 'Status',
        value: 'IN DEVELOPMENT'
      }
    ]
  },
  'block-royale': {
    headerBg: '/images/game-detail/header-bg-3.png',
    title: 'Block Royale',
    description:
      'Eliminate your opponents in this fast-paced-action-packed-survival game, to achieve victory and claim the spoils of war. There can be only one hero or team standing when the crimson curtain hits the ground. ',
    logo: '/images/game-detail/block-royale/logo.png',
    logoMobile: '/images/game-detail/block-royale/logo-alt.png',
    image: {
      src: '/images/game-detail/block-royale/3.png',
      width: 905,
      height: 509
    },
    assets: [
      {
        type: 'image',
        src: '/images/game-detail/block-royale/1.png'
      },
      {
        type: 'image',
        src: '/images/game-detail/block-royale/2.png'
      },
      {
        type: 'image',
        src: '/images/game-detail/block-royale/3.png'
      },
      {
        type: 'image',
        src: '/images/game-detail/block-royale/4.png'
      }
    ],
    content: [
      {
        heading: 'About the game',
        paragraph: [
          'Once in a while, a portal opens to a special game world – the BR Arena.',
          'Dive in, we dare you. You’ll find yourself gracefully descending from the sky while you survey the lands to select your ideal landing spot. Enjoy that moment of peace, because once your feet touch the ground you’ll be plunged into an intense battle for loot and powerful equipment.As expected, life in this world ain’t easy, and at given intervals of time the playable area of the map will shrink, pushing you closer to your enemies. Needless to say, they ain’t waiting for you in a bed of roses, so be prepared!'
        ]
      },
      {
        heading: 'Intense battle to the very end',
        paragraph: [
          'Gather and upgrade the best equipment on the battlefield. Collect power-ups and build combat facilities to overcome your foes. You can deal with this harsh reality alone or with your friends in a team of three.'
        ]
      },
      {
        heading: 'Choose your champion',
        paragraph: [
          'Pick one of the available warrior classes that best suits your playstyle. Are you a one-man army or a silent assassin who strikes from the shadows? Or maybe you’re a mysterious alien psychic who can suck the life out of his enemies...'
        ]
      },
      {
        heading: 'Battle with style!',
        paragraph: [
          'Choose the best outfit that expresses your inner self. Unlock and collect multiple cosmetic skins and items that will carry across other games as interoperable NFTs. '
        ]
      }
    ],
    info: [
      {
        label: 'Developer',
        value: 'MYRIA'
      },
      {
        label: 'Platform',
        value: 'PC, MAC, IOS, ANDROID'
      },
      {
        label: 'Genre',
        value: 'BATTLE ROYALE'
      },
      {
        label: 'Status',
        value: 'IN DEVELOPMENT'
      }
    ]
  },
  starstrike: {
    headerBg: '/images/game-detail/header-bg-4.png',
    title: 'Starstrike Legends',
    description:
      'Utilize your gunplay skills in a combination with your unique hero abilities to win a series of team battles or in other game modes. Manage your ability upgrades and weapons of choice to optimize your chances of winning.',
    logo: '/images/game-detail/starstrike/logo.png',
    logoMobile: '/images/game-detail/starstrike/logo-alt.png',
    assets: [
      {
        type: 'image',
        src: '/images/game-detail/starstrike/1.png'
      }
    ],
    content: [
      {
        heading: 'About the game',
        paragraph: [
          `Nobody lives forever, and these heroes sure as hell don’t care – they literally die for the sake of fun. Dive into a series of short combat rounds to win a match of 5 vs 5. The attacking team must activate a bomb on a specified location on the map. If you’re on the defending side…you know what you need to do, right?`,
          `Just make sure you’re still alive till the end of the round or you’ll be spectating from the sidelines. And that means nobody will be able to appreciate your cute hot-dog suit that you’ve just brought over from a zany skirmish in the Metarush world.
          `
        ]
      },
      {
        heading: 'Think before you shoot!',
        paragraph: [
          'Carefully select the right equipment in the beginning of the round. You might want to shoot your enemies from a distance, or to burn the whole level to the ground – it’s your choice. Do you have what it takes to be master of destruction?          '
        ]
      },
      {
        heading: 'Heroes don’t all wear capes',
        paragraph: [
          'Every hero has three unique abilities, each requiring charges, as well as one ultimate ability that requires charging through kills, deaths, collectibles, or objectives. It’s easier than it sounds, and even funnier…          '
        ]
      },
      {
        heading: 'Not the face!',
        paragraph: [
          'Interoperability FTW! Yes, we’ve got you covered - you can bring those crazy skins, sprays, hats, and every other exclusive NFT you’ve gathered along your journey through the Myriaverse. The last thing I want to see on the battlefield is tie-dye tights, but hey – it’s your party after all!          '
        ]
      }
    ],
    info: [
      {
        label: 'Developer',
        value: 'MYRIA'
      },
      {
        label: 'Platform',
        value: 'PC, MAC'
      },
      {
        label: 'Genre',
        value: 'FPS'
      },
      {
        label: 'Status',
        value: 'IN DEVELOPMENT'
      }
    ]
  }
};

const GameDetail: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const { id } = router.query;
  if (typeof id !== 'string') {
    return null;
  }

  const game = games[id];
  const { title, assets, logo, logoMobile, content, info, image, description, headerBg } = game;
  return (
    <Page>
      <div>
        <section
          style={{
            paddingTop: headerHeight
          }}
          className={clsx(paddingX, 'relative isolate mb-[120px] md:min-h-screen ')}>
          <div className="absolute left-0 z-[-1] h-[809px] w-full">
            <div className="relative h-full w-full ">
              <Image src={headerBg} alt="" layout="fill" objectFit="cover" />
            </div>
          </div>
          <div className="mx-auto mt-10 w-full max-w-content">
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
                      {item.paragraph?.map((p, idx) => (
                        <p className="body mt-6 text-light" key={idx}>
                          {p}
                        </p>
                      ))}
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
                <div className="mt-[32px] flex flex-col rounded-[20px] bg-brand-deep-blue p-[32px]">
                  <div className="grid gap-6">
                    {info.map((item, idx) => (
                      <div className="flex items-center justify-between" key={idx}>
                        <p className="body-sm">{item.label}</p>
                        <div className="caption rounded-[8px] bg-[#0F2F45] py-[7px] px-[12px] font-bold text-brand-light-blue">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="order-[-1] mb-6 md:order-1 md:mb-0 md:mt-[48px] ">
                    {/* <button
                      className="justify-center w-full btn-lg bg-[rgba(255,255,255,0.2)] text-[rgba(255,255,255,0.4)]"
                      disabled>
                      IN DEVELOPMENT
                    </button> */}
                    <button className="btn-lg btn-primary w-full justify-center">
                      IN DEVELOPMENT
                    </button>
                    <a
                      href={socialLinks.discord}
                      target="_blank"
                      className="btn-icon btn-white mt-6 flex w-full items-center justify-center"
                      rel="noreferrer">
                      <span className="w-[30px]">
                        <DiscordIcon />
                      </span>
                      <span>JOIN DISCORD</span>
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
      { params: { id: 'starstrike' } }
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
