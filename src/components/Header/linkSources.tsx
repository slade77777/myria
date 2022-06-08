import { Trans } from '@lingui/macro';
import { socialLinks } from 'src/configs';
import { NavItem } from './type';

export const linkSources: { [key: string]: NavItem } = {
  home: {
    id: 'home',
    text: <Trans>Home</Trans>,
    url: '/',
    position: 'left',
    action: ['join-discord', 'login', 'mint']
  },
  ecosystem: {
    id: 'ecosystem',
    text: <Trans>Ecosystem</Trans>,
    url: '/ecosystem',
    position: 'left',
    action: ['join-discord', 'login', 'mint']
  },
  games: {
    id: 'games',
    text: <Trans>Games</Trans>,
    url: '/games',
    position: 'left',
    action: ['join-discord', 'login', 'mint']
  },
  nodes: {
    id: 'nodes',
    text: <Trans>Nodes</Trans>,
    url: '/nodes',
    position: 'left',
    action: ['join-discord', 'login', 'mint']
  },
  store: {
    id: 'store',
    text: <Trans>Store</Trans>,
    url: '/store',
    inactive: true,
    position: 'left',
    action: ['join-discord', 'login', 'mint']
  },
  forDevelopers: {
    id: 'forDevelopers',
    text: <Trans>Home</Trans>,
    url: '/for-developers',
    position: 'left',
    action: ['start-building']
  },
  ourSolution: {
    id: 'ourSolution',
    text: <Trans>OUR SOLUTION</Trans>,
    url: '/for-developers/solution',
    position: 'left',
    action: ['start-building']
  },
  // {
  //   text: <Trans>DEVELOPER PROGRAM</Trans>,
  //   url: '/developer-program',
  //   position: 'left',
  //   action: ['start-building']
  // },
  about: {
    id: 'about',
    text: <Trans>About</Trans>,
    position: 'right',
    children: [
      {
        id: 'our-vision',
        text: <Trans>Our vision</Trans>,
        url: '/our-vision'
      },
      {
        id: 'team',
        text: <Trans>Our team</Trans>,
        url: '/team'
      },
      {
        id: 'studios',
        text: <Trans>MYRIA STUDIOS</Trans>,
        url: '/studios'
      },
      {
        id: 'careers',
        text: <Trans>Careers</Trans>,
        url: '/careers'
      }
    ]
  },
  community: {
    id: 'community',
    text: <Trans>Community</Trans>,
    position: 'right',
    children: [
      {
        id: 'discord',
        text: 'Discord',
        url: socialLinks.discord,
        target: '_blank'
      },
      {
        id: 'twitter',
        text: 'Twitter',
        url: socialLinks.twitter,
        target: '_blank'
      },
      {
        id: 'instagram',
        text: 'Instagram',
        url: socialLinks.instagram,
        target: '_blank'
      },
      {
        id: 'medium',
        text: 'Medium',
        url: socialLinks.medium,
        target: '_blank'
      }
    ]
  }
};
