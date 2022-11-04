import clsx from 'clsx';
import React, { useState } from 'react';
import { TwitterShareButton } from 'react-share';
import { toast } from 'react-toastify';
import IconButton, { objectButton } from 'src/components/icons/IconButton';
import { localStorageKeys } from 'src/configs';
import { ImissionProgress } from 'src/context/authentication';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { reqCreateTwitterCampaigns } from 'src/services/campaignService';
import { getLinkMission, utilTaskId } from 'src/utils';
import VerifyEmailModal from '../../VerifyEmailModal';

export const STATUS_MISSTION = {
  COMPLETE: 'COMPLETE',
  ACTIVE: 'ACTIVE',
  LOCKED: 'LOCKED'
};

const DF_STYLE_BUTTON = {
  [STATUS_MISSTION.COMPLETE]: {
    FILL: 'url(#paint0_linear_5081_99398)',
    COLOR: '#ACACAC',
    TEXT_COLOR: 'text-[#ACACAC]',
    ID: 'paint0_linear_5081_99398'
  },
  [STATUS_MISSTION.ACTIVE]: {
    FILL: 'url(#paint0_linear_5081_99428)',
    COLOR: '#9ECEAB',
    TEXT_COLOR: 'text-[#9ECEAB]',
    ID: 'paint0_linear_5081_99428'
  },
  [STATUS_MISSTION.LOCKED]: {
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

  const [openVerifyEmailModal, setOpenVerifyEmailModal] = useState(false);

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
        console.log(utilTaskId.followMyriaTwitter);
        window.open(getLinkMission(utilTaskId.joinDiscord, homePage), '_blank');
      }
    },
    [utilTaskId.followBrendanTwitter]: {
      name: utilTaskId.followBrendanTwitter,
      handler: (homePage: string) => {
        console.log(utilTaskId.followBrendanTwitter);
        window.open(getLinkMission(utilTaskId.joinDiscord, homePage), '_blank');
      }
    },
    [utilTaskId.inviteFriends]: {
      name: utilTaskId.inviteFriends,
      handler: (homePage?: string) => {
        console.log(utilTaskId.inviteFriends);
        navigator.clipboard.writeText(homePage + '?referCode=0x' + localStarkKey).then(
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
      handler: () => {
        console.log(utilTaskId.dailyLogAndPostDiscord);
      }
    },
    [utilTaskId.sharePostTwitter]: {
      name: utilTaskId.sharePostTwitter,
      handler: async () => {}
    },
    [utilTaskId.reachLevelDiscord]: {
      name: utilTaskId.reachLevelDiscord,
      handler: (homePage: string) => {
        console.log(utilTaskId.reachLevelDiscord);
        window.open(getLinkMission(utilTaskId.joinDiscord, homePage), '_blank');
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
      if (status === STATUS_MISSTION.COMPLETE) {
        return DF_STYLE_BUTTON[status];
      } else return DF_STYLE_BUTTON[STATUS_MISSTION.ACTIVE];
    } else return DF_STYLE_BUTTON[status];
  };
  return (
    <>
      <div
        className={clsx(
          `group relative inline-block w-52 text-center leading-[50px] ${StyleButton()}`,
          enableClick && 'cursor-pointer'
        )}
        onClick={handleClick}>
        {item.missionCampaign.actionTitle}
        <IconButton status={StyleButton()} isActive={enableClick} />
      </div>
      {id === utilTaskId.verifyEmail && (
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
