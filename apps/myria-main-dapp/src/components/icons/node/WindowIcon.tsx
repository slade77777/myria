import { FC } from 'react';

const WindowIcon: FC<{ fill?: string }> = ({ fill = '#F5B941' }) => {
  return (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="13.25" y="12.75" width="7.5" height="7.5" fill={fill} />
      <rect x="4.25" y="12.75" width="7.5" height="7.5" fill={fill} />
      <rect x="13.25" y="3.75" width="7.5" height="7.5" fill={fill} />
      <rect x="4.25" y="3.75" width="7.5" height="7.5" fill={fill} />
    </svg>
  );
};

export default WindowIcon;
