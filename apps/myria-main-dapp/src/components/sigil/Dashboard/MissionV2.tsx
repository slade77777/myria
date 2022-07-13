import React, { useState } from 'react';
import { t, Trans } from '@lingui/macro';
import clsx from 'clsx';
import { useGA4 } from 'src/lib/ga';
import { Mission } from 'src/types/sigil';
import ReferFriendModal from '../ReferFriendModal';
import ShareTwitterModal from '../ShareTwitterModal';
import { socialLinks } from 'src/configs';
import { useAuthenticationContext } from 'src/context/authentication';
import { Loading } from 'src/components/Loading';
import HistoryIcon from 'src/components/icons/HistoryIcon';
import { TwitterShareDefaultHashtags, TwitterShareDefaultMessage, useMission } from './useMission';

const SubtractLeft = () => (
  <svg width="128" height="69" viewBox="0 0 128 69" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 69C4.5 69 -3.0598e-07 65.5 -1.04907e-06 57L-5.33279e-06 8L7.99999 -6.99382e-07L8 51C8 57.6274 11.3726 61 18 61L128 61L120 69L12 69Z"
      fill="#142632"
    />
  </svg>
);

const SubtractRight = () => (
  <svg width="70" height="128" viewBox="0 0 70 128" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M69.9766 12C69.9766 4.5 66.4766 -1.5299e-07 57.9766 -5.24537e-07L8.97656 -2.66639e-06L0.976562 8L51.9766 8C58.604 8 61.9766 11.3726 61.9766 18L61.9766 128L69.9766 120L69.9766 12Z"
      fill="#142632"
    />
  </svg>
);

