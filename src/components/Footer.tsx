import clsx from 'clsx';
import React from 'react';
import { socialLinks } from 'src/configs';

import Logo from './icons/Logo';
import Socials from './Social';

const links = [
  {
    title: 'Games',
    blocks: [
      [
        {
          label: 'Metarush',
          link: '/game-detail'
        },
        {
          label: 'Metakart',
          link: '/game-detail'
        },
        {
          label: 'Block Royale',
          link: '/game-detail'
        },
        {
          label: 'Starstrike Legends',
          link: '/gamde-detail'
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
          link: '/nodes'
        },
        {
          label: 'Ecosystem',
          link: '/ecosystem'
        },
        {
          label: 'Store',
          link: '/store',
          inactive: true,
        },
        {
          label: 'For Studios',
          link: '/for-studios'
        },
        {
          label: 'Morphing NFTs',
          link: '/interoperability'
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
          link: '/about-us'
        },
        {
          label: 'Whitepaper (Coming soon)',
          link: '/'
        },
        {
          label: 'Team',
          link: '/about-us'
        }
      ],
      [
        {
          label: 'Careers',
          link: '/careers'
        },
        {
          label: 'News',
          link: socialLinks.medium,
          external: true,
        },
        {
          label: 'Contact Us',
          link: '/contact'
        }
      ]
    ]
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
          {Socials.map((item, idx) => (
            <a href={item.link} target="_blank" key={idx} className="w-[32px]" rel="noreferrer">
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
                    !item.inactive ? <a
                      href={item.link}
                      target={item.external ? "_blank" : "_self"}
                      key={idx}
                      className="text-[16px] leading-[1.23] hover:text-[#F5B941]">
                      {item.label}
                    </a> : <div className='flex items-center'>
                      <p className="hover:text-brand-gold hover:cursor-pointer mr-[7px]">{item.label}</p>
                      <div className='font-extrabold text-[6px] rounded-sm px-[3px] py-[1px] h-3 bg-brand-light-blue/40 bg-opacity-4 border-[0.5px] border-brand-light-blue'>
                        Soon!
                      </div>
                    </div>
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
