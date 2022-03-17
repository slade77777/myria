import { Trans } from '@lingui/macro';
import { socialLinks } from 'src/configs';
import { NavItem } from './type';

export const linkSources: { [key: string]: NavItem } = {
  home: {
    text: <Trans>Home</Trans>,
    url: '/',
    position: 'left',
    action: 'join-discord'
  },
  ecosystem: {
    text: <Trans>Ecosystem</Trans>,
    url: '/ecosystem',
    position: 'left',
    action: 'join-discord'
  },
  games: {
    text: <Trans>Games</Trans>,
    url: '/games',
    position: 'left',
    action: 'join-discord'
  },
  nodes: {
    text: <Trans>Nodes</Trans>,
    url: '/nodes',
    position: 'left',
    action: 'join-discord'
  },
  store: {
    text: <Trans>Store</Trans>,
    url: '/store',
    inactive: true,
    position: 'left',
    action: 'join-discord'
  },
  forDevelopers: {
    text: <Trans>Home</Trans>,
    url: '/for-developers',
    position: 'left',
    action: 'start-building'
  },
  ourSolution: {
    text: <Trans>OUR SOLUTION</Trans>,
    url: '/for-developers/solution',
    position: 'left',
    action: 'start-building'
  },
  // {
  //   text: <Trans>DEVELOPER PROGRAM</Trans>,
  //   url: '/developer-program',
  //   position: 'left',
  //   action: 'start-building'
  // },
  about: {
    text: <Trans>About</Trans>,
    position: 'right',
    children: [
      {
        text: <Trans>Our vision</Trans>,
        url: '/our-vision'
      },
      {
        text: <Trans>Our team</Trans>,
        url: '/team'
      },
      {
        text: <Trans>MYRIA STUDIOS</Trans>,
        url: '/studios'
      },
      {
        text: <Trans>Careers</Trans>,
        url: '/careers'
      }
    ]
  },
  community: {
    text: <Trans>Community</Trans>,
    position: 'right',
    children: [
      {
        text: 'Discord',
        url: socialLinks.discord,
        target: '_blank'
      },
      {
        text: 'Twitter',
        url: socialLinks.twitter,
        target: '_blank'
      },
      {
        text: 'Instagram',
        url: socialLinks.instagram,
        target: '_blank'
      },
      {
        text: 'Medium',
        url: socialLinks.medium,
        target: '_blank'
      }
    ]
  }
};
