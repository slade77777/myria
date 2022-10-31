import clsx from 'clsx';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import IconButton from 'src/components/icons/IconButton';
import { localStorageKeys } from 'src/configs';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { getLinkMission, utilTaskId } from 'src/utils';
import { Item } from '../../ItemMission';
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
  item: Item;
  id: string;
  enableClick: boolean;
}

const ButtonMission: React.FC<Props> = ({ status, item, id, enableClick }) => {
  const [localStarkKey] = useLocalStorage(localStorageKeys.starkKey, '');

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
        window.open(getLinkMission(utilTaskId.joinDiscord, homePage),'_blank');
      }
    },
    [utilTaskId.followMyriaTwitter]: {
      name: utilTaskId.followMyriaTwitter,
      handler: (homePage: string) => {
        console.log(utilTaskId.followMyriaTwitter);
        window.open(getLinkMission(utilTaskId.joinDiscord, homePage),'_blank');
      }
    },
    [utilTaskId.followBrendanTwitter]: {
      name: utilTaskId.followBrendanTwitter,
      handler: (homePage: string) => {
        console.log(utilTaskId.followBrendanTwitter);
        window.open(getLinkMission(utilTaskId.joinDiscord, homePage),'_blank');

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
      handler: async () => {
        console.log(utilTaskId.sharePostTwitter);
      }
    },
    [utilTaskId.reachLevelDiscord]: {
      name: utilTaskId.reachLevelDiscord,
      handler: (homePage: string) => {
        console.log(utilTaskId.reachLevelDiscord);
        window.open(getLinkMission(utilTaskId.joinDiscord, homePage),'_blank');
      }
    }
  };

  const handleClick = async () => {
    if (!enableClick) return;
    const homePage = window.location.origin + window.location.pathname;
    actionMission[id].handler(homePage);
  };

  return (
    <>
      <div
        className={clsx(
          `group relative inline-block w-52 text-center leading-[50px] ${DF_STYLE_BUTTON[status].TEXT_COLOR}`,
          enableClick && 'cursor-pointer'
        )}
        onClick={handleClick}>
        {item.lableButton}
        <IconButton status={DF_STYLE_BUTTON[status]} isActive={enableClick} />
      </div>
      {id === 'VERIFY YOUR EMAIL ADDRESS' && (
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
