import React from 'react';
import { socialLinks } from '../configs';
import DiscordIcon from './icons/DiscordIcon';
import InstagramIcon from './icons/InstagramIcon';
import MediumIcon from './icons/MediumIcon';
import TelegramIcon from './icons/TelegramIcon';
import TwitterIcon from './icons/TwitterIcon';

const Socials = [
  {
    id: 'discord',
    icon: <DiscordIcon />,
    link: socialLinks.discord,
    name: 'Discord',
    event: 'Discord Button Clicked'
  },
  {
    id: 'twitter',
    icon: <TwitterIcon />,
    link: socialLinks.twitter,
    name: 'Twitter',
    event: 'Twitter Button Clicked'
  },
  {
    id: 'medium',
    icon: <MediumIcon />,
    link: socialLinks.medium,
    name: 'Medium',
    event: 'Medium Button Clicked'
  },
  {
    id: 'instagram',
    icon: <InstagramIcon />,
    link: socialLinks.instagram,
    name: 'Instagram',
    event: 'Instagram Button Clicked'
  },
  {
    id: 'instagram',
    icon: <TelegramIcon />,
    link: socialLinks.telegram,
    name: 'Telegram',
    event: 'Telegram Button Clicked'
  }
];

export default Socials;
