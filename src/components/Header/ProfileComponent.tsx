import Link from 'next/link';
import { useAuthenticationContext } from 'src/context/authentication';
import { useWalletContext } from 'src/context/wallet';
import truncateString from 'src/helper';
import DashboardIcon from '../icons/DashboardIcon';
import LinearSettingIcon from '../icons/LinearSettingIcon';
import SignOutIcon from '../icons/SignOutIcon';
import WalletIcon from '../icons/WalletIcon';
import Popover from '../Popover';

const ProfileMenus = [
  {
    text: 'My account',
    href: '/',
    icon: <LinearSettingIcon />
  },
  {
    text: 'Wallet',
    href: '/',
    icon: <WalletIcon />
  },
  {
    text: 'Node Dashboard',
    href: '/',
    icon: <DashboardIcon />
  }
];

const ProfileComponent = () => {
  const { address, disconnect } = useWalletContext();
  const { user } = useAuthenticationContext();

  if (!user && !address) {
    return null;
  }

  if (user) {
    return (
      <Popover modal>
        <Popover.Trigger asChild>
          <div className="flex items-center rounded-3xl bg-[#081824] px-6 py-3 hover:cursor-pointer">
            <img src={'/images/header-user.png'} alt={address} className="mr-3" />
            <div>{truncateString(address || '')}</div>
          </div>
        </Popover.Trigger>
        <Popover.Content asChild side="bottom" sideOffset={5}>
          <div className="min-w-[164px] rounded-xl bg-[#091824] px-4 py-6 text-sm text-white">
            {ProfileMenus.map((menu) => {
              return (
                <Link href={menu.href} key={menu.href}>
                  <a className="mb-6 flex items-center">
                    {menu.icon}
                    <p className="ml-2">{menu.text}</p>
                  </a>
                </Link>
              );
            })}
            <div className="mt-6 flex items-center hover:cursor-pointer">
              <SignOutIcon />
              <p className="ml-2">Sign out</p>
            </div>
          </div>
        </Popover.Content>
      </Popover>
    );
  }

  return (
    <Popover modal>
      <Popover.Trigger asChild>
        <div className="flex items-center rounded-3xl bg-[#081824] px-6 py-3 hover:cursor-pointer">
          <img src={'/images/header-user.png'} alt={address} className="mr-3" />
          <div>{truncateString(address || '')}</div>
        </div>
      </Popover.Trigger>
      <Popover.Content asChild side="bottom" sideOffset={5}>
        <div className="flex items-center rounded-xl bg-[#091824] px-6 py-3 text-white">
          <button onClick={disconnect} className="ml-2">
            Disconnect
          </button>
        </div>
      </Popover.Content>
    </Popover>
  );
};

export default ProfileComponent;
