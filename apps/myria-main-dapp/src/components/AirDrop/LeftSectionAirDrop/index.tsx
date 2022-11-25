import React, { useMemo } from 'react';
import clsx from 'clsx';
import BorderAirDropThumbnail from 'src/components/icons/airdrop-campaign/BorderAirDropThumbnail';
import Image from 'next/image';
import { useAuthenticationContext } from 'src/context/authentication';
import { FORMAT_DATE_BY_AIRDROP } from 'src/utils';
import moment from 'moment';
import { useAlliances } from '../ChooseAlliance/useAlliances';

const ALLIANCE_CODE_IMAGE_MAP = {
  federation: '/images/nodes/insignia/alliance_sigilA.png',
  equinox: '/images/nodes/insignia/alliance_sigilC.png',
  vector_prime: '/images/nodes/insignia/alliance_sigilB.png'
};

const LeftSectionAirDrop: React.FC = () => {
  const { userCampaign, account } = useAuthenticationContext();
  const { data: aliances } = useAlliances();

  const aliance = useMemo(() => {
    return aliances?.find((aliance) => aliance?.id === userCampaign?.user?.allianceId);
  }, [userCampaign?.user?.allianceId, aliances]);

  return (
    <div className={clsx('relative mx-auto px-4 md:max-w-[266px]')}>
      <div
        className={clsx(
          'h-[calc(100vh-100px-8px)] rounded-lg bg-gradient-to-b from-[rgba(8,24,36,0.9)] to-[rgba(8,24,36,0.17)]'
        )}>
        <div className={clsx('p-8 text-center')}>
          {!account?.username ? (
            <div className={clsx('mb-6 text-2xl font-bold')}>Welcome</div>
          ) : (
            <div className={clsx('mb-6 text-2xl font-bold')}>{account?.username}</div>
          )}
          <div className={clsx('flex justify-center')}>
            <Image
              src={ALLIANCE_CODE_IMAGE_MAP[aliance?.code || 'federation']}
              width="150%"
              height="195px"
              alt=""
              layout="intrinsic"
            />
          </div>
          <div className={clsx('font-nomarl mb-6 text-xl')}>{aliance?.name}</div>
          {userCampaign && (
            <>
              <p className={clsx('text-sm font-medium text-[#97AAB5]')}>Date Registered</p>
              <strong className={clsx('mt-1 text-lg font-bold')}>
                {moment(userCampaign?.createdAt || Date.now()).format(FORMAT_DATE_BY_AIRDROP)}
              </strong>
            </>
          )}
        </div>
      </div>
      <div className={clsx('absolute inset-0 -top-2 left-2')}>
        <BorderAirDropThumbnail />
      </div>
      <div className={clsx('rotateY absolute inset-0 -top-2 right-2')}>
        <BorderAirDropThumbnail />
      </div>
    </div>
  );
};

export default LeftSectionAirDrop;
