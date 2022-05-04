import Link from 'next/link';
import { useAuthenticationContext } from 'src/context/authentication';
import { useWalletContext } from 'src/context/wallet';
import truncateString from 'src/helper';
import DashboardIcon from '../icons/DashboardIcon';
import DisconnectIcon from '../icons/DisconnectIcon';
import Popover from '../Popover';

const ProfileMenus = [
  {
    text: 'Inventory',
    href: '/inventory',
    icon: <DashboardIcon />
  }
];

const ProfileComponent = () => {
  const { address, disconnect } = useWalletContext();
  const { user } = useAuthenticationContext();

  if (!user && !address) {
    return null;
  }

  return (
    <Popover modal>
      <Popover.Trigger asChild>
        <div className="flex w-[172px] items-center rounded-lg bg-[#081824] px-6 py-3 hover:cursor-pointer">
          <img src={'/images/header-user.png'} alt={address} className="mr-3" />
          <div>{truncateString(address || '')}</div>
        </div>
      </Popover.Trigger>
      <Popover.Content asChild side="bottom" sideOffset={5}>
        <div className="w-[172px] min-w-[164px] rounded-xl bg-[#091824] px-4 py-6 text-sm text-white">
          {user &&
            ProfileMenus.map((menu) => {
              return (
                <Link href={menu.href} key={menu.href}>
                  <a className="mb-6 flex items-center">
                    {menu.icon}
                    <p className="ml-2">{menu.text}</p>
                  </a>
                </Link>
              );
            })}
          {address && (
            <div className="flex items-center hover:cursor-pointer" onClick={disconnect}>
              <DisconnectIcon />
              <p className="ml-2">Disconnect</p>
            </div>
          )}
        </div>
      </Popover.Content>
    </Popover>
  );
};

export default ProfileComponent;
