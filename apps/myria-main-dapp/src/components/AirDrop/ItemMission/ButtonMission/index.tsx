import clsx from 'clsx';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import IconButton from 'src/components/icons/IconButton';
import { localStorageKeys } from 'src/configs';
import { ImissionProgress, useAuthenticationContext } from 'src/context/authentication';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { reqCreateTwitterCampaigns } from 'src/services/campaignService';
import { getLinkMission, utilTaskId } from 'src/utils';
import VerifyEmailModal from '../../VerifyEmailModal';

export const STATUS_MISSION = {
  COMPLETED: 'COMPLETED',
  AVAILABLE: 'AVAILABLE',
  LOCKED: 'LOCKED'
};

const DF_STYLE_BUTTON = {
  [STATUS_MISSION.COMPLETED]: {
    FILL: 'url(#paint0_linear_5081_99398)',
    COLOR: '#ACACAC',
    TEXT_COLOR: 'text-[#ACACAC]',
    ID: 'paint0_linear_5081_99398'
  },
  [STATUS_MISSION.AVAILABLE]: {
    FILL: 'url(#paint0_linear_5081_99428)',
    COLOR: '#9ECEAB',
    TEXT_COLOR: 'text-[#9ECEAB]',
    ID: 'paint0_linear_5081_99428'
  },
  [STATUS_MISSION.LOCKED]: {
    FILL: 'url(#paint0_linear_5081_99565)',
    COLOR: '#D55E5E',
    TEXT_COLOR: 'text-[#D55E5E]',
    ID: 'paint0_linear_5081_99565'
  }
};

interface Props {
  status: string;
  item: ImissionProgress;
  id: string;
  enableClick: boolean;
}

const ButtonMission: React.FC<Props> = ({ status, item, id, enableClick }) => {
  const [localStarkKey] = useLocalStorage(localStorageKeys.starkKey, '');
  const [walletAddress] = useLocalStorage(localStorageKeys.walletAddress, '');
  const [userCampaignId] = useLocalStorage(localStorageKeys.userCampaignId, '');

  const [openVerifyEmailModal, setOpenVerifyEmailModal] = useState(false);
  const { userCampaign } = useAuthenticationContext();

  const actionMission = {
    [utilTaskId.verifyEmail]: {
      name: utilTaskId.verifyEmail,
      handler: () => {
        console.log(utilTaskId.verifyEmail);
        setOpenVerifyEmailModal(true);
      }
    },
    [utilTaskId.joinDiscord]: {
      name: utilTaskId.joinDiscord,
      handler: (homePage: string) => {
        console.log(utilTaskId.joinDiscord);
        window.open(getLinkMission(utilTaskId.joinDiscord, homePage), '_blank');
      }
    },
    [utilTaskId.followMyriaTwitter]: {
      name: utilTaskId.followMyriaTwitter,
      handler: (homePage: string) => {
        window.open(getLinkMission(utilTaskId.followMyriaTwitter, homePage), '_blank');
        reqCreateTwitterCampaigns({
          missionCode: item.code,
          walletAddress: walletAddress.toLowerCase()
        }).then((res) => {
          console.log(res);
        });
      }
    },
    [utilTaskId.followBrendanTwitter]: {
      name: utilTaskId.followBrendanTwitter,
      handler: (homePage: string) => {
        window.open(getLinkMission(utilTaskId.followBrendanTwitter, homePage), '_blank');
        reqCreateTwitterCampaigns({
          missionCode: item.code,
          walletAddress: walletAddress.toLowerCase()
        }).then((res) => {
          console.log(res);
        });
      }
    },
    [utilTaskId.inviteFriends]: {
      name: utilTaskId.inviteFriends,
      handler: (homePage?: string) => {
        console.log(utilTaskId.inviteFriends);
        navigator.clipboard.writeText(homePage + '?referCode=' + userCampaignId).then(
          function () {
            toast('Copied!', { type: 'success' });
          },
          function (err) {
            toast(err, { type: 'error' });
          }
        );
      }
    },
    [utilTaskId.dailyLogAndPostDiscord]: {
      name: utilTaskId.dailyLogAndPostDiscord,
      handler: (homePage: string) => {
        console.log(utilTaskId.dailyLogAndPostDiscord);
        let urlLink = utilTaskId.dailyLogAndPostDiscord;
        const joinDiscord = userCampaign?.campaign.missionProgress.filter(
          (item) => item.code === utilTaskId.joinDiscord
        );
        if (joinDiscord?.[0].status !== STATUS_MISSION.COMPLETED) {
          urlLink = utilTaskId.joinDiscord;
        }
        window.open(getLinkMission(urlLink, homePage), '_blank');
      }
    },
    [utilTaskId.sharePostTwitter]: {
      name: utilTaskId.sharePostTwitter,
      handler: (homePage: string) => {
        window.open(getLinkMission(utilTaskId.sharePostTwitter, homePage), '_blank');
        reqCreateTwitterCampaigns({
          missionCode: item.code,
          walletAddress: walletAddress.toLowerCase()
        }).then((res) => {
          console.log(res);
        });
      }
    },
    [utilTaskId.reachLevelDiscord]: {
      name: utilTaskId.reachLevelDiscord,
      handler: (homePage: string) => {
        let urlLink = utilTaskId.reachLevelDiscord;
        const joinDiscord = userCampaign?.campaign.missionProgress.filter(
          (item) => item.code === utilTaskId.joinDiscord
        );
        if (joinDiscord?.[0].status !== STATUS_MISSION.COMPLETED) {
          urlLink = utilTaskId.joinDiscord;
        }
        window.open(getLinkMission(urlLink, homePage), '_blank');
      }
    }
  };

  const handleClick = async () => {
    if (!enableClick) return;
    const homePage = window.location.origin + window.location.pathname;
    actionMission[id].handler(homePage);
  };
  const StyleButton = () => {
    if (id === utilTaskId.verifyEmail) {
      if (status === STATUS_MISSION.COMPLETED) {
        return DF_STYLE_BUTTON[status];
      } else return DF_STYLE_BUTTON[STATUS_MISSION.AVAILABLE];
    } else return DF_STYLE_BUTTON[status];
  };
  return (
    <>
      <div
        className={clsx(
          `group relative inline-block w-52 text-center uppercase leading-[50px] ${
            StyleButton().TEXT_COLOR
          }`,
          enableClick && 'cursor-pointer'
        )}
        onClick={handleClick}>
        {item.missionCampaign.actionTitle}
        <IconButton status={StyleButton()} isActive={enableClick} />
      </div>
      {id === utilTaskId.verifyEmail && status !== STATUS_MISSION.COMPLETED && (
        <VerifyEmailModal
          onClose={() => {
            setOpenVerifyEmailModal(false);
          }}
          open={openVerifyEmailModal}
        />
      )}
    </>
  );
};

export default ButtonMission;
