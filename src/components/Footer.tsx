import clsx from 'clsx';
import React from 'react';
import { socialLinks } from '../configs';
import DiscordIcon from './icons/DiscordIcon';
import InstagramIcon from './icons/InstagramIcon';
import Logo from './icons/Logo';
import MediumIcon from './icons/MediumIcon';
import TwitterIcon from './icons/TwitterIcon';

const links = [
  {
    title: 'Games',
    blocks: [
      [
        {
          label: 'Metarush',
          link: '/'
        },
        {
          label: 'Metakart',
          link: '/'
        },
        {
          label: 'Blocks Royale',
          link: '/'
        },
        {
          label: 'Starstrike Legends',
          link: '/'
        }
      ]
    ]
  },
  {
    title: 'Ecosystem',
    blocks: [
      [
        {
          label: 'Nodes',
          link: '/'
        },
        {
          label: 'Ecosystem',
          link: '/'
        },
        {
          label: 'Store',
          link: '/'
        },
        {
          label: 'For Studios',
          link: '/'
        },
        {
          label: 'Morphing NFTs',
          link: '/'
        }
      ]
    ]
  },
  {
    title: 'About Us',
    blocks: [
      [
        {
          label: 'About',
          link: '/'
        },
        {
          label: 'Whitepaper',
          link: '/'
        },
        {
          label: 'Team',
          link: '/'
        }
      ],
      [
        {
          label: 'Careers',
          link: '/'
        },
        {
          label: 'News',
          link: '/'
        },
        {
          label: 'Contact Us',
          link: '/'
        }
      ]
    ]
  }
];

const socials = [
  {
    icon: <DiscordIcon />,
    link: socialLinks.discord
  },
  {
    icon: <TwitterIcon />,
    link: socialLinks.twitter
  },
  {
    icon: <MediumIcon />,
    link: socialLinks.medium
  },
  {
    icon: <InstagramIcon />,
    link: socialLinks.instagram
  }
];
const Footer: React.FC = () => {
  return (
    <footer className="grid lg:grid-cols-[max-content_1fr] lg:grid-rows-[auto_auto] lg:gap-x-[100px] xl:gap-x-[281px] gap-y-[34px] md:gap-y-[50px]">
      <div>
        <div className="w-[215px]">
          <Logo />
        </div>
        <div className="mt-10 md:mt-[48px] grid grid-flow-col gap-4 sm:gap-6 justify-start">
          {socials.map((item, idx) => (
            <a href={item.link} key={idx} className="w-[32px]">
              {item.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="row-span-2 grid grid-cols-2 md:grid-cols-[auto_auto_auto] gap-y-[32px] gap-10 md:gap-[77px] justify-start">
        {links.map((item, idx) => (
          <div
            key={idx}
            className={clsx({
              'col-span-2 md:col-span-1': idx === 2
            })}>
            <h3 className="font-extrabold text-[24px] leading-[1.24]">{item.title}</h3>
            <div
              className={clsx('grid gap-y-4 mt-6', {
                'grid-cols-2 gap-x-10 md:grid-cols-1': idx === 2
              })}>
              {item.blocks.map((block, idx) => (
                <div key={idx} className={clsx('grid gap-y-4')}>
                  {block.map((item, idx) => (
                    <a
                      href={item.link}
                      key={idx}
                      className="text-[16px] leading-[1.23] hover:text-[#F5B941]">
                      {item.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="text-[16px] leading-[1.5] mt-[14px] md:mt-0">
        <p>© Copyright 2022 Myria</p>
        <p>Terms | Privacy</p>
      </div>
    </footer>
  );
};

export default Footer;
