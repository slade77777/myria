import React from 'react';
import { socialLinks } from '../configs';
import DiscordIcon from './icons/DiscordIcon';
import InstagramIcon from './icons/InstagramIcon';
import MediumIcon from './icons/MediumIcon';
import TwitterIcon from './icons/TwitterIcon';

const Socials = [
  {
    icon: <DiscordIcon />,
    link: socialLinks.discord,
    name: 'Discord'
  },
  {
    icon: <TwitterIcon />,
    link: socialLinks.twitter,
    name: 'Twitter'
  },
  {
    icon: <MediumIcon />,
    link: socialLinks.medium,
    name: 'Medium'
  },
  {
    icon: <InstagramIcon />,
    link: socialLinks.instagram,
    name: 'Instagram'
  }
];

export default Socials;