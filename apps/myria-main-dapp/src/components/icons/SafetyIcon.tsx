import React from 'react';

const SafetyIcon: React.FC = () => {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_iiiii_654_6228)">
        <path
          d="M14.19 4.52471C11.6394 6.33647 7.79427 7.65978 5.6503 8.04814C5.25516 8.11971 4.92358 8.40054 4.84468 8.79085C3.74319 14.2395 4.86252 22.9556 14.4541 27.6662C15.359 28.1106 16.4298 28.1109 17.336 27.6692C27.0007 22.9589 28.5027 14.2393 26.9971 8.78953C26.8895 8.40007 26.524 8.1477 26.1174 8.12181C22.6661 7.90205 19.5171 6.06859 17.5825 4.54643C16.6454 3.80908 15.1626 3.83387 14.19 4.52471Z"
          fill="url(#paint0_linear_654_6228)"
        />
      </g>
      <defs>
        <filter
          id="filter0_iiiii_654_6228"
          x="0.5"
          y="0"
          width="29"
          height="30"
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
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_654_6228" />
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
            in2="effect1_innerShadow_654_6228"
            result="effect2_innerShadow_654_6228"
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
            in2="effect2_innerShadow_654_6228"
            result="effect3_innerShadow_654_6228"
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
            in2="effect3_innerShadow_654_6228"
            result="effect4_innerShadow_654_6228"
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
            in2="effect4_innerShadow_654_6228"
            result="effect5_innerShadow_654_6228"
          />
        </filter>
        <linearGradient
          id="paint0_linear_654_6228"
          x1="14.3229"
          y1="4"
          x2="14.3229"
          y2="28"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE926" />
          <stop offset="1" stopColor="#FDAB0C" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SafetyIcon;
