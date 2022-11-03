import React, { useContext, useEffect, useState } from 'react';
import { campaignApiClient } from 'src/client';
import { campaignCode } from 'src/utils';

interface AirfropCampaign {
    campaignId: string;
}
interface IProps {
    isAirDrop: boolean
}

const AirdropCampaign = React.createContext<AirfropCampaign>({} as AirfropCampaign);
export const CampaignProvider: React.FC<IProps> = ({ children, isAirDrop }) => {
    const [campaignId, setCampaignId] = useState<string>("1")
    useEffect(() => {
        campaignApiClient.get(`/campaigns/code/${encodeURIComponent(campaignCode)}`).then((res) => {
            if (res.data.status === 'success' && res.data.data)
                setCampaignId(res.data.data.id.toString())
        }).catch((error) => {
            console.log(`Server is unavailable with error ${error}`);
        })
    }, [])
    return (
        isAirDrop ? (
            <AirdropCampaign.Provider
                value={{ campaignId }}>
                {children}
            </AirdropCampaign.Provider>) : (
            <>
                {children}
            </>)
    );
};
export const useAirdropCampaign = () => useContext(AirdropCampaign);
