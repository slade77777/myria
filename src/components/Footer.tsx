import { t, Trans } from '@lingui/macro';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { socialLinks } from 'src/configs';

import Logo from './icons/Logo';
import Socials from './Social';

const links = [
  {
    title: <Trans>Games</Trans>,
    blocks: [
      [
        {
          label: 'Metarush',
          link: '/game-detail/metarush'
        },
        {
          label: 'Metakart',
          link: '/game-detail/metakart'
        },
        {
          label: 'Block Royale',
          link: '/game-detail/block-royale'
        },
        {
          label: 'Starstrike Legends',
          link: '/game-detail/starstrike'
        }
      ]
    ]
  },
  {
    title: <Trans>Ecosystem</Trans>,
    blocks: [
      [
        {
          label: <Trans>Nodes</Trans>,
          link: '/nodes'
        },
        {
          label: <Trans>Ecosystem</Trans>,
          link: '/ecosystem'
        },
        {
          label: <Trans>Store</Trans>,
          link: '/store',
          inactive: true
        },
        {
          label: <Trans>For Studios</Trans>,
          link: '/for-studios'
        },
        {
          label: <Trans>Morphing NFTs</Trans>,
          link: '/interoperability'
        }
      ]
    ]
  },
  {
    title: <Trans>About Us</Trans>,
    blocks: [
      [
        {
          label: <Trans>About</Trans>,
          link: '/about-us'
        },
        {
          label: <Trans>Whitepaper (Coming soon)</Trans>,
          link: '/',
          disabled: true
        },
        {
          label: <Trans>Team</Trans>,
          link: '/about-us#teams'
        }
      ],
      [
        {
          label: <Trans>Careers</Trans>,
          link: '/careers'
        },
        {
          label: <Trans>News</Trans>,
          link: socialLinks.medium,
          external: true
        },
        {
          label: <Trans>Contact Us</Trans>,
          link: '/contact'
        }
      ]
    ]
  }
];

const Footer: React.FC = () => {
  return (
    <footer className="grid gap-y-[34px] md:gap-y-[50px] lg:grid-cols-[max-content_1fr] lg:grid-rows-[auto_auto] lg:gap-x-[100px] xl:gap-x-[281px]">
      <div>
        <div className="w-[215px]">
          <Logo />
        </div>
        <div className="mt-10 grid grid-flow-col justify-start gap-4 sm:gap-6 md:mt-[48px]">
          {Socials.map((item, idx) => (
            <a href={item.link} target="_blank" key={idx} className="w-[32px]" rel="noreferrer">
              {item.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="row-span-2 grid grid-cols-2 justify-start gap-10 gap-y-[32px] md:grid-cols-[auto_auto_auto] md:gap-[77px]">
        {links.map((item, idx) => (
          <div
            key={idx}
            className={clsx({
              'col-span-2 md:col-span-1': idx === 2
            })}>
            <h3 className="text-[24px] font-extrabold leading-[1.24]">{item.title}</h3>
            <div
              className={clsx('mt-6 grid gap-y-4', {
                'grid-cols-2 gap-x-10 md:grid-cols-1': idx === 2
              })}>
              {item.blocks.map((block, idx) => (
                <div key={idx} className={clsx('grid gap-y-4')}>
                  {block.map((item: any, idx) =>
                    !item?.inactive ? (
                      <Link href={item.link} key={idx}>
                        <a
                          target={item?.external ? '_blank' : '_self'}
                          key={idx}
                          rel="noreferrer"
                          className={clsx('text-[16px] leading-[1.23] hover:text-[#F5B941]', {
                            'pointer-events-none': item.disabled
                          })}>
                          {item.label}
                        </a>
                      </Link>
                    ) : (
                      <div key={idx} className="flex items-center">
                        <p className="mr-[7px] hover:cursor-not-allowed">{item.label}</p>
                        <div
                          style={{
                            boxShadow: '0 0 0 0.5px #9AC9E3'
                          }}
                          className="bg-opacity-4 h-3 rounded-sm bg-brand-light-blue/40 px-[3px] py-[1px] text-[6px] font-extrabold">
                          Soon!
                        </div>
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[14px] text-[16px] leading-[1.5] md:mt-0">
        <p>© Copyright 2022 Myria</p>
        <p>
          <Trans>Terms | Privacy</Trans>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
