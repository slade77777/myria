import { ReactNode } from 'react';

export type Action = 'login' | 'join-discord' | 'start-building' | 'mint' | 'auto';

export type NavItem = {
  text: ReactNode;
  url?: string;
  target?: '_blank';
  children?: Omit<NavItem, 'position'>[];
  inactive?: boolean;
  position: 'left' | 'right';
  action?: Action[];
};
