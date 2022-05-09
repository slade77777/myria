import React from 'react';
import { useQuery } from 'react-query';
import { UserInfo } from 'src/types/sigil';
import { SubtractLeft } from './Subtract';
import { format } from 'date-fns';
import { Loading } from 'src/components/Loading';
import { useGA4 } from 'src/lib/ga';
import http from 'src/client';

const AllianceInfo: React.FC = () => {
  const { event } = useGA4();
  const { data } = useQuery<UserInfo>('sigilUserInfo', async () => {
    const res = await http.get<{ data: UserInfo }>('/v1/sigil/users/profile');
    return res.data.data;
  });

  React.useEffect(() => {
    if (data?.alliance) {
      // TODO mock event
      event('Sigil Login Completed', {
        campaign: 'Sigil',
        myria_id: undefined,
        myria_username: '_mock',
        wallet_address: '_mock',
        alliance_name: data.alliance,
        sigil_alias: data.alias,
        credits: data.credits.toString(),
        date_registered: new Date(data.date_registered).toISOString()
      });
    }
  }, [event, data]);

  return (
    <div className="relative flex h-full flex-col">
      <div className="flex items-center">
        <div className="h-[1px] flex-1 bg-border-blue opacity-20">
          <div className="absolute top-0 left-0 translate-x-[-7px] translate-y-[4px]">
            <SubtractLeft />
          </div>
          <div className="absolute top-0 left-0 h-full w-[1px] translate-y-4 bg-gradient-to-b from-border-blue to-transparent" />
        </div>
        <p className="sigil-text ml-4 text-[18px] font-extrabold leading-[1.25]">PROFILE</p>
      </div>
      {!data ? (
        <div className="mt-10 flex justify-center">
          <Loading />
        </div>
      ) : (
        <div className="flex-grow overflow-auto">
          <div className="flex h-[441px] flex-col items-center px-4 pt-[47px] pb-[30px] text-center">
            <div className="relative">
              <div className="relative h-[108px] w-[108px] rounded-full border border-[#A077DE] bg-[#A077DE]/50 opacity-50 shadow-[0px_0px_30px_#A077DE]"></div>
              <img
                src="/images/nodes/sigil/alliance-1.png"
                alt=""
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </div>
            <p className="mt-9 text-[20px] font-medium leading-[1.5]">{data.alliance}</p>
            <div className="mt-6 ">
              <p className="text-[14px] font-medium leading-[17px] text-light">Alias</p>
              <p className="mt-1 text-[18px] font-bold leading-[1.22]">{data.alias}</p>
            </div>
            <div className="mt-6 ">
              <p className="text-[14px] font-medium leading-[17px] text-light">Credits</p>
              <p className="mt-1 text-[18px] font-bold leading-[1.22]">{data.credits}</p>
            </div>
            <div className="mt-6 ">
              <p className="text-[14px] font-medium leading-[17px] text-light">Date Registered</p>
              <p className="mt-1 text-[18px] font-bold leading-[1.22]">
                {format(new Date(data.date_registered), 'dd MMM yyyy')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllianceInfo;
