import React from 'react';

const FolderIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_iiiii_654_7523)">
        <path
          d="M56 42V26C56 21.5817 52.4183 18 48 18L34.6667 18C32.9357 18 31.2514 17.4386 29.8667 16.4L28.8 15.6C27.4152 14.5614 25.731 14 24 14L16 14C11.5817 14 8 17.5817 8 22L8 42C8 46.4183 11.5817 50 16 50H48C52.4183 50 56 46.4183 56 42Z"
          fill="url(#paint0_linear_654_7523)"
        />
      </g>
      <defs>
        <filter
          id="filter0_iiiii_654_7523"
          x="4"
          y="10"
          width="54"
          height="42"
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
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_654_7523" />
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
            values="0 0 0 0 0.558333 0 0 0 0 0.504128 0 0 0 0 0.0162847 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_654_7523"
            result="effect2_innerShadow_654_7523"
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
            values="0 0 0 0 1 0 0 0 0 0.992917 0 0 0 0 0.929167 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_innerShadow_654_7523"
            result="effect3_innerShadow_654_7523"
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
            values="0 0 0 0 0.304167 0 0 0 0 0.23725 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect3_innerShadow_654_7523"
            result="effect4_innerShadow_654_7523"
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
            values="0 0 0 0 1 0 0 0 0 0.854667 0 0 0 0 0.0916666 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect4_innerShadow_654_7523"
            result="effect5_innerShadow_654_7523"
          />
        </filter>
        <linearGradient
          id="paint0_linear_654_7523"
          x1="28.5"
          y1="14"
          x2="28.5"
          y2="50"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE926" />
          <stop offset="1" stopColor="#FDAB0C" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default FolderIcon;
