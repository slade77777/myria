import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import clsx from 'clsx';
import IconPoint from 'src/components/icons/airdrop-campaign/IconPoint';
import { NFTRewards } from '../NFTRewards';
import { MyVaultComponent } from '../MyVault';
import { useAuthenticationContext } from 'src/context/authentication';
import { Trans } from '@lingui/macro';

export const RightSectionAirDrop: React.FC = () => {
  const { userCampaign } = useAuthenticationContext();

  return (
    <>
      <Tabs.Root defaultValue="NFTTab" className="h-full">
        <div className={clsx('flex justify-between h-[41px] header-tabs')}>
          <Tabs.List className={clsx('flex flex-row')}>
            <Tabs.Trigger
              value="NFTTab"
              className={clsx('border-none pr-6 uppercase font-extrabold opacity-50 textShadow')}>
              REWARDS
            </Tabs.Trigger>
            <Tabs.Trigger
              value="MyVault"
              className={clsx('border-none pr-6 uppercase font-extrabold opacity-50 textShadow')}>
              MY VAULT
            </Tabs.Trigger>
          </Tabs.List>
          <div className={clsx('flex w-[182px] align-center leading-[41px]')}>
            <IconPoint styleClass={clsx('absolute')} />
            <span className={clsx('ml-[31px] text-sm text-[#97AAB5] leading-[41px] uppercase')}>
              {userCampaign && userCampaign?.availablePoints > 1 ? <Trans >Points</Trans> : <Trans>Point</Trans>}
            </span>
            <span className={clsx('ml-[14px] font-extrabold text-xl leading-[41px] text-white textShadow')}>
              {userCampaign?.availablePoints}
            </span>
          </div>
        </div>
        <div className={clsx('pt-6 h-[calc(100%-41px)]')}>
          <Tabs.Content value="NFTTab" className={clsx('h-full')}>
            <NFTRewards />
          </Tabs.Content>
          <Tabs.Content value="MyVault" className={clsx('h-full')}>
            <MyVaultComponent />
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </>
  );
};
