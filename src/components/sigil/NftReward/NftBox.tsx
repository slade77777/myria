import React from 'react';
import { toast } from 'react-toastify';
import Button from '../../core/Button';
import style from './style.module.scss';

interface Props {
  isNextReward?: boolean;
  isBlur?: boolean;
  isBlurButton?: boolean;
  onClaim?: () => Promise<void>;
  onClaimSuccess?: () => void;
  titleText: string;
  buttonText: string;
  imageUrl: string;
  containerClassname?: string;
}

function NftBox({
  onClaim,
  onClaimSuccess,
  isBlur,
  isNextReward,
  titleText,
  buttonText,
  imageUrl,
  isBlurButton,
  containerClassname
}: Props) {
  const animationRef = React.useRef<HTMLDivElement>(null);
  const [isClaiming, setIsClaiming] = React.useState(false);
  const option = React.useMemo(() => {
    // default
    let borderColor = '#162B39';
    let buttonClass = 'bg-[#0D273A] text-[white] cursor-default';

    if (typeof onClaim === 'function') {
      buttonClass = 'btn-primary cursor-pointer';
    }

    if (isNextReward) {
      borderColor = '#9ECEAB';
    }

    if (isBlurButton) {
      buttonClass = 'bg-[#0D273A] text-[#97AAB5] cursor-default';
    }

    return {
      borderColor,
      buttonClass
    };
  }, [onClaim, isNextReward, isBlurButton]);

  const handleClaim = async () => {
    try {
      if (animationRef.current) {
        animationRef.current.style.display = 'flex';
      }
      setIsClaiming(true);
      if (typeof onClaim === 'function') {
        await onClaim();

        onClaimSuccess?.();
        toast('Claimed successfully.', { type: 'success' });
      }
    } catch (e) {
      toast('Claimed unsuccessfully.', { type: 'error' });
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div
      className={`relative h-[200px] min-w-[176px] max-w-[176px] ${style.container} ${containerClassname}`}>
      <div ref={animationRef} className={style.animation} style={{ display: 'none' }}>
        <div className={style.particles}>
          <div />
          <div />
          <div />
          <div>
            <svg
              width="56"
              height="63"
              viewBox="0 0 56 63"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="27.7088"
                cy="31.5871"
                r="12.5"
                transform="rotate(2.50711 27.7088 31.5871)"
                fill="url(#paint0_radial_4989_91876)"
                fillOpacity="0.5"
              />
              <g opacity="0.2">
                <path
                  d="M54.4541 15.199L28.2567 30.5677L28.7125 31.5886L54.4541 15.199Z"
                  fill="#F5B941"
                />
                <path
                  d="M1.49121 47.4134L27.6886 32.0446L27.2328 31.0237L1.49121 47.4134Z"
                  fill="#F5B941"
                />
                <path
                  d="M3.49908 12.3054L27.1959 31.3043L27.9873 30.5146L3.49908 12.3054Z"
                  fill="#F5B941"
                />
                <path
                  d="M52.4736 50.3069L28.7767 31.308L27.9853 32.0977L52.4736 50.3069Z"
                  fill="#F5B941"
                />
              </g>
              <g opacity="0.2">
                <path
                  d="M32.1455 16.9797L27.837 30.9595L28.331 31.1739L32.1455 16.9797Z"
                  fill="#F5B941"
                />
                <path
                  d="M23.8076 45.6482L28.1161 31.6685L27.6222 31.454L23.8076 45.6482Z"
                  fill="#F5B941"
                />
                <path
                  d="M13.0925 32.5141L27.6897 31.5568L27.714 31.0189L13.0925 32.5141Z"
                  fill="#F5B941"
                />
                <path
                  d="M42.8489 30.0855L28.2517 31.0428L28.2274 31.5808L42.8489 30.0855Z"
                  fill="#F5B941"
                />
              </g>
              <defs>
                <radialGradient
                  id="paint0_radial_4989_91876"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(27.7088 31.5871) rotate(90) scale(11)">
                  <stop stopColor="#F5B941" />
                  <stop offset="1" stopColor="#F5B941" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
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
        loading={isClaiming}
        onClick={handleClaim}
        className={`absolute bottom-[10px] right-2/4 h-[24px] w-fit translate-x-2/4 rounded-[4px] px-2 text-[12px] font-bold leading-[1.25] transition-all ${option.buttonClass}`}>
        {!isClaiming && buttonText}
      </Button>
    </div>
  );
}

export default NftBox;
