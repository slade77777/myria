import React, { useState } from 'react';
import RegisterModal from 'src/components/Register/Modal';
import { socialLinks } from 'src/configs';
import MissionItem, { Mission } from './MissionItem';
import ReferFriendModal from './ReferFriendModal';
import ShareTwitterModal from './ShareTwitterModal';
import { SubtractRight } from './Subtract';

const Missions: React.FC = () => {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openShareTwitterModal, setOpenShareTwitterModal] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const missions: Mission[] = [
    {
      title: 'Create a Myria Account',
      description: 'Earn 5 Credits',
      score: 10,
      state: 'active',
      action: {
        label: 'Signup',
        link: 'https://myria.io/signup',
        onClick: (e) => {
          e.preventDefault();
          setOpenRegisterModal(true);
        }
      }
    },
    {
      title: 'Join our Discord',
      description: 'Earn 5 Credits',
      score: 10,
      state: 'active',
      action: {
        label: 'Join',
        link: socialLinks.discord
      }
    },
    {
      title: 'Share our Twitter post',
      description: 'Earn 10 Credits',
      score: 10,
      state: 'active',
      action: {
        label: 'Join',
        link: 'https://myria.io/signup',
        onClick: (e) => {
          e.preventDefault();
          setOpenShareTwitterModal(true);
        }
      }
    },
    {
      title: 'Invite friends',
      description: 'Earn 5 Credits',
      score: 10,
      state: 'active',
      action: {
        label: 'Invite',
        link: 'https://myria.io/signup',
        onClick: (e) => {
          e.preventDefault();
          setOpenInviteModal(true);
        }
      }
    },
    {
      title: 'Create a Myria Account',
      description: 'Earn 5 Credits',
      score: 10,
      state: 'locked',
      repeatable: true
    },
    {
      title: 'Create a Myria Account',
      description: 'Earn 5 Credits',
      score: 10,
      state: 'locked',
      repeatable: true
    },
    {
      title: 'Create a Myria Account',
      description: 'Earn 5 Credits',
      score: 10,
      state: 'locked',
      repeatable: true
    }
  ];

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
        link="https://myria.com/r/%112yb877a"
      />
      <div className="relative flex h-full flex-col pr-8">
        <div className="flex items-center">
          <p className="sigil-text mr-4 text-[18px] font-extrabold leading-[1.25]">REWARDS</p>
          <div className="h-[1px] flex-1 bg-border-blue opacity-20">
            <div className="absolute top-0 right-0 translate-x-[7px] translate-y-[4px]">
              <SubtractRight />
            </div>
            <div className="absolute top-0 right-0 h-full w-[1px] translate-y-4 bg-gradient-to-b from-border-blue to-transparent" />
          </div>
        </div>
        <div className="mt-4 flex-grow space-y-4 overflow-auto">
          {missions.map((mission, index) => (
            <MissionItem key={index} {...mission} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Missions;
