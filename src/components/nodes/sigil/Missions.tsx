import React from 'react';
import MissionItem, { Mission } from './MissionItem';
import ReferFriendModal from './ReferFriendModal';

const missions: Mission[] = [
  {
    title: 'Create a Myria Account',
    description: 'Earn 5 Credits',
    score: 10,
    state: 'completed'
  },
  {
    title: 'Create a Myria Account',
    description: 'Earn 5 Credits',
    score: 10,
    state: 'completed'
  },
  {
    title: 'Create a Myria Account',
    description: 'Earn 5 Credits',
    score: 10,
    state: 'active',
    action: {
      label: 'Signup',
      link: 'https://myria.io/signup'
    }
  },
  {
    title: 'Create a Myria Account',
    description: 'Earn 5 Credits',
    score: 10,
    state: 'locked'
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

const Missions: React.FC = () => {
  return (
    <>
      <ReferFriendModal open={false} onClose={() => {}} link="https://myria.com/r/%112yb877a" />
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
