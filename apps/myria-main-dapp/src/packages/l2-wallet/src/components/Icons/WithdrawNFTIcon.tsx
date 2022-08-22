import React from 'react';

type Props = {
  className?: string;
  size?: number;
};

export default function WithdrawNFTIcon({ size = 24, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 32.5C24.8366 32.5 32 25.3366 32 16.5C32 7.66344 24.8366 0.5 16 0.5C7.16344 0.5 0 7.66344 0 16.5C0 25.3366 7.16344 32.5 16 32.5Z"
        fill="#8BB5CC"
      />
      <path
        d="M7.8731 19.6998H6.3999V13.2998H7.74861L10.529 17.2861V13.2998H12.0022V19.6998H10.6535L7.8731 15.7135V19.6998Z"
        fill="#081824"
      />
      <path
        d="M15.7145 19.6998H14.2413V13.2998H19.0551V14.4335H15.7145V16.0335H18.5571V17.1124H15.7145V19.6998Z"
        fill="#081824"
      />
      <path
        d="M23.5665 19.6998H22.0933V14.4335H20.0495V13.2998H25.5999V14.4335H23.5665V19.6998Z"
        fill="#081824"
      />
    </svg>
  );
}

WithdrawNFTIcon.defaultProps = {
  size: 24,
};
