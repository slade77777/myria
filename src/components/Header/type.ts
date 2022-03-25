import { ReactNode } from 'react';

export type Action = 'login' | 'join-discord' | 'start-building' | 'auto';

export type NavItem = {
  id: string;
  text: ReactNode;
  url?: string;
  target?: '_blank';
  children?: Omit<NavItem, 'position' | 'id'>[];
  inactive?: boolean;
  position: 'left' | 'right';
  action?: Action;
};
