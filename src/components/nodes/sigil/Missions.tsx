import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Loading } from 'src/components/Loading';
import RegisterModal from 'src/components/Register/Modal';
import { socialLinks } from 'src/configs';
import { useGA4 } from 'src/lib/ga';
import http from 'src/client';
import { Mission } from 'src/types/sigil';
import MissionItem from './MissionItem';
import ReferFriendModal from './ReferFriendModal';
import ShareTwitterModal from './ShareTwitterModal';
import { SubtractRight } from './Subtract';

const Missions: React.FC = () => {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openShareTwitterModal, setOpenShareTwitterModal] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const { event } = useGA4();

  const { data: missions } = useQuery<Mission[]>('sigilMissions', async () => {
    const res = await http.get<{
      data: {
        [k: string]: Mission;
      };
    }>('sigil/users/missions');

    return Object.keys(res.data.data).map((k) => res.data.data[k]);
  });

  const TrackingMap: { [key in Mission['mission_id']]?: () => void } = {
    // TODO mock event
    MYRIA_ACCOUNT: () =>
      event('Sigil Discord Button Clicked', {
        campaign: 'Sigil',
        wallet_address: '_mock',
        myria_username: '_mock',
        user_email: '_mock'
      }),
    // TODO mock event
    JOIN_DISCORD: () =>
      event('Sigil Discord Button Clicked', {
        campaign: 'Sigil',
        wallet_address: '_mock',
        myria_username: '_mock',
        user_email: '_mock'
      })
  };

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
      link: process.env.DISCORD_MISSION_URL || socialLinks.discord
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
      link: 'https://myria.io/signup',
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
        link="https://myria.com/r/%112yb877a"
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
            {missions.map((mission, index) => {
              if (TrackingMap[mission.mission_id]) {
                mission.trackGA4 = TrackingMap[mission.mission_id];
              }
              return (
                <MissionItem key={index} item={mission} action={ActionMap[mission.mission_id]} />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Missions;
