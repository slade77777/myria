import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import DropdownMenu from '../DropdownMenu';
import ChevronDownIcon from '../icons/ChevronDownIcon';

const menus = [
  {
    label: 'Dashboard',
    path: '/nodes/dashboard'
  },
  {
    label: 'Reward Vault',
    path: '/nodes/dashboard'
  },
  {
    label: 'Transaction List',
    path: '/nodes/dashboard'
  },
  {
    label: 'More coming soon!',
    path: '/nodes/dashboard'
  }
];
const Sidebar: React.FC = () => {
  const active = 0;
  return (
    <div>
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <button className="body-sm flex w-full items-center justify-between rounded-lg bg-brand-dark-blue px-6 py-4 font-bold focus:outline-none">
              <span>{menus[active].label}</span>
              <span className="w-6 text-white">
                <ChevronDownIcon />
              </span>
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content asChild side="bottom" sideOffset={16} loop>
            <div className="flex w-full flex-col rounded-lg bg-brand-dark-blue">
              {menus.map((menu, idx) => (
                <DropdownMenu.Item key={idx}>
                  <Link href={menu.path}>
                    <a
                      className={clsx(
                        'body-sm flex rounded-lg px-6 py-4 text-left text-light focus:outline-none',
                        {
                          'font-bold !text-white': active === idx
                        }
                      )}>
                      {menu.label}
                    </a>
                  </Link>
                </DropdownMenu.Item>
              ))}
            </div>
          </DropdownMenu.Content>
        </DropdownMenu>
      </div>
      <div className="hidden flex-col md:flex">
        {menus.map((menu, idx) => {
          return (
            <button
              key={idx}
              className={clsx('body-sm rounded-lg px-6 py-4 text-left text-light', {
                ' bg-brand-dark-blue font-bold leading-[0.89] !text-white': active === idx
              })}>
              {menu.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
