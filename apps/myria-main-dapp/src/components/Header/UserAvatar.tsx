import { Trans } from '@lingui/macro';
import Link from 'next/link';
import React from 'react';
import { useWalletContext } from 'src/context/wallet';
import DropdownMenu from '../DropdownMenu';
import InventoryIcon from '../icons/InventoryIcon';
import LogoutIcon from '../icons/LogoutIcon';

const UserAvatar: React.FC = () => {
  const { address, onConnect, disconnect } = useWalletContext();

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <div className="w-9 h-9 overflow-hidden rounded-full">
          <img width="100%" src={'/images/marketplace/collection-1-logo.png'} alt="" />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        sideOffset={8}
        align="end"
        className="text-base/3 rounded-md bg-current p-8 w-[196px]"
      >
        <DropdownMenu.Arrow className="translate-x-3 fill-current" />
        <div className="text-white">
          <div>
            <div>
              <Link href={'/marketplace/inventory'}>
                <a
                  href={'/marketplace/inventory'}
                  className="body-14-medium flex cursor-pointer items-center space-x-2.5 text-white"
                >
                  <i className="w-4">
                    <InventoryIcon />
                  </i>
                  <span>
                    <Trans>Inventory</Trans>
                  </span>
                </a>
              </Link>
            </div>
            <div className="mt-6">
              <button
                className="body-14-medium flex items-center space-x-2.5 text-white"
                onClick={disconnect}
              >
                <i className="w-4">
                  <LogoutIcon />
                </i>
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};

export default UserAvatar;
