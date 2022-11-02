import { FC } from 'react';

const AppleIcon: FC<{ fill?: string }> = ({ fill }) => {
  return (
    <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.1025 10.6284C14.0772 8.09498 16.1685 6.87991 16.262 6.81853C15.0867 5.1002 13.2556 4.86443 12.6039 4.8376C11.0469 4.67946 9.56418 5.75469 8.77426 5.75469C7.98596 5.75469 6.76551 4.86077 5.47432 4.88353C3.77577 4.90874 2.21016 5.87136 1.33609 7.39171C-0.427917 10.4515 0.88482 14.9862 2.6037 17.4695C3.44403 18.6834 4.44617 20.0493 5.76094 19.9993C7.02814 19.9493 7.50624 19.1797 9.03811 19.1797C10.57 19.1797 11.0001 19.9993 12.3405 19.9736C13.7032 19.9489 14.5671 18.7366 15.4006 17.5179C16.3653 16.1077 16.7625 14.7423 16.7861 14.6731C16.7564 14.6593 14.1297 13.6532 14.1025 10.6284Z"
        fill={fill || '#F5B941'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5838 3.19359C12.2804 2.34744 12.7524 1.17169 12.6241 0.00122736C11.6188 0.0418686 10.4018 0.669775 9.68 1.51511C9.03334 2.26535 8.46792 3.45979 8.61943 4.60913C9.74093 4.6961 10.8848 4.03812 11.5838 3.19359Z"
        fill={fill || '#F5B941'}
      />
    </svg>
  );
};

export default AppleIcon;
