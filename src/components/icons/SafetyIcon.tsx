import React from "react";

const SafetyIcon: React.FC = () => {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_iiiii_654_7529)">
        <path
          d="M28.38 9.04943C23.2788 12.6729 15.5885 15.3196 11.3006 16.0963C10.5103 16.2394 9.84716 16.8011 9.68935 17.5817C7.48639 28.479 9.72503 45.9111 28.9082 55.3324C30.7179 56.2212 32.8597 56.2218 34.6721 55.3385C54.0014 45.9178 57.0054 28.4785 53.9941 17.5791C53.7789 16.8001 53.0481 16.2954 52.2349 16.2436C45.3322 15.8041 39.0343 12.1372 35.165 9.09286C33.2907 7.61816 30.3252 7.66775 28.38 9.04943Z"
          fill="url(#paint0_linear_654_7529)"
        />
      </g>
      <defs>
        <filter
          id="filter0_iiiii_654_7529"
          x="5"
          y="4"
          width="52"
          height="54"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
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
            values="0 0 0 0 0.938667 0 0 0 0 1 0 0 0 0 0.808333 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_654_7529"
          />
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
            values="0 0 0 0 0 0 0 0 0 0.583333 0 0 0 0 0.163333 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_654_7529"
            result="effect2_innerShadow_654_7529"
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
            values="0 0 0 0 0.873417 0 0 0 0 1 0 0 0 0 0.795833 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_innerShadow_654_7529"
            result="effect3_innerShadow_654_7529"
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
            values="0 0 0 0 0 0 0 0 0 0.304167 0 0 0 0 0.231167 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect3_innerShadow_654_7529"
            result="effect4_innerShadow_654_7529"
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
            values="0 0 0 0 0.105882 0 0 0 0 0.984314 0 0 0 0 0.457255 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect4_innerShadow_654_7529"
            result="effect5_innerShadow_654_7529"
          />
        </filter>
        <linearGradient
          id="paint0_linear_654_7529"
          x1="32"
          y1="8"
          x2="32"
          y2="56"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#97EB0E" />
          <stop offset="1" stopColor="#19B90B" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SafetyIcon;
