import React from "react";

const NavigationIcon: React.FC = () => {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_iiiii_654_7515)">
        <path
          d="M20.5689 54.8985L27.8501 50.9C30.4332 49.4815 33.5668 49.4815 36.1499 50.9L43.4311 54.8985C50.467 58.7622 58.4146 51.7891 55.3072 44.4131C52.794 38.4472 50.1819 32.4704 48.1071 28.2356C45.1507 22.2014 41.5532 16.2691 38.5086 11.5933C35.389 6.80224 28.611 6.80225 25.4914 11.5933C22.4468 16.2691 18.8493 22.2014 15.8929 28.2356C13.8181 32.4704 11.206 38.4472 8.69277 44.4131C5.58544 51.7891 13.533 58.7622 20.5689 54.8985Z"
          fill="url(#paint0_linear_654_7515)"
        />
      </g>
      <defs>
        <filter
          id="filter0_iiiii_654_7515"
          x="4"
          y="4"
          width="54"
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
            values="0 0 0 0 1 0 0 0 0 0.980833 0 0 0 0 0.808333 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_654_7515"
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
            values="0 0 0 0 0.583333 0 0 0 0 0.21 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_654_7515"
            result="effect2_innerShadow_654_7515"
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
            values="0 0 0 0 1 0 0 0 0 0.979583 0 0 0 0 0.795833 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_innerShadow_654_7515"
            result="effect3_innerShadow_654_7515"
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
            values="0 0 0 0 0.304167 0 0 0 0 0.073 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect3_innerShadow_654_7515"
            result="effect4_innerShadow_654_7515"
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
            values="0 0 0 0 0.984314 0 0 0 0 0.521569 0 0 0 0 0.105882 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect4_innerShadow_654_7515"
            result="effect5_innerShadow_654_7515"
          />
        </filter>
        <linearGradient
          id="paint0_linear_654_7515"
          x1="32"
          y1="8"
          x2="32"
          y2="56"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FCBC18" />
          <stop offset="1" stopColor="#FF6F1E" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default NavigationIcon;
