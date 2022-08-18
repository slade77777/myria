import { Trans } from '@lingui/macro';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { UseMutationResult } from 'react-query';
import { useSelector } from 'react-redux';
import { localStorageKeys } from 'src/configs';
import { User } from 'src/context/authentication';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { RootState } from 'src/packages/l2-wallet/src/app/store';
import DropdownMenu from '../DropdownMenu';
import InventoryIcon from '../icons/InventoryIcon';

interface IProps {
  items: {
    loginByWalletMutation: UseMutationResult<User, unknown, void, unknown>;
    walletAddress: string;
    showConnectedWallet: boolean;
    localStarkKey: string;
  };
}

const UserAvatar: React.FC<IProps> = ({ items }) => {
  const { loginByWalletMutation, showConnectedWallet, walletAddress, localStarkKey } = items;
  const isLogin =
    !loginByWalletMutation.isError && walletAddress && showConnectedWallet && localStarkKey;

  const avatar = '/images/marketplace/user.png';

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger disabled={!isLogin}>
        <div className="ml-6 h-9 w-9 overflow-hidden rounded-full">
          <Image width={100} height={100} src={avatar} alt="" />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        aria-disabled
        sideOffset={8}
        align="end"
        className="text-base/3 w-[196px] rounded-md border border-white border-opacity-10 bg-current p-8 shadow-[0_0_40px_40px_rgba(0,0,0,0.3)]">
        <DropdownMenu.Arrow className="translate-x-3 fill-current" />
        <DropdownMenu.Item asChild>
          <div className="text-white">
            <div>
              <div>
                <Link href={'/marketplace/inventory'}>
                  <a
                    href={'/marketplace/inventory'}
                    className="body-14-medium flex cursor-pointer items-center space-x-2.5 text-white">
                    <i className="w-4">
                      <InventoryIcon />
                    </i>
                    <span>
                      <Trans>Inventory</Trans>
                    </span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
};

export default UserAvatar;
