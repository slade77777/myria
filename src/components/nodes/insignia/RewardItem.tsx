import React, { useMemo } from 'react';
import CheckIcon from 'src/components/icons/CheckIcon';
import LockIcon from 'src/components/icons/LockIcon';

export type Reward = {
  state: 'locked' | 'progress' | 'claim-now' | 'claimed';
  title: string;
  image?: string;
  credits: number;
};

const Progress: React.FC<{ percentage: number }> = ({ percentage }) => {
  return (
    <div className="relative h-[5px] w-[102px] rounded-2xl bg-dark">
      <div
        style={{
          boxShadow: '0px 0px 5px rgba(245, 185, 65, 0.5)',
          width: `${percentage}%`,
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(247, 196, 96, 0.917941) 50.52%, #F5B941 52.96%, #F5B941 100%), #F5B941'
        }}
        className="absolute top-0 left-0 h-full rounded-2xl"
      />
    </div>
  );
};

type Props = {
  item: Reward;
  onClaim: (reward: Reward) => void;
};

const RewardItem: React.FC<Props> = ({ item, onClaim }) => {
  const { title, credits, state, image } = item;
  const content = useMemo(() => {
    switch (state) {
      case 'locked':
        return (
          <div className="flex items-center space-x-1 text-light-red">
            <span className="w-[16px]">
              <LockIcon />
            </span>
            <span className="text-[14px] font-bold leading-[1.25]">Locked</span>
          </div>
        );

      case 'progress':
        return (
          <div className="space-y-1">
            <p className="text-[12px] font-medium leading-[1.25] text-light">Progress</p>
            <Progress percentage={23} />
          </div>
        );

      case 'claim-now':
        return (
          <button
            onClick={() => onClaim(item)}
            className="rounded-[4px] bg-[#1F2334] px-4 py-1 text-[12px] font-bold leading-[1.25] text-brand-gold">
            CLAIM NOW
          </button>
        );
      default:
        return (
          <div className="flex items-center space-x-1 text-green">
            <CheckIcon className="w-4 fill-current" />
            <span className="text-[14px] font-bold leading-[1.25]">Claimed</span>
          </div>
        );
    }
  }, [state, onClaim, item]);

  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(180deg, rgb(var(--color-value)/ 0.2) 5.86%, rgb(var(--color-value)/ 0) 51.87%)',
        boxShadow:
          '0px 0px 40px 10px rgba(0, 0, 0, 0.3), inset -1px -1px 0 0 rgb(var(--color-value)/ 0.3)'
      }}
      className=" flex min-h-[88px] overflow-hidden rounded-lg bg-brand-deep-blue [--color-value:169_166_177] [--color:rgb(var(--color-value)/1)]">
      <div
        style={{
          clipPath: 'polygon(0 0, 100% 0, 77% 100%, 0% 100%'
        }}
        className="relative isolate flex w-[137px] flex-shrink-0 items-center justify-center bg-[url('/images/nodes/insignia/reward-side-panel.png')] bg-cover bg-left shadow-dark-panel">
        <div className="absolute inset-0 z-[-1] opacity-50 [background-color:var(--color)]"></div>
        <img className="w-[80%]" src={image} alt="" />
      </div>
      <div className="flex flex-1 justify-between space-x-2 py-3 pr-6 pl-6">
        <div>
          <p className="text-[18px] font-medium leading-[1.22] [color:var(--color)]">{title}</p>
          <div className="mt-[10px] min-w-[195px]">{content}</div>
        </div>
        <div className=" w-[64px] rounded-lg bg-dark px-[14px] py-3 text-center">
          <p className="text-[20px] font-bold leading-none">{credits}</p>
          <p className="mt-1 text-[12px] font-medium leading-none text-light">Credits</p>
        </div>
      </div>
    </div>
  );
};

export default RewardItem;
