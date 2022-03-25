import React from 'react';
import { socialLinks } from '../configs';
import DiscordIcon from './icons/DiscordIcon';
import InstagramIcon from './icons/InstagramIcon';
import MediumIcon from './icons/MediumIcon';
import TwitterIcon from './icons/TwitterIcon';

const Socials = [
  {
    id: 'discord',
    icon: <DiscordIcon />,
    link: socialLinks.discord,
    name: 'Discord'
  },
  {
    id: 'twitter',
    icon: <TwitterIcon />,
    link: socialLinks.twitter,
    name: 'Twitter'
  },
  {
    id: 'medium',
    icon: <MediumIcon />,
    link: socialLinks.medium,
    name: 'Medium'
  },
  {
    id: 'instagram',
    icon: <InstagramIcon />,
    link: socialLinks.instagram,
    name: 'Instagram'
  }
];

export default Socials;