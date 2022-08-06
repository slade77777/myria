import { Trans } from '@lingui/macro';
import { useAuthenticationContext } from 'src/context/authentication';
import { useWalletContext } from 'src/context/wallet';
import truncateString from 'src/helper';
import DashboardIcon from '../icons/DashboardIcon';
import DisconnectIcon from '../icons/DisconnectIcon';
import Popover from '../Popover';
import Tooltip from 'src/components/Tooltip';
import clsx from 'clsx';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import { useL2WalletContext } from 'src/context/l2-wallet';

const ProfileMenus = [
  {
    text: <Trans>Inventory</Trans>,
    href: '/inventory',
    icon: <DashboardIcon />
  }
];

type Props = {
  className?: string;
  contentClassName?: string;
  showArrow?: boolean;
};

const ProfileComponent = ({ className, contentClassName, showArrow }: Props) => {
  const { disconnect } = useWalletContext();
  const { disconnectL2Wallet } = useL2WalletContext();
  const { user, logout } = useAuthenticationContext();
  const walletId = user?.wallet_id;

  const onDisconnect = () => {
    disconnect();
    disconnectL2Wallet();
    logout();
  };

  if (!walletId) {
    return null;
  }

  return (
    <Popover modal>
      <Popover.Trigger asChild>
        <div
          className={clsx(
            'flex w-[172px] items-center rounded-lg bg-[#081824] px-6 py-3 hover:cursor-pointer',
            className
          )}>
          <img src={'/images/header-user.png'} alt={walletId} className="mr-3" />
          <div>{truncateString(walletId)}</div>
          {showArrow && (
            <i className="ml-2 w-6">
              <ChevronDownIcon />
            </i>
          )}
        </div>
      </Popover.Trigger>
      <Popover.Content asChild side="bottom" sideOffset={5}>
        <div
          className={clsx(
            'w-[172px] min-w-[164px] rounded-xl bg-[#091824] px-4 py-6 text-sm text-white',
            contentClassName
          )}>
          {/* {user &&
            ProfileMenus.map((menu) => {
              return (
                <Link href={menu.href} key={menu.href}>
                  <a className="mb-6 flex items-center">
                    {menu.icon}
                    <p className="ml-2">{menu.text}</p>
                  </a>
                </Link>
              );
            })} */}
          <div className="flex items-center hover:cursor-pointer" onClick={onDisconnect}>
            <DisconnectIcon />
            <Tooltip>
              <Tooltip.Trigger className="focus:outline-none">
                <p className="ml-2">
                  <Trans>Log out</Trans>
                </p>
              </Tooltip.Trigger>
              <Tooltip.Content className="max-w-[256px]">
                <Tooltip.Arrow />
                <p>
                  <Trans>
                    Logout of your Myria account. Your progress will be accessible in future by
                    logging into your Myria account via your wallet.
                  </Trans>
                </p>
              </Tooltip.Content>
            </Tooltip>
          </div>
        </div>
      </Popover.Content>
    </Popover>
  );
};

export default ProfileComponent;
