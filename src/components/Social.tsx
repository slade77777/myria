import React from 'react';
import { socialLinks } from '../configs';
import DiscordIcon from './icons/DiscordIcon';
import InstagramIcon from './icons/InstagramIcon';
import MediumIcon from './icons/MediumIcon';
import TwitterIcon from './icons/TwitterIcon';

const Socials = [
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

export default Socials;