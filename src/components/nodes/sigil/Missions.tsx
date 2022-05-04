import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Loading } from 'src/components/Loading';
import RegisterModal from 'src/components/Register/Modal';
import { socialLinks } from 'src/configs';
import { Mission } from 'src/types/sigil';
import MissionItem from './MissionItem';
import ReferFriendModal from './ReferFriendModal';
import ShareTwitterModal from './ShareTwitterModal';
import { SubtractRight } from './Subtract';

const Missions: React.FC = () => {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openShareTwitterModal, setOpenShareTwitterModal] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);

  const { data: missions } = useQuery<Mission[]>('sigilMissions', async () => {
    const data: Mission[] = [
      {
        mission_id: 'MYRIA_ACCOUNT',
        title: 'Create a Myria Account',
        description: 'Create a Myria Account',
        credits: 5,
        earned_credits: 5,
        repetition_limit: 1,
        repetition_text: null,
        completed: true,
        status: 'completed'
      },
      {
        mission_id: 'JOIN_DISCORD',
        title: 'Join our Discord',
        description: '',
        credits: 5,
        earned_credits: 5,
        repetition_limit: 1,
        repetition_text: null,
        completed: true,
        status: 'completed'
      },
      {
        mission_id: 'SHARE_TWITTER',
        title: 'Share our Twitter post',
        description: '',
        credits: 5,
        earned_credits: 5,
        repetition_limit: 1,
        repetition_text: null,
        completed: true,
        status: 'completed'
      },
      {
        mission_id: 'INVITE_FRIEND',
        title: 'Invite friends',
        description: '',
        credits: 5,
        earned_credits: 0,
        repetition_limit: -1,
        repetition_text: 'Unlimited',
        completed: false,
        status: 'available'
      },
      {
        mission_id: 'DAILY_DISCORD_MESSAGE',
        title: 'Daily login to Discord',
        description: '',
        credits: 5,
        earned_credits: 10,
        repetition_limit: -1,
        repetition_text: 'Daily',
        completed: true,
        status: 'available'
      },
      {
        mission_id: 'FIRST_DISCORD_MESSAGE',
        title: 'Discord introduction',
        description: '',
        credits: 5,
        earned_credits: 0,
        repetition_limit: 1,
        repetition_text: null,
        completed: false,
        status: 'locked'
      },
      {
        mission_id: 'VOTE_ON_LORE_DISCORD',
        title: 'Vote on lore / narrative',
        description: '',
        credits: 5,
        earned_credits: 0,
        repetition_limit: -1,
        repetition_text: 'Unlimited',
        completed: false,
        status: 'locked'
      },
      {
        mission_id: 'SHARE_IDEA_DISCORD',
        title: 'Share idea on Discord',
        description: '',
        credits: 10,
        earned_credits: 0,
        repetition_limit: 1,
        repetition_text: null,
        completed: false,
        status: 'locked'
      },
      {
        mission_id: 'SPACE_LORD_ROLE_DISCORD',
        title: 'Reach lvl 40 on Discord',
        description: '',
        credits: 100,
        earned_credits: 0,
        repetition_limit: 1,
        repetition_text: null,
        completed: false,
        status: 'locked'
      }
    ];

    return data;
  });

  const ActionMap: {
    [key in Mission['mission_id']]?: {
      label: string;
      link?: string;
      onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    };
  } = {
    MYRIA_ACCOUNT: {
      label: 'Sign up',
      onClick: (e) => {
        e.preventDefault();
        setOpenRegisterModal(true);
      }
    },
    JOIN_DISCORD: {
      label: 'Join',
      link: socialLinks.discord
    },
    SHARE_TWITTER: {
      label: 'Join',
      onClick: (e) => {
        e.preventDefault();
        setOpenShareTwitterModal(true);
      }
    },
    INVITE_FRIEND: {
      label: 'Invite',
      onClick: (e) => {
        e.preventDefault();
        setOpenInviteModal(true);
      }
    }
  };

  return (
    <>
      <ShareTwitterModal
        open={openShareTwitterModal}
        onClose={() => setOpenShareTwitterModal(false)}
      />
      <RegisterModal open={openRegisterModal} onClose={() => setOpenRegisterModal(false)} />
      <ReferFriendModal
        open={openInviteModal}
        onClose={() => setOpenInviteModal(false)}
        link="https://myria.com/sigil?code=%112yb877a"
      />
      <div className="relative flex h-full flex-col pr-2">
        <div className="flex items-center">
          <p className="sigil-text mr-4 text-[18px] font-extrabold leading-[1.25]">MISSIONS</p>
          <div className="h-[1px] flex-1 bg-border-blue opacity-20">
            <div className="absolute top-0 right-0 translate-x-[7px] translate-y-[4px]">
              <SubtractRight />
            </div>
            <div className="absolute top-0 right-0 h-full w-[1px] translate-y-4 bg-gradient-to-b from-border-blue to-transparent" />
          </div>
        </div>
        {!missions ? (
          <div className="mt-10 flex justify-center">
            <Loading />
          </div>
        ) : (
          <div className="mt-4 flex-grow space-y-4 overflow-auto" id="scrollbar">
            {missions.map((mission, index) => (
              <MissionItem key={index} item={mission} action={ActionMap[mission.mission_id]} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Missions;
