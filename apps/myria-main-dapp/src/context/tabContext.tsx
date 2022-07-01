import { t } from '@lingui/macro';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import useLocalStorage from 'src/hooks/useLocalStorage';

type Context = {
  activatingTab: TAB;
  changeTab: (tab: TAB) => void;
};

const TabContext = React.createContext<Context>({} as any);

export function useTabContext() {
  const context = useContext(TabContext);
  return context;
}

export type TAB = 'for-gamer' | 'for-dev';

export const tabRoutes: {
  text: string;
  href: string;
  id: TAB;
  dependentRoutes: string[];
}[] = [
  {
    text: t`FOR GAMERS`,
    href: '/',
    id: 'for-gamer',
    dependentRoutes: ['/', '/ecosystem', '/nodes', '/games', '/game-detail/[id]']
  },
  {
    text: t`FOR DEVELOPERS`,
    href: '/for-developers',
    id: 'for-dev',
    dependentRoutes: ['/for-developers', '/for-developers/solution']
  }
];

const TabProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const [activatingTab, setActivatingTab] = useState<TAB>('for-gamer');

  useEffect(() => {
    let tab = tabRoutes.find((r) => r.dependentRoutes.includes(router.pathname))?.id;
    if (tab !== activatingTab && !!tab) {
      setActivatingTab(tab);
    }
  }, [router.pathname, activatingTab]);

  const value = useMemo(
    () => ({ activatingTab, changeTab: setActivatingTab }),
    [activatingTab, setActivatingTab]
  );

  return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
};

export default TabProvider;
