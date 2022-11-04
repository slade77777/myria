import clsx from 'clsx';
import React, { memo, useEffect } from 'react';
import { useRouter } from 'next/router';
import SubtractBottom from 'src/components/icons/SubtractBottom';
import SubtractTop from 'src/components/icons/SubtractTop';
import { useAuthenticationContext } from 'src/context/authentication'
import { campaignCode, utilTaskId } from 'src/utils';
import ButtonMission, { STATUS_MISSTION } from './ButtonMission';
import { ImissionProgress } from 'src/context/authentication'
import { reqRewardClaimDiscord } from 'src/services/campaignService';
import { RewardClaimDiscordPayload } from 'src/types/campaign';
interface IProp {
  status: string;
  item: ImissionProgress;
  id: string;
}

const initMissionPanel = {
  [utilTaskId.verifyEmail]: {
    name: utilTaskId.verifyEmail,
    initFunction: () => {}
  },
  [utilTaskId.joinDiscord]: {
    name: utilTaskId.joinDiscord,
    initFunction: async (codeJoinDiscord: string, userId: number | undefined, missionCode: string) => {
      //Call API code Join Discord
      console.log("Call API code Join Discord", codeJoinDiscord);
      const payloadData: RewardClaimDiscordPayload = {
        userId: userId || undefined,
        discordAccessCode: codeJoinDiscord,
        campaignCode: campaignCode,
        missionCode: missionCode,
      }
      await reqRewardClaimDiscord(payloadData)
    }
  },
  [utilTaskId.followMyriaTwitter]: {
    name: utilTaskId.followMyriaTwitter,
    initFunction: (homePage: string) => {}
  },
  [utilTaskId.followBrendanTwitter]: {
    name: utilTaskId.followBrendanTwitter,
    initFunction: (homePage: string) => {}
  },
  [utilTaskId.inviteFriends]: {
    name: utilTaskId.inviteFriends,
    initFunction: (homePage?: string) => {}
  },
  [utilTaskId.dailyLogAndPostDiscord]: {
    name: utilTaskId.dailyLogAndPostDiscord,
    initFunction: () => {}
  },
  [utilTaskId.sharePostTwitter]: {
    name: utilTaskId.sharePostTwitter,
    initFunction: async () => {}
  },
  [utilTaskId.reachLevelDiscord]: {
    name: utilTaskId.reachLevelDiscord,
    initFunction: (homePage: string) => {}
  }
};

const ItemMission: React.FC<IProp> = ({ status, item, id }) => {
  const { userCampaign } = useAuthenticationContext();

  const isLocked = status === STATUS_MISSTION.LOCKED && (id !== utilTaskId.verifyEmail);
  const enableClick = status === STATUS_MISSTION.ACTIVE || (id === utilTaskId.verifyEmail);

  const router = useRouter();

  useEffect(() => {
    const codeJoinDiscord = router.query.code?.toString();
    codeJoinDiscord && initMissionPanel[id].initFunction(codeJoinDiscord, userCampaign?.userId, id)
  }, [])


  return (
    <div
      className={clsx(
        `relative`,
        `${id === utilTaskId.verifyEmail ? 'z-[2]' : 'z-[1]'}`,
        `${isLocked ? 'opacity-50' : 'opacity-100'}`
      )}>
      <div className="absolute -left-1 -bottom-1 z-[-1]">
        <SubtractBottom />
      </div>
      <div className="bg-base/3 border-base/3 flex min-h-[128px] w-full justify-between rounded-lg border p-6 pl-8">
        <div>
          <div className="flex items-center uppercase text-white">
            <p className=" mr-2 text-xl font-bold">{item.missionCampaign.title}</p>
            <span className="min-w-[74px] rounded-lg bg-[#0D273A] py-[6px] px-[10px] text-center text-xs font-medium leading-3">
              {item.missionCampaign.point} {item.missionCampaign.point > 1 ? 'POINTS' : 'POINT'}
            </span>
          </div>
          <div className="text-light mt-4 max-w-[65%] text-base">
            <span>{item.missionCampaign.description}</span>
          </div>
        </div>
        <div className="text-center">
          <ButtonMission status={status} item={item} id={id} enableClick={enableClick} />
          <p className="text-light mt-4 text-xs font-medium">
            {item.missionCampaign.point} POINTS EARNED
          </p>
        </div>
      </div>
      <div className="absolute -top-1 -right-1 z-[-1]">
        <SubtractTop />
      </div>
    </div>
  );
};

export default memo(ItemMission);
