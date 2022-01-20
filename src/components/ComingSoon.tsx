import Image from 'next/image';
import React from 'react';
import { socialLinks } from '../configs';
import DiscordIcon from './icons/DiscordIcon';
import InstagramIcon from './icons/InstagramIcon';
import Logo from './icons/Logo';
import MediumIcon from './icons/MediumIcon';
import TwitterIcon from './icons/TwitterIcon';

const links = [
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
const ComingSoon: React.FC = () => {
  return (
    <div className="min-h-[866px] pt-[56px] pb-4 px-4 bg-dark relative isolate text-white">
      <div className="absolute top-[81px] left-0 w-full z-[-1]">
        <div className="relative w-full h-[697px] ">
          <Image src="/images/home/header-bg.png" alt="" layout="fill" objectFit="cover" />
        </div>
      </div>
      <div className="w-[203px] mx-auto">
        <Logo />
      </div>
      <div>
        <div className="max-w-[607px] mx-auto text-center mt-[189px]">
          <h1 className="heading-lg md:heading-massive text-brand-white">Coming Soon</h1>
          <h3 className="mt-6 heading-sm-mobile md:heading-sm md:mt-10">
            Myria is a blockchain gaming ecosystem powered by the Myria blockchain.
          </h3>
          <div className="text-center">
            <a
              href={socialLinks.discord}
              target="_blank"
              className="mt-[38px] btn-icon btn-primary inline-flex items-center mx-auto"
              rel="noreferrer">
              <span className="w-[30px]">
                <DiscordIcon />
              </span>
              <span>JOIN DISCORD</span>
            </a>
          </div>
          <div className="mt-[90px] grid grid-flow-col gap-[36px] justify-center">
            {links.map((item, idx) => (
              <a key={idx} href={item.link} className="w-[32px]">
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
