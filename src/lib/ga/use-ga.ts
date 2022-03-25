import { useRouter } from 'next/router';
import ga from './ga';

type SubPageName = 'For Gamers' | 'For Developers';
type PageName =
  | 'Home'
  | 'Ecosystem'
  | 'Game'
  | 'Nodes'
  | 'Store'
  | 'Our Vision'
  | 'Our Team'
  | 'Myria Studio'
  | 'Career'
  | 'Our Solution'
  | 'Game Detail'
  | 'Unknown';
type ButtonLocation =
  | 'Pop-up'
  | 'Footer'
  | 'Top Bar'
  | 'Top Button'
  | 'Banner'
  | 'Community Links'
  | 'Game';

type EventName = 'Dicord Button Clicked' | 'Twitter Button Clicked';
interface GaAttributes {
  page_title: string;
  page_location: string;
  page_name: PageName;
  subpage_name: SubPageName;
  game_name?: string;
  button_location?: ButtonLocation;
}

interface EventParams
  extends Omit<GaAttributes, 'page_title' | 'page_location' | 'page_name' | 'subpage_name'> {}

const getPageName = (route: string): PageName => {
  switch (route) {
    case '/':
    case '/for-developers':
      return 'Home';
    case '/for-developers/solution':
      return 'Our Solution';
    case '/game-detail/[id]':
      return 'Game Detail';
    case '/ecosystem':
      return 'Ecosystem';
    case '/games':
      return 'Game';
    case '/nodes':
      return 'Nodes';
    case '/store':
      return 'Store';
    case '/our-vision':
      return 'Our Vision';
    case '/team':
      return 'Our Team';
    case '/studios':
      return 'Myria Studio';
    case '/careers':
      return 'Career';
    default:
      return 'Unknown';
  }
};

export const useGA4 = () => {
  const router = useRouter();
  const pageLocation = router.asPath;
  const subPageName: SubPageName = pageLocation.includes('for-developers')
    ? 'For Developers'
    : 'For Gamers';
  const pageName = getPageName(router.route);

  const event = (eventName: EventName, params: EventParams) => {
    if (typeof window !== 'object') return;

    const pageTitle = document.title;
    const gaAttributes: GaAttributes = {
      page_location: pageLocation,
      page_name: pageName,
      page_title: pageTitle,
      subpage_name: subPageName,
      ...params
    };

    ga.eventGA4(eventName, gaAttributes);
  };

  return { event };
};
