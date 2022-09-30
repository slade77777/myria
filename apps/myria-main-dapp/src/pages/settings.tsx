import Page from '../components/Page';
import React, { useEffect, useState } from 'react';
import { useAuthenticationContext } from '../context/authentication';
import { useRouter } from 'next/router';
import { useWalletContext } from '../context/wallet';
import * as Tabs from '@radix-ui/react-tabs';
import { headerHeight } from '../components/Header';
import clsx from 'clsx';
import { paddingX } from '../utils';
import ProfileSetting from '../components/setting/ProfileSetting';
import SecuritySetting from '../components/setting/SecuritySetting';
import WalletInformation from '../components/setting/WalletInformation';
import BackIcon from '../components/icons/BackIcon';

const triggerStyle = 'text-grey/9 mr-10 hover:text-primary/6 border-primary/6';

const Settings = () => {
  const { address } = useWalletContext();
  const { user, userProfileQuery } = useAuthenticationContext();
  const [activeTab, setActiveTab] = useState('profile');
  const router = useRouter();
  const { activeFromEmail } = router.query;
  useEffect(() => {
    // validate either wallet is connected
    if (!userProfileQuery.isFetching && !user) {
      router.push('/');
    }
  }, [address, router, user, userProfileQuery.isFetching]);

  useEffect(() => {
    if (activeFromEmail === 'true') {
      setActiveTab('security');
    }
  }, [activeFromEmail]);

  return (
    <Page includeFooter={false}>
      <div
        style={{
          paddingTop: headerHeight,
          backgroundSize: '100% auto'
        }}
        className={clsx(paddingX, 'md:mb-[120px]')}>
        <button onClick={router.back} className="items-center mb-12">
          <div className="flex items-center">
            <BackIcon />
            <span className="ml-2 text-sm font-normal leading-[17px] text-white">Back</span>
          </div>
        </button>
        <Tabs.Root value={activeTab} onValueChange={(val) => setActiveTab(val)}>
          <Tabs.List className="mb-6">
            <Tabs.Trigger value="profile" className={triggerStyle}>
              Profile Settings
            </Tabs.Trigger>
            <Tabs.Trigger value="security" className={triggerStyle}>
              Login & Security
            </Tabs.Trigger>
            <Tabs.Trigger value="wallet" className={triggerStyle}>
              Wallet Information
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="profile">
            <ProfileSetting />
          </Tabs.Content>
          <Tabs.Content value="security">
            <SecuritySetting />
          </Tabs.Content>
          <Tabs.Content value="wallet">
            <WalletInformation />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </Page>
  );
};

export default Settings;
