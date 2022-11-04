import React from 'react';
import clsx from 'clsx';
import BorderAirDropThumbnail from 'src/components/icons/airdrop-campaign/BorderAirDropThumbnail';
import Image from 'next/image';
import { useAuthenticationContext } from 'src/context/authentication';
import { FORMAT_DATE_BY_AIRDROP } from 'src/utils';
import moment from 'moment';

const LeftSectionAirDrop: React.FC = () => {
  const { userCampaign } = useAuthenticationContext();

  return (
    <div className={clsx('relative md:max-w-[266px] mx-auto px-4')}>
      <div
        className={clsx(
          'rounded-lg bg-gradient-to-b from-[rgba(8,24,36,0.9)] to-[rgba(8,24,36,0.17)] h-[calc(100vh-100px-8px)]'
        )}>
        <div className={clsx('p-8 text-center')}>
          {!userCampaign?.user.user_name ? (
            <div className={clsx('text-2xl font-bold mb-6')}>Welcome</div>
          ) : (
            <div className={clsx('text-2xl font-bold mb-6')}>{userCampaign.user.user_name}</div>
          )}
          <div className={clsx('flex justify-center')}>
            <Image src="/images/nodes/airdrop/the_federation.png" width={'100%'} height={'100%'} />
          </div>
          <div className={clsx('text-xl font-nomarl mb-6')}>The Federation</div>
          {userCampaign && userCampaign?.user.user_name && (
            <>
              <p className={clsx('text-sm font-medium text-[#97AAB5]')}>Date Registered</p>
              <strong className={clsx('text-lg font-bold mt-1')}>
                {moment(userCampaign?.user.date_registered || Date.now()).format(
                  FORMAT_DATE_BY_AIRDROP
                )}
              </strong>
            </>
          )}
        </div>
      </div>
      <div className={clsx('absolute inset-0 -top-2 left-2')}>
        <BorderAirDropThumbnail />
      </div>
      <div className={clsx('absolute inset-0 -top-2 rotateY right-2')}>
        <BorderAirDropThumbnail />
      </div>
    </div>
  );
};

export default LeftSectionAirDrop;
