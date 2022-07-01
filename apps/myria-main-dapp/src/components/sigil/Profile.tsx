import { Trans } from '@lingui/macro';
import { format } from 'date-fns';
import React from 'react';
import { useAuthenticationContext } from 'src/context/authentication';
import { useGA4 } from 'src/lib/ga';
import { getAllianceInfo } from 'src/utils';
import { Loading } from '../Loading';
import Subtract from './Subtract';

const Profile: React.FC = () => {
  const { event } = useGA4();
  const { user: data } = useAuthenticationContext();
  const allianceInfo = data?.alliance && getAllianceInfo(data.alliance);

  React.useEffect(() => {
    if (data?.alliance && data.wallet_id) {
      event('Sigil Login Completed', {
        campaign: 'Sigil',
        myria_id: data.user_id,
        myria_username: data.user_name || '',
        wallet_address: data.wallet_id,
        alliance_name: data.alliance,
        sigil_alias: data.user_name || '',
        credits: data.credits?.toString() || '',
        date_registered:
          (data.date_registered && new Date(data.date_registered).toISOString()) || ''
      });
    }
  }, [event, data]);
  return (
    <div className="flex h-full flex-col pt-2">
      <div
        style={{
          background: 'linear-gradient(180deg, #081824 17.34%, rgba(8, 24, 36, 0) 68.16%)'
        }}
        className="relative flex-grow rounded-t-[7px] pt-8">
        <div className="opacity-20">
          <div className="absolute top-0 left-0 -translate-y-2 -translate-x-[7px] text-blue">
            <Subtract />
          </div>
          <div className="absolute top-0 left-0 bottom-5 w-[1px] translate-y-4 bg-blue" />
        </div>

        <div className="opacity-20">
          <div className="absolute top-0 right-0 -translate-y-2 translate-x-[7px] text-blue [transform:var(--tw-transform)_rotateY(180deg)]">
            <Subtract />
          </div>
          <div className="absolute top-0 right-0 bottom-5 w-[1px] translate-y-4 bg-blue" />
        </div>
        {!data ? (
          <div className="mt-10 flex justify-center">
            <Loading />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-center text-[24px] font-bold leading-[30px]">
              {data.user_name ?? 'Your Profile'}
            </p>
            <div className="relative mt-[54px] h-[108px] w-[108px] rounded-full bg-[#020508]/20">
              {allianceInfo && (
                <img
                  src={allianceInfo.img}
                  alt=""
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              )}
            </div>
            <p className="mt-9 text-[20px] font-semibold leading-[25px]">{allianceInfo?.name}</p>
            <div className="mt-6 ">
              <p className="text-[14px] font-medium leading-[17px] text-light">
                <Trans>Date Registered</Trans>
              </p>
              <p className="mt-1 text-[18px] font-bold leading-[1.22]">
                {data.date_registered && format(new Date(data.date_registered), 'dd MMM yyyy')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
