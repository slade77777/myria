import { Trans } from '@lingui/macro';
import { socialLinks } from 'src/configs';
import EnternalLinkIcon from '../icons/EnternalLinkIcon';
import LinkIcon from '../icons/LinkIcon';
import { NavItem } from './type';

export const linkSources: { [key: string]: NavItem } = {
  marketplace: {
    id: 'marketplace',
    text: <Trans>Marketplace</Trans>,
    url: '/marketplace',
    position: 'left',
    action: ['join-discord', 'login', 'mint', 'start-building']
  },
  games: {
    id: 'games',
    text: <Trans>Games</Trans>,
    url: '/games',
    position: 'left',
    action: ['join-discord', 'login', 'mint', 'start-building']
  },
  nodes: {
    id: 'nodes',
    text: <Trans>Nodes</Trans>,
    url: '/nodes',
    position: 'left',
    action: ['join-discord', 'login', 'mint', 'start-building']
  },
  // store: {
  //   id: 'store',
  //   text: <Trans>Store</Trans>,
  //   url: '/store',
  //   inactive: true,
  //   position: 'left',
  //   action: ['join-discord', 'login', 'mint']
  // },
  buildWithMyria: {
    id: 'buildWithMyria',
    text: <Trans>Build with myria</Trans>,
    url: '/for-developers',
    position: 'left',
    action: ['join-discord', 'login', 'mint', 'start-building']
  },
  sigilRewards: {
    id: 'sigil',
    text: <Trans>Sigil Rewards</Trans>,
    url: '/sigil',
    position: 'left',
    action: ['join-discord', 'login', 'mint', 'start-building'],
    icon: <EnternalLinkIcon size={16} stroke="white" />,
    target: '_blank'
  }
  // ourSolution: {
  //   id: 'ourSolution',
  //   text: <Trans>OUR SOLUTION</Trans>,
  //   url: '/for-developers/solution',
  //   position: 'left',
  //   action: ['start-building']
  // },
  // {
  //   text: <Trans>DEVELOPER PROGRAM</Trans>,
  //   url: '/developer-program',
  //   position: 'left',
  //   action: ['start-building']
  // },
  // about: {
  //   id: 'about',
  //   text: <Trans>About</Trans>,
  //   position: 'right',
  //   children: [
  //     {
  //       id: 'our-vision',
  //       text: <Trans>Our vision</Trans>,
  //       url: '/our-vision'
  //     },
  //     {
  //       id: 'team',
  //       text: <Trans>Our team</Trans>,
  //       url: '/team'
  //     },
  //     // {
  //     //   id: 'studios',
  //     //   text: <Trans>MYRIA STUDIOS</Trans>,
  //     //   url: '/studios'
  //     // },
  //     {
  //       id: 'careers',
  //       text: <Trans>Careers</Trans>,
  //       url: '/careers'
  //     }
  //   ]
  // },
  // community: {
  //   id: 'community',
  //   text: <Trans>Community</Trans>,
  //   position: 'right',
  //   children: [
  //     {
  //       id: 'discord',
  //       text: 'Discord',
  //       url: socialLinks.discord,
  //       target: '_blank',
  //       event: 'Discord Button Clicked'
  //     },
  //     {
  //       id: 'twitter',
  //       text: 'Twitter',
  //       url: socialLinks.twitter,
  //       target: '_blank',
  //       event: 'Twitter Button Clicked'
  //     },
  //     {
  //       id: 'instagram',
  //       text: 'Instagram',
  //       url: socialLinks.instagram,
  //       target: '_blank',
  //       event: 'Instagram Button Clicked'
  //     },
  //     {
  //       id: 'medium',
  //       text: 'Medium',
  //       url: socialLinks.medium,
  //       target: '_blank',
  //       event: 'Medium Button Clicked'
  //     }
  //   ]
  // }
};
