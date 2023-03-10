import React, { useEffect } from 'react';
import ItemMission from '../../ItemMission';
import { useVerifyEmail } from './useVerifyEmail';
import { useAuthenticationContext } from 'src/context/authentication';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { localStorageKeys } from 'src/configs';
import IconMessageQuestion from 'src/components/icons/airdrop-campaign/IconMessageQuestion';
import { Trans } from '@lingui/macro';

const MISSION_CODE = 'VERIFY_EMAIL';

export const MissionReward = () => {
  const [userCampaignId] = useLocalStorage(localStorageKeys.userCampaignId, '');

  const { mutate: updateVerifyEmail } = useVerifyEmail({
    missionCode: MISSION_CODE,
    options: {}
  });

  useEffect(() => {
    if (userCampaignId) {
      updateVerifyEmail();
    }
  }, [userCampaignId, updateVerifyEmail]);

  const { userCampaign } = useAuthenticationContext();

  return (
    <>
      <div className="h-full pr-3">
        <div className="mb-6 mt-8 flex items-center">
          <span className="text-light">
            <Trans>Complete the missions below to unlock your rewards</Trans>
          </span>
          {/* <IconMessageQuestion styleClass="ml-4 mr-3" />
          <span className="text-primary/6">
            <Trans>How it works</Trans>
          </span> */}
        </div>
        <div className="h-[calc(100%-24px-32px)] overflow-auto pl-1 pt-1">
          <div className="grid grid-cols-1 gap-y-6 pr-4">
            {userCampaign &&
              userCampaign.campaign.missionProgress
                .sort((missionA, missionB) =>
                  missionA.missionCampaign?.order > missionB.missionCampaign?.order ? 1 : -1
                )
                .map((item, index) => {
                  return (
                    <ItemMission
                      status={item.status}
                      item={item}
                      key={index}
                      id={item.missionCampaign.code}
                    />
                  ); //id = taskId from API
                })}
          </div>
        </div>
      </div>
    </>
  );
};
