import React from 'react';

interface TProps {
  size: number;
  className: string;
}

export default function SwapIcon({
  size = 16,
  className = 'text-light-blue',
}: TProps) {
  return (
    <div className={className}>
      <svg
        width={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.3265 13.8403C10.1998 13.8403 10.0731 13.7936 9.97313 13.6936C9.77979 13.5003 9.77979 13.1803 9.97313 12.987L13.3131 9.64695C13.5065 9.45362 13.8265 9.45362 14.0198 9.64695C14.2131 9.84029 14.2131 10.1603 14.0198 10.3536L10.6798 13.6936C10.5798 13.787 10.4531 13.8403 10.3265 13.8403Z"
          fill="currentColor"
        />
        <path
          d="M13.6663 10.4932H2.33301C2.05967 10.4932 1.83301 10.2665 1.83301 9.99316C1.83301 9.71983 2.05967 9.49316 2.33301 9.49316H13.6663C13.9397 9.49316 14.1663 9.71983 14.1663 9.99316C14.1663 10.2665 13.9397 10.4932 13.6663 10.4932Z"
          fill="currentColor"
        />
        <path
          d="M2.33329 6.5063C2.20663 6.5063 2.07996 6.45964 1.97996 6.35964C1.78663 6.1663 1.78663 5.8463 1.97996 5.65297L5.31996 2.31297C5.51329 2.11964 5.83329 2.11964 6.02663 2.31297C6.21996 2.5063 6.21996 2.8263 6.02663 3.01964L2.68663 6.35964C2.59329 6.45297 2.45996 6.5063 2.33329 6.5063Z"
          fill="currentColor"
        />
        <path
          d="M13.6663 6.50684H2.33301C2.05967 6.50684 1.83301 6.28017 1.83301 6.00684C1.83301 5.7335 2.05967 5.50684 2.33301 5.50684H13.6663C13.9397 5.50684 14.1663 5.7335 14.1663 6.00684C14.1663 6.28017 13.9397 6.50684 13.6663 6.50684Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
