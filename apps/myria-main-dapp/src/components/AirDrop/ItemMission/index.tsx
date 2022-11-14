import clsx from 'clsx';
import React, { memo, useEffect } from 'react';
import { useRouter } from 'next/router';
import SubtractBottom from 'src/components/icons/SubtractBottom';
import SubtractTop from 'src/components/icons/SubtractTop';
import { useAuthenticationContext } from 'src/context/authentication';
import { campaignCode, REPETION_TYPE, utilTaskId } from 'src/utils';
import ButtonMission, { STATUS_MISSION } from './ButtonMission';
import { ImissionProgress } from 'src/context/authentication';
import { reqRewardClaimDiscord } from 'src/services/campaignService';
import { RewardClaimDiscordPayload } from 'src/types/campaign';
import { errorCode } from 'src/errorCode';
import { toast } from 'react-toastify';
import HistoryIcon from 'src/components/icons/HistoryIcon';
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
    initFunction: async (
      codeJoinDiscord: string,
      userId: number | undefined,
      missionCode: string
    ) => {
      //Call API code Join Discord
      const payloadData: RewardClaimDiscordPayload = {
        userId: userId || undefined,
        discordAccessCode: codeJoinDiscord,
        campaignCode: campaignCode,
        missionCode: missionCode
      };
      const responeClaimDiscord = await reqRewardClaimDiscord(payloadData);
      if (responeClaimDiscord.errors?.[0].code === errorCode.users.discordCode.userExisted) {
        toast('Discord User Existed', { type: 'error' });
      }
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

  const enableClick =
    status === STATUS_MISSION.AVAILABLE ||
    (id === utilTaskId.verifyEmail && status !== STATUS_MISSION.COMPLETED);

  const router = useRouter();

  useEffect(() => {
    const codeJoinDiscord = router.query.code?.toString();
    codeJoinDiscord && initMissionPanel[id].initFunction(codeJoinDiscord, userCampaign?.userId, id);
  }, []);

  return (
    <div
      className={clsx(
        `relative`,
        `${id === utilTaskId.verifyEmail ? 'z-[2]' : 'z-[1]'}`,
        `${enableClick ? 'opacity-100' : 'opacity-30'}`
      )}>
      <div className="absolute -left-1 -bottom-1 z-[-1]">
        <SubtractBottom />
      </div>
      <div className="bg-base/3 border-base/3 flex min-h-[128px] w-full rounded-lg border p-6 pl-8">
        <div className="flex-1">
          <div className="flex items-center uppercase text-white">
            <p className=" mr-2 text-xl font-bold">{item.missionCampaign.title}</p>
            <span className="min-w-[74px] rounded-lg bg-[#0D273A] py-[6px] px-[10px] text-center text-xs font-medium leading-3">
              {item.missionCampaign.point} {item.missionCampaign.point > 1 ? 'POINTS' : 'POINT'}
            </span>
          </div>
          <div className="text-light mt-4  max-w-[65%] text-base">
            <p className="">{item.missionCampaign?.description}</p>
          </div>
        </div>
        <div className="text-center">
          <ButtonMission status={status} item={item} id={id} enableClick={enableClick} />
          {item.earnedPoints > 0 &&
          item.missionCampaign.repetitionType === (REPETION_TYPE.ONCE as string) ? (
            <div className="text-light mt-4 flex items-center justify-center text-xs font-medium ">
              <HistoryIcon className="mr-1" width={20} height={18} />
              <span>{item.earnedPoints} POINTS EARNED</span>
            </div>
          ) : (
            item.missionCampaign.repetitionType !== (REPETION_TYPE.ONCE as string) && (
              <div className="text-light mt-4 flex items-center justify-center text-xs font-medium ">
                <HistoryIcon className="mr-1" width={20} height={18} />
                <span>{item.earnedPoints} POINTS EARNED</span>
              </div>
            )
          )}
        </div>
      </div>
      <div className="absolute -top-1 -right-1 z-[-1]">
        <SubtractTop />
      </div>
    </div>
  );
};

export default memo(ItemMission);
