import React, { useState } from 'react';
import RegisterModal from 'src/components/Register/Modal';
import { socialLinks } from 'src/configs';
import MissionItem, { Mission } from './MissionItem';
import ReferFriendModal from './ReferFriendModal';
import ShareTwitterModal from './ShareTwitterModal';

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
      <div className="sigil-panel p-4 pt-6">
        <p className="text-[24px] font-bold leading-[1.2]">Missions</p>
        <div className="mt-8 space-y-4">
          {missions.map((mission, index) => (
            <MissionItem key={index} {...mission} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Missions;
