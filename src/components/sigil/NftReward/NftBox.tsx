import Image from 'next/image';
import React from 'react';
import Button from '../../core/Button';
import style from './style.module.scss';

interface Props {
  isNextReward?: boolean;
  isBlur?: boolean;
  isBlurButton?: boolean;
  onClaim?: () => void;
  titleText: string;
  buttonText: string;
  imageUrl: string;
}

function NftBox({
  onClaim,
  isBlur,
  isNextReward,
  titleText,
  buttonText,
  imageUrl,
  isBlurButton
}: Props) {
  const option = React.useMemo(() => {
    // default
    let borderColor = '#162B39';
    let buttonClass = 'bg-[#0D273A] text-[white]';

    if (typeof onClaim === 'function') {
      buttonClass = 'bg-brand-gold text-[#081824]';
    }

    if (isNextReward) {
      borderColor = '#9ECEAB';
    }

    if (isBlurButton) {
      buttonClass = 'bg-[#0D273A] text-[#97AAB5]';
    }

    return {
      borderColor,
      buttonClass
    };
  }, [onClaim, isNextReward, isBlurButton]);
  return (
    <div className={`relative h-[200px] w-[176px] ${style.container}`}>
      <div
        className={`relative flex h-full w-full flex-col items-center justify-evenly rounded-xl bg-[#081824] px-1 pt-3 pb-8 ${
          isBlur ? 'opacity-50' : ''
        } ${isNextReward && style.nextRewardBox}`}
        style={{
          border: `1px solid ${option.borderColor}`
        }}>
        {isNextReward && (
          <span className="absolute top-[-9px] text-[12px] font-bold text-[#9ECEAB]">
            NEXT REWARD
          </span>
        )}
        <div className="flex h-[102px] w-[112px] items-center justify-center">
          <img width="auto" height="100%" src={imageUrl} alt="" />
        </div>
        <span className="text-xs font-medium text-white">{titleText}</span>
      </div>
      <Button
        className={`absolute bottom-[10px] right-2/4 h-[24px] translate-x-2/4 rounded-[4px] px-2 text-[12px] font-bold leading-[1.25] ${option.buttonClass}`}>
        {buttonText}
      </Button>
    </div>
  );
}

export default NftBox;
