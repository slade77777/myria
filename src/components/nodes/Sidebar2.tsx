import { Trans } from '@lingui/macro';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import DropdownMenu from '../DropdownMenu';
import ChevronDownIcon from '../icons/ChevronDownIcon';

const menus = [
  {
    label: <Trans>Dashboard</Trans>,
    path: '/nodes/dashboard'
  },
  {
    label: <Trans>Reward Vault</Trans>,
    path: '/nodes/rewards'
  },
  {
    label: <Trans>Mint Assets</Trans>,
    path: '/nodes/mint-assets'
  },
  {
    label: <Trans>Transaction List</Trans>,
    path: '/nodes/transactions'
  },
  {
    label: <Trans>More coming soon!</Trans>,
    path: '/nodes/dashboard'
  }
];
const Sidebar: React.FC = () => {
  const router = useRouter();
  const active = menus.findIndex((menu) => menu.path === router.route);

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
            <Link href={menu.path} key={idx}>
              <a
                className={clsx(
                  'body-sm rounded-lg px-6 py-4 text-left text-light hover:text-white',
                  {
                    ' bg-brand-dark-blue font-bold leading-[0.89] !text-white': active === idx
                  }
                )}>
                {menu.label}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
