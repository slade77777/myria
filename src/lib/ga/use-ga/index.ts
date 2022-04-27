import { useRouter } from 'next/router';
import ga from '../ga';
import { BasedParams, EventDefined, PageName, SubPageName } from './event';

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

  const event = <
    EventName extends keyof EventDefined,
    RequiredParams extends EventDefined[EventName],
    Params extends Omit<RequiredParams, keyof BasedParams>
  >(
    eventName: EventName,
    params: Params
  ) => {
    if (typeof window !== 'object') return;

    const pageTitle = document.title;
    const gaAttributes: BasedParams & Params = {
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
