import React from 'react';

const RewardIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M19.5 12.0006V18.7506C19.5 18.9495 19.421 19.1403 19.2803 19.2809C19.1397 19.4216 18.9489 19.5006 18.75 19.5006H5.25C5.05109 19.5006 4.86032 19.4216 4.71967 19.2809C4.57902 19.1403 4.5 18.9495 4.5 18.7506V12.0006M12 7.50061V19.5006M12 7.50061C12 7.50061 15.1781 7.50078 16.2469 6.4414C16.6696 6.01871 16.907 5.44543 16.907 4.84765C16.907 4.24988 16.6696 3.67659 16.2469 3.2539C15.8242 2.83121 15.2509 2.59375 14.6531 2.59375C14.0554 2.59375 13.4821 2.83121 13.0594 3.2539C12 4.32265 12 7.50061 12 7.50061ZM12 7.50061C12 7.50061 8.82168 7.50078 7.75293 6.4414C7.33024 6.01871 7.09277 5.44543 7.09277 4.84765C7.09277 4.24988 7.33024 3.67659 7.75293 3.2539C8.17561 2.83121 8.7489 2.59375 9.34668 2.59375C9.94445 2.59375 10.5177 2.83121 10.9404 3.2539C11.9998 4.32265 12 7.50061 12 7.50061ZM3.75 7.50061H20.25C20.6642 7.50061 21 7.8364 21 8.25061V11.2506C21 11.6648 20.6642 12.0006 20.25 12.0006H3.75C3.33579 12.0006 3 11.6648 3 11.2506V8.25061C3 7.8364 3.33579 7.50061 3.75 7.50061Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RewardIcon;