const MissionV2: React.FC = () => {
  const { user, register } = useAuthenticationContext();
  const { completeMission, missions, fetchMissions } = useMission();
  const [openShareTwitterModal, setOpenShareTwitterModal] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);

  const { event } = useGA4();

  const TrackingMap: { [key in Mission['mission_id']]?: () => void } = {
    MYRIA_ACCOUNT: () =>
      event('Sigil Discord Button Clicked', {
        campaign: 'Sigil',
        wallet_address: user?.wallet_id || '',
        myria_username: user?.user_name || '',
        user_email: user?.email || ''
      }),
    JOIN_DISCORD: () =>
      event('Sigil Discord Button Clicked', {
        campaign: 'Sigil',
        wallet_address: user?.wallet_id || '',
        myria_username: user?.user_name || '',
        user_email: user?.email || ''
      })
  };

  const discordLink = 'https://discord.gg/myria';
  const ActionMap: {
    [key in Mission['mission_id']]?: {
      label: string;
      link?: string;
      description: (param: any) => string;
      onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, missionId: string) => void;
    };
  } = {
    MYRIA_ACCOUNT: {
      label: t`Sign up`,
      onClick: (e) => {
        e.preventDefault();
        register();
      },
      description: (point: number) => {
        return t`Earn ${point} points by completing account creation`;
      }
    },
    JOIN_DISCORD: {
      label: t`Launch Discord`,
      link: process.env.NEXT_PUBLIC_DISCORD_MISSION_URL,
      description: (point: number) => {
        return t`Earn ${point} points by joining the Myria Discord server`;
      }
    },
    INVITE_FRIEND: {
      label: t`Copy invite link`,
      onClick: (e) => {
        e.preventDefault();
        setOpenInviteModal(true);
      },
      description: (point: number) => {
        return t`Earn ${point} points for each successful friend invite. You will earn ${point} points each time a friend completes Myria account creation and joins Myria Discord server via your invite link`;
      }
    },
    DAILY_DISCORD_MESSAGE: {
      label: t`Launch Discord`,
      link: discordLink,
      description: (point: number) =>
        t`Earn ${point} points for each day you send a message to any Myria Discord channel`
    },
    FIRST_DISCORD_MESSAGE: {
      label: t`Launch Discord`,
      link: discordLink,
      description: (point: number) =>
        t`Earn ${point} points when you send your first message on any Myria Discord channel`
    },
    SHARE_IDEA_DISCORD: {
      label: t`Launch Discord`,
      link: discordLink,
      description: (point: number) =>
        t`Earn ${point} points when you add a reaction to a message on the #myria-lore channel`
    },
    VOTE_ON_LORE_DISCORD: {
      label: t`Launch Discord`,
      link: discordLink,
      description: (point: number) =>
        t`Earn ${point} points when you add a reaction to a message on the #myria-lore channel`
    },
    SPACE_LORD_ROLE_DISCORD: {
      label: t`Launch Discord`,
      link: discordLink,
      description: (point: number) =>
        t`Earn ${point} points by reaching level 40 on Myria Discord server and acquiring the ‘Space Lord’ activity role`
    },
    SHARE_TWITTER: {
      label: t`Share on Twitter`,
      onClick: (e, missionId) => {
        completeMission(missionId);
      },
      link: `https://twitter.com/intent/tweet?text=${encodeURI(
        TwitterShareDefaultMessage
      )}&hashtags=${TwitterShareDefaultHashtags}&url=${window?.location.origin}/sigil`,
      description: (point: number) => t`Earn ${point} points by sharing a tweet about Myria`
    },
    FOLLOW_TWITTER: {
      label: t`Follow on Twitter`,
      onClick: (e, missionId) => {
        completeMission(missionId);
      },
      link: socialLinks.twitter,
      description: (point: number) => t`Earn ${point} points by following @myriagames on Twitter`
    },
    FOLLOW_INSTAGRAM: {
      label: t`Follow on Instagram`,
      onClick: (e, missionId) => {
        completeMission(missionId);
      },
      link: socialLinks.instagram,
      description: (point: number) => t`Earn ${point} points by following myriagames on Instagram`
    }
  };

  React.useEffect(() => {
    fetchMissions();
  }, [fetchMissions]);

  return (
    <div>
      <ShareTwitterModal
        open={openShareTwitterModal}
        onClose={() => setOpenShareTwitterModal(false)}
      />
      <ReferFriendModal
        open={openInviteModal}
        onClose={() => setOpenInviteModal(false)}
        link={`${window.location.origin}/sigil/?code=${user?.user_id}`}
      />
      <p className="mb-6 text-base font-medium text-light">
        Complete the missions below to unlock your rewards
      </p>
      {!missions ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <div className={`max-h-[65vh] overflow-hide pr-[43px] pl-[3px] pt-[3px]`}>
          {(missions || []).map((mission) => {
            const isRepeatable =
              mission.repetition_type == 'Daily' || mission.repetition_type == 'Unlimited';
            const { earned_credits, title, status, credits, repetition_type, mission_id } = mission;
            const action = ActionMap[mission.mission_id];

            const actionLabel = (() => {
              switch (status) {
                case 'locked':
                  return t`Locked`;
                case 'completed':
                  return t`Complete`;
                default:
                  return ActionMap[mission.mission_id]?.label;
              }
            })();

            if (TrackingMap[mission.mission_id]) {
              mission.trackGA4 = TrackingMap[mission.mission_id];
            }

            return (
              <div
                key={mission.title}
                className={clsx('mb-6', {
                  'opacity-50': status === 'completed' || status == 'locked'
                })}>
                <div className="relative">
                  <div className="absolute -top-[3px] -right-[3px]">
                    <SubtractRight />
                  </div>
                </div>

                <div className="relative z-20 min-h-[128px] w-full rounded-lg bg-brand-deep-blue">
                  <div className="flex w-full px-8 py-6">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="mr-5 text-xl font-bold uppercase leading-6">
                          {mission.title}
                        </h3>
                        <div className="rounded-lg bg-[#0D273A] px-[10px] py-[6px] text-sm font-medium leading-5">
                          {credits} POINTS
                        </div>
                      </div>
                      <p className="mt-4 max-w-[70%] text-base font-normal text-light">
                        {ActionMap[mission.mission_id]?.description &&
                          typeof ActionMap[mission.mission_id]?.description === 'function' &&
                          ActionMap[mission.mission_id]?.description(credits)}
                      </p>
                    </div>
                    <div className="flex h-[80px] flex-col">
                      {action && status != 'completed' && status !== 'locked' ? (
                        <a
                          href={action.link}
                          target="_blank"
                          rel="noreferrer"
                          className={clsx(
                            'sigil-btn-mission cursor-pointer text-center text-base font-bold uppercase'
                          )}
                          onClick={(e) => {
                            if (typeof action.onClick === 'function') {
                              action.onClick(e, mission.mission_id);
                            }
                            if (typeof mission.trackGA4 === 'function') {
                              mission.trackGA4();
                            }
                          }}>
                          <div className="label">
                            <div className="mask">{actionLabel}</div>
                          </div>
                        </a>
                      ) : (
                        <button
                          disabled={status === 'completed' || status == 'locked'}
                          className={clsx(
                            ' w-[202px] py-[14px] text-center text-base font-bold uppercase leading-5',
                            {
                              'sigil-btn-mission-locked': status === 'locked',
                              'sigil-btn-mission-disable': status === 'completed'
                            }
                          )}>
                          {actionLabel}
                        </button>
                      )}
                      <div className="m-auto mt-2 flex items-center">
                        {isRepeatable && (
                          <span className="w-5">
                            <HistoryIcon />
                          </span>
                        )}
                        {(status === 'completed' || isRepeatable) && (
                          <span className="ml-1 text-xs font-medium leading-3 text-light">
                            {earned_credits} POINTS EARNED
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="absolute -bottom-[3px] -left-[3px]">
                    <SubtractLeft />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MissionV2;
