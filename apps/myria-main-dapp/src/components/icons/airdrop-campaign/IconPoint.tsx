import React from 'react';

interface Props {
  styleClass: string;
}

const IconPoint: React.FC<Props> = ({ styleClass }) => {
  return (
    <svg
      width="182"
      height="41"
      viewBox="0 0 182 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styleClass}>
      <path
        d="M2.48819 41C0.94326 41 -0.0183054 39.3229 0.762161 37.9896L22.4207 0.989646C22.7795 0.376689 23.4365 6.56124e-06 24.1467 6.5302e-06L227 -2.3368e-06C228.105 -2.38508e-06 229 0.895429 229 2L229 39C229 40.1046 228.105 41 227 41L2.48819 41Z"
        fill="url(#paint0_linear_4989_91649)"
        fillOpacity="0.1"
      />
      <path
        d="M2.48819 40.5C1.32949 40.5 0.608318 39.2422 1.19367 38.2422L22.8522 1.24224C23.1213 0.782519 23.614 0.500007 24.1467 0.500007L227 0.499998C227.828 0.499998 228.5 1.17157 228.5 2L228.5 39C228.5 39.8284 227.828 40.5 227 40.5L2.48819 40.5Z"
        stroke="url(#paint1_linear_4989_91649)"
        strokeOpacity="0.2"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4989_91649"
          x1="14.5"
          y1="30"
          x2="161"
          y2="21"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#6FCBFF" />
          <stop offset="0.297814" stopColor="#5BA7D2" />
          <stop offset="1" stopColor="#5BA7D2" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4989_91649"
          x1="11"
          y1="34"
          x2="114"
          y2="11"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#5BA7D2" />
          <stop offset="1" stopColor="#5BA7D2" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default IconPoint;
