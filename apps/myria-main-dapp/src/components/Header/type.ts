import { ReactNode } from 'react';

export type Action = 'login' | 'join-discord' | 'start-building' | 'mint' | 'auto';

export type NavItem = {
  id: string;
  text: ReactNode;
  url?: string;
  target?: '_blank';
  children?: Omit<NavItem, 'position'>[];
  inactive?: boolean;
  position: 'left' | 'right';
  action?: Action[];
  event?: string;
  icon?: ReactNode;
};
