import clsx from 'clsx';
import React from 'react';
export type TAvatarProps = {
  shape?: 'circle' | 'square';
  type?: 'image' | 'text' | 'icon' | 'iconColor';
  size?: 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs';
  src?: string;
  children?: React.ReactNode;
};

const IconSolid: React.FC<React.SVGProps<SVGSVGElement>> = ({ width = 56, height = 56 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M28.1494 31.52C28.1032 31.52 28.0338 31.52 27.9875 31.52C27.9182 31.52 27.8257 31.52 27.7563 31.52C22.5069 31.3581 18.5757 27.265 18.5757 22.2237C18.5757 17.09 22.7613 12.9044 27.895 12.9044C33.0288 12.9044 37.2144 17.09 37.2144 22.2237C37.1913 27.2881 33.2369 31.3581 28.2188 31.52C28.1725 31.52 28.1725 31.52 28.1494 31.52ZM27.8719 16.35C24.6344 16.35 22.0213 18.9862 22.0213 22.2006C22.0213 25.3687 24.4957 27.9356 27.6407 28.0512C27.71 28.0281 27.9413 28.0281 28.1725 28.0512C31.2713 27.8894 33.6994 25.3456 33.7225 22.2006C33.7225 18.9862 31.1094 16.35 27.8719 16.35Z"
      fill="currentColor"
    />
    <path
      d="M27.8719 52.8412C21.6513 52.8412 15.7082 50.5287 11.1063 46.32C10.69 45.95 10.505 45.395 10.5513 44.8631C10.8519 42.1112 12.5632 39.5444 15.4075 37.6481C22.2988 33.0694 33.4682 33.0694 40.3363 37.6481C43.1807 39.5675 44.8919 42.1112 45.1925 44.8631C45.2619 45.4181 45.0538 45.95 44.6375 46.32C40.0357 50.5287 34.0925 52.8412 27.8719 52.8412ZM14.1819 44.4006C18.0207 47.615 22.8538 49.3725 27.8719 49.3725C32.89 49.3725 37.7232 47.615 41.5619 44.4006C41.1457 42.99 40.0357 41.6256 38.3938 40.5156C32.705 36.7231 23.0619 36.7231 17.3269 40.5156C15.685 41.6256 14.5982 42.99 14.1819 44.4006Z"
      fill="currentColor"
    />
    <path
      d="M27.8719 52.8412C14.1588 52.8412 3.01254 41.695 3.01254 27.9819C3.01254 14.2687 14.1588 3.1225 27.8719 3.1225C41.585 3.1225 52.7313 14.2687 52.7313 27.9819C52.7313 41.695 41.585 52.8412 27.8719 52.8412ZM27.8719 6.59125C16.0782 6.59125 6.48129 16.1881 6.48129 27.9819C6.48129 39.7756 16.0782 49.3725 27.8719 49.3725C39.6657 49.3725 49.2625 39.7756 49.2625 27.9819C49.2625 16.1881 39.6657 6.59125 27.8719 6.59125Z"
      fill="currentColor"
    />
  </svg>
);

const IconColor: React.FC<React.SVGProps<SVGSVGElement>> = ({ width = 56, height = 56 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_iiiii_130962_30831)">
      <path
        d="M37.4111 16.7084C37.4111 21.9767 33.1403 26.2475 27.8721 26.2475C22.6038 26.2475 18.333 21.9767 18.333 16.7084C18.333 11.4402 22.6038 7.16937 27.8721 7.16937C33.1403 7.16937 37.4111 11.4402 37.4111 16.7084Z"
        fill="#C49434"
      />
      <path
        d="M11.7406 35.3814C16.0885 31.848 21.72 29.7162 27.8721 29.7162C34.0241 29.7162 39.6556 31.848 44.0035 35.3814C46.485 37.3981 46.485 41.1125 44.0035 43.1292C39.6556 46.6626 34.0241 48.7944 27.8721 48.7944C21.72 48.7944 16.0885 46.6626 11.7406 43.1292C9.2591 41.1125 9.2591 37.3981 11.7406 35.3814Z"
        fill="#C49434"
      />
    </g>
    <defs>
      <filter
        id="filter0_iiiii_130962_30831"
        x="5.87947"
        y="3.16937"
        width="41.9852"
        height="47.625"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="2" dy="2" />
        <feGaussianBlur stdDeviation="3" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.495833 0 0 0 0 0.879 0 0 0 0 1 0 0 0 0.4 0"
        />
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_130962_30831" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="-4" dy="-4" />
        <feGaussianBlur stdDeviation="3" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.753514 0 0 0 0 0.387838 0 0 0 0 0.0664864 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_innerShadow_130962_30831"
          result="effect2_innerShadow_130962_30831"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="1" dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.929412 0 0 0 0 0.541176 0 0 0 0 0.2 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="effect2_innerShadow_130962_30831"
          result="effect3_innerShadow_130962_30831"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="-2" dy="-2" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.929412 0 0 0 0 0.541176 0 0 0 0 0.2 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="effect3_innerShadow_130962_30831"
          result="effect4_innerShadow_130962_30831"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="-1" dy="-1" />
        <feGaussianBlur stdDeviation="0.5" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.929412 0 0 0 0 0.541176 0 0 0 0 0.2 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="effect4_innerShadow_130962_30831"
          result="effect5_innerShadow_130962_30831"
        />
      </filter>
    </defs>
  </svg>
);

export const Avatar: React.FC<TAvatarProps> = ({
  shape = 'circle',
  type = 'text',
  size = 'xxl',
  src = 'defaultAvatarImage.png',
  children
}: TAvatarProps) => {
  const sizing = React.useMemo(() => {
    switch (size) {
      case 'xxl':
        return { className: 'w-24 h-24', iconSize: 56 };
      case 'xl':
        return { className: 'w-20 h-20', iconSize: 47 };
      case 'l':
        return { className: 'w-16 h-16', iconSize: 37 };
      case 'm':
        return { className: 'w-12 h-12', iconSize: 28 };
      case 's':
        return { className: 'w-8 h-8', iconSize: 19 };
      case 'xs':
        return { className: 'w-6 h-6', iconSize: 14 };
      default:
        return { className: 'w-24 h-24', iconSize: 56 };
    }
  }, [size]);

  const component = React.useMemo(() => {
    switch (type) {
      case 'image':
        return <img src={src} alt="avatar" className="rounded" />;
      case 'icon':
        return <IconSolid width={sizing?.iconSize} height={sizing?.iconSize} />;
      case 'iconColor':
        return <IconColor width={sizing?.iconSize} height={sizing?.iconSize} />;
      default:
        return children;
    }
  }, [type, sizing.iconSize, src, children]);

  return (
    <div
      className={clsx(
        ' bg-base/6 flex items-center justify-center text-blue/9',
        { 'rounded-full': shape === 'circle', rounded: shape !== 'circle' },
        sizing?.className
      )}>
      {component}
      <img src={src} alt="avatar" className="rounded" />
    </div>
  );
};
