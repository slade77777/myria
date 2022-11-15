import React, { useContext, useEffect, useState } from 'react';
import { campaignApiClient } from 'src/client';
import { campaignCode, FORMAT_DATE_BY_AIRDROP } from 'src/utils';

interface AirfropCampaign {
  campaignId: string;
  startDateCampaign: string;
  endDateCampaign: string;
}
interface IProps {
  isAirDrop: boolean;
}

const AirdropCampaign = React.createContext<AirfropCampaign>({} as AirfropCampaign);
export const CampaignProvider: React.FC<IProps> = ({ children, isAirDrop }) => {
  const [dataCampaign, setDataCampaign] = useState<AirfropCampaign>({
    campaignId: '1',
    startDateCampaign: '',
    endDateCampaign: ''
  });

  useEffect(() => {
    campaignApiClient
      .get(`/campaigns/code/${encodeURIComponent(campaignCode)}`)
      .then((res) => {
        const resDataCampaign: AirfropCampaign = {
          campaignId: res.data.data.id.toString(),
          startDateCampaign: res.data.data.startedAt,
          endDateCampaign: res.data.data.endedAt
        };
        if (res.data.status === 'success' && res.data.data) {
          setDataCampaign((prevState) => ({
            ...prevState,
            ...resDataCampaign
          }));
        }
      })
      .catch((error) => {
        console.log(`Server is unavailable with error ${error}`);
      });
  }, []);
  return isAirDrop ? (
    <AirdropCampaign.Provider
      value={{
        ...dataCampaign
      }}>
      {children}
    </AirdropCampaign.Provider>
  ) : (
    <>{children}</>
  );
};
export const useAirdropCampaign = () => useContext(AirdropCampaign);
