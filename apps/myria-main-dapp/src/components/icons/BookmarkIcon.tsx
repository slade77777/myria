import React from 'react';

const BookmarkIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_iiiii_654_7521)">
        <path
          d="M12 16.3722C12 11.3358 16.4402 7.49364 21.3514 8.05443C24.8523 8.45417 28.7624 8.79093 32 8.79093C35.2376 8.79093 39.1477 8.45417 42.6486 8.05443C47.5598 7.49364 52 11.3358 52 16.3722V51.9165C52 55.2144 48.3573 57.1472 45.7062 55.256L34.2939 47.1148C32.9166 46.1323 31.0834 46.1323 29.7062 47.1148L18.2939 55.256C15.6427 57.1472 12 55.2144 12 51.9165V16.3722Z"
          fill="url(#paint0_linear_654_7521)"
        />
      </g>
      <defs>
        <filter
          id="filter0_iiiii_654_7521"
          x="8"
          y="4"
          width="46"
          height="54"
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
            values="0 0 0 0 1 0 0 0 0 0.980833 0 0 0 0 0.808333 0 0 0 0.4 0"
          />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_654_7521" />
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
            values="0 0 0 0 0.0816666 0 0 0 0 0 0 0 0 0 0.583333 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_654_7521"
            result="effect2_innerShadow_654_7521"
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
            values="0 0 0 0 0.983667 0 0 0 0 0.795833 0 0 0 0 1 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_innerShadow_654_7521"
            result="effect3_innerShadow_654_7521"
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
            values="0 0 0 0 0.00608333 0 0 0 0 0 0 0 0 0 0.304167 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect3_innerShadow_654_7521"
            result="effect4_innerShadow_654_7521"
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
            values="0 0 0 0 0.984314 0 0 0 0 0.105882 0 0 0 0 0.843765 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect4_innerShadow_654_7521"
            result="effect5_innerShadow_654_7521"
          />
        </filter>
        <linearGradient
          id="paint0_linear_654_7521"
          x1="32"
          y1="8"
          x2="32"
          y2="56"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#DC18FC" />
          <stop offset="1" stopColor="#8E1EFF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default BookmarkIcon;
