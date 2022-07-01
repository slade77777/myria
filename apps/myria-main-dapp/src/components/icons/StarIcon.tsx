import React from "react";

const StarIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_iiiii_654_7408)">
        <path
          d="M11.2484 25.5868L17.9436 24.272C20.1633 23.8362 22.0956 22.4949 23.268 20.5764L28.5552 11.9239C30.1228 9.35869 33.8772 9.35868 35.4448 11.9239L40.732 20.5764C41.9044 22.4949 43.8367 23.8362 46.0564 24.272L52.7516 25.5868C55.9189 26.2088 57.0973 30.0875 54.8032 32.34L49.1837 37.8577C47.2567 39.7497 46.4196 42.476 46.9565 45.1115L47.9946 50.2082C48.6573 53.4614 45.2594 56.0492 42.2594 54.5763L35.5748 51.2946C33.3222 50.1887 30.6778 50.1887 28.4252 51.2946L21.7406 54.5763C18.7406 56.0492 15.3427 53.4614 16.0054 50.2082L17.0435 45.1115C17.5804 42.476 16.7433 39.7497 14.8163 37.8577L9.19676 32.34C6.90272 30.0875 8.08106 26.2088 11.2484 25.5868Z"
          fill="url(#paint0_linear_654_7408)"
        />
      </g>
      <defs>
        <filter
          id="filter0_iiiii_654_7408"
          x="4"
          y="6"
          width="54"
          height="51"
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
            values="0 0 0 0 1 0 0 0 0 0.7625 0 0 0 0 0.7625 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_654_7408"
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
            values="0 0 0 0 0.583333 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_654_7408"
            result="effect2_innerShadow_654_7408"
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
            values="0 0 0 0 1 0 0 0 0 0.795833 0 0 0 0 0.795833 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_innerShadow_654_7408"
            result="effect3_innerShadow_654_7408"
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
            values="0 0 0 0 0.304167 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect3_innerShadow_654_7408"
            result="effect4_innerShadow_654_7408"
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
            values="0 0 0 0 1 0 0 0 0 0.25 0 0 0 0 0.25 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect4_innerShadow_654_7408"
            result="effect5_innerShadow_654_7408"
          />
        </filter>
        <linearGradient
          id="paint0_linear_654_7408"
          x1="32"
          y1="10"
          x2="32"
          y2="55"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F5B941" />
          <stop offset="1" stopColor="#F5B941" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default StarIcon;
