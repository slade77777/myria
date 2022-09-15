import { t, Trans } from '@lingui/macro';
import { useMemo } from 'react';
import dataJson from 'src/components/games/data-json';
import { socialLinks } from 'src/configs';
import { Asset } from '../pages/game-detail/[id]';

export default function useGamesData() {
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
        paragraph?: string[] | JSX.Element[];
      }[];
      discord: string;
      action?: {
        label: string | JSX.Element;
        href: string;
      };
      gameUrl?: string;
    }
  > = useMemo(
    () => ({
      metarush: {
        discord: socialLinks.discord,
        headerBg: '/images/game-detail/header-bg-1.png',
        title: 'Metarush',
        description: t`A hilarious multiplayer game that will have your sides splitting as you bounce, tumble, and bowl over your friends and foes. Battle it out through increasingly wacky landscapes and claim your spot in the hall of glory.`,
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
            heading: t`About the game`,
            paragraph: [
              t`The objective is simple – get to the finish line first and don’t fall to your doom while trying. Each match starts with a horde of players who get eliminated through a series of obstacles along the course to the final. The surviving players continue the battle in rounds with increasing difficulty until there is only one rushling standing.`,
              t`In this part of the Myriaverse, visitors are transformed into Bobble-Head form. This is according to this world’s terms of use and the laws of the metaverse that can be only broken by the mysterious Administrators...but more on that later.`
            ]
          },
          {
            heading: t`Endless online fun`,
            paragraph: [
              t`It was a calm day in the land of candy hammers and fiery strawberry lakes when a mysterious portal suddenly spawned a roaring crowd of brave players. Ready to rock, they started to roll down the hill of chocolate donuts in a chaotic race for the win. `
            ]
          },
          {
            heading: t`Compete, survive, win and earn!`,
            paragraph: [
              t`Choose the game mode that best suits your playstyle and fight for your right to party! Play alone or with friends and collect endless rewards.`
            ]
          },
          {
            heading: t`Roll with style!`,
            paragraph: [
              t`Choose the best outfit that expresses your personality. Unlock and collect multiple cosmetic skins and items that will carry over to other games as interoperable NFTs.`
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
        discord: socialLinks.discord,
        headerBg: '/images/game-detail/header-bg-2.png',
        title: 'Metakart',
        description: t`Drift around thrilling tracks in a race for the finish line. Have endless fun shooting at your opponents and wreaking havoc all around you to gain extra points and climb the leaderboards. Dive into our numerous game modes and tracks to claim your rightful spot among the racing legends of the Myriaverse.`,
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
            heading: t`About the game`,

            paragraph: [
              t`Are you ready for a crazy ride that is nothing short of hilarious? Hop into your shiny kart and race till your wheels burn. Can you handle the heat and destroy your opponents before they throw you off the track?
          `,
              t`In this lawless racing game, you’ll need to do whatever it takes to thwart your rivals’ attempts at reaching the finish line before you. Choosing the optimal combination of driver and kart parts could be the difference between triumph and defeat. But don’t worry if your ride isn’t souped-up, you still have your shot at 1st place. Just make good use of the vicious power-ups scattered around the track to literally blast your competition into oblivion!`
            ]
          },
          {
            heading: t`Drift it up! `,
            paragraph: [
              t`Throw your prized vehicle around the deadly turns of the track as you throw a dice to decide your destiny. Drifting and performing crazy stunts is your way of expressing your inner speed demons, so don’t be shy– let them come out and play!`
            ]
          },
          {
            heading: t`It’s all in your hands `,
            paragraph: [
              t`Combine the right amount of acceleration, handling, and looks to nail the right recipe for the current track. You can also sprinkle in a bit of armour – just to play it safe – because, as my grandma always says, “if you ain’t ready for some rockets down the road, boy, you better come home!”`
            ]
          },
          {
            heading: t`Vanity factor number 1 `,
            paragraph: [
              t`“Mirror, mirror on the wall, who's the fairest of them all?”
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
        discord: socialLinks.discord,
        headerBg: '/images/game-detail/header-bg-3.png',
        title: 'Block Royale',
        description: t`Eliminate your opponents in this fast-paced-action-packed-survival game, to achieve victory and claim the spoils of war. There can be only one hero or team standing when the crimson curtain hits the ground. `,
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
            heading: t`About the game`,
            paragraph: [
              t`Once in a while, a portal opens to a special game world – the BR Arena.`,
              t`Dive in, we dare you. You’ll find yourself gracefully descending from the sky while you survey the lands to select your ideal landing spot. Enjoy that moment of peace, because once your feet touch the ground you’ll be plunged into an intense battle for loot and powerful equipment.As expected, life in this world ain’t easy, and at given intervals of time the playable area of the map will shrink, pushing you closer to your enemies. Needless to say, they ain’t waiting for you in a bed of roses, so be prepared!`
            ]
          },
          {
            heading: t`Intense battle to the very end`,
            paragraph: [
              t`Gather and upgrade the best equipment on the battlefield. Collect power-ups and build combat facilities to overcome your foes. You can deal with this harsh reality alone or with your friends in a team of three.`
            ]
          },
          {
            heading: t`Choose your champion`,
            paragraph: [
              t`Pick one of the available warrior classes that best suits your playstyle. Are you a one-man army or a silent assassin who strikes from the shadows? Or maybe you’re a mysterious alien psychic who can suck the life out of his enemies...`
            ]
          },
          {
            heading: t`Battle with style!`,
            paragraph: [
              t`Choose the best outfit that expresses your inner self. Unlock and collect multiple cosmetic skins and items that will carry across other games as interoperable NFTs. `
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
        discord: socialLinks.discord,
        headerBg: '/images/game-detail/header-bg-4.png',
        title: 'Starstrike Legends',
        description: t`Utilize your gunplay skills in a combination with your unique hero abilities to win a series of team battles or in other game modes. Manage your ability upgrades and weapons of choice to optimize your chances of winning.`,
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
            heading: t`About the game`,
            paragraph: [
              t`Nobody lives forever, and these heroes sure as hell don’t care – they literally die for the sake of fun. Dive into a series of short combat rounds to win a match of 5 vs 5. The attacking team must activate a bomb on a specified location on the map. If you’re on the defending side…you know what you need to do, right?`,
              t`Just make sure you’re still alive till the end of the round or you’ll be spectating from the sidelines. And that means nobody will be able to appreciate your cute hot-dog suit that you’ve just brought over from a zany skirmish in the Metarush world.
          `
            ]
          },
          {
            heading: t`Think before you shoot!`,
            paragraph: [
              t`Carefully select the right equipment in the beginning of the round. You might want to shoot your enemies from a distance, or to burn the whole level to the ground – it’s your choice. Do you have what it takes to be master of destruction?`
            ]
          },
          {
            heading: t`Heroes don’t all wear capes`,
            paragraph: [
              t`Every hero has three unique abilities, each requiring charges, as well as one ultimate ability that requires charging through kills, deaths, collectibles, or objectives. It’s easier than it sounds, and even funnier…`
            ]
          },
          {
            heading: t`Not the face!`,
            paragraph: [
              t`Interoperability FTW! Yes, we’ve got you covered - you can bring those crazy skins, sprays, hats, and every other exclusive NFT you’ve gathered along your journey through the Myriaverse. The last thing I want to see on the battlefield is tie-dye tights, but hey – it’s your party after all!`
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
      },
      'moonville-farms': {
        discord: socialLinks.discord,
        headerBg: '',
        title: 'Moonville Farms',
        description: t`A competitive play-and-earn tycoon farming simulator. `,
        logo: '/images/game-detail/moonville-farms/logo.png',
        logoMobile: '/images/game-detail/moonville-farms/1.jpeg',
        assets: [
          {
            type: 'video',
            src: '/videos/home/moonville.mp4',
            image: '/images/game-detail/moonville-farms/3.png'
          },
          {
            type: 'image',
            src: '/images/game-detail/moonville-farms/2.png'
          },
          {
            type: 'image',
            src: '/images/game-detail/moonville-farms/1.jpeg'
          },
          {
            type: 'image',
            src: '/images/game-detail/moonville-farms/3.png'
          }
        ],
        content: [
          {
            heading: t`About the game`,
            paragraph: [
              t`Easy to play, difficult to master. Select the right terrain to base your industrial revolution. Choose wisely, as this will determine the types of resources and production opportunities available to you. Make sure to look after your base in order to increase your score and climb the ranks. At the end of each tournament, the competition is reset, so don’t worry if you get it wrong the first time!
          `
            ]
          },
          {
            heading: t`A rewarding experience`,
            paragraph: [
              t`Once you figure out the optimal production pipeline, the game will start yielding rewards for all your hard work. Are you curious how difficult is to produce a batch of Starberry Jam? What about Moonsteel? It surely can’t be that hard, right?`
            ]
          },
          {
            heading: t`Build, upgrade, and earn!`,
            paragraph: [
              t`Watch your village grow and flourish as you move up the ranks. Are you able to devise the best strategy and outperform your rivals?`
            ]
          },
          {
            heading: t`Make it out of this world!`,
            paragraph: [
              t`Customize your Moon Village with a range of cosmetic skins for various buildings and crew. These skins are NFTs, therefore remain yours forever, and are reusable across games.`
            ]
          },
          {
            heading: t`Features`,
            paragraph: [
              <ol
                key="feature-1"
                className=" body text-light mt-6 list-inside list-decimal space-y-2">
                <li>
                  <Trans>
                    <strong>Play and earn</strong> - Convert your score and time spent into tangible
                    rewards (when Beta kicks in). Addictive fun aside, not a single day of gameplay
                    will be time wasted.
                  </Trans>
                </li>
                <li>
                  <Trans>
                    <strong>If it’s yours, it stays yours</strong> - You’ve worked hard to build
                    that neat graveyard farm for two whole days and now it’s yours to stay… forever!
                  </Trans>
                </li>
                <li>
                  <Trans>
                    <strong>Resourcefulness rules!</strong> - Overcome your competition with the
                    best strategy and become the master of Moonville.
                  </Trans>
                </li>
              </ol>
            ]
          }
        ],
        info: [
          {
            label: 'Developer',
            value: 'LEAPBLOCK STUDIOS'
          },
          {
            label: 'Platform',
            value: 'WEB'
          },
          {
            label: 'Genre',
            value: 'SIMULATION'
          },
          {
            label: 'Status',
            value: 'IN DEVELOPMENT'
          }
        ],
        action: {
          label: 'Start',
          href: process.env.NEXT_PUBLIC_MOONVILLE_URL || ''
        },
        gameUrl: process.env.NEXT_PUBLIC_MOONVILLE_URL || ''
      },
      ...dataJson
    }),
    []
  );

  return games;
}
