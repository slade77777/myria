import React from 'react';
import cn from 'classnames'

type Props = {
  id: number | string;
  title: string;
  activeTab: number | string;
  setActiveTab: any;
};

export default function TabNavItem({
  id,
  title,
  activeTab,
  setActiveTab,
}: Props) {
  const handleClick = () => {
    setActiveTab(id);
  };

  return (
    <li onClick={handleClick} className={cn(activeTab === id ? 'text-[#E7EBEE] border-b-2 border-b-[#E7EBEE]' : 'text-[#A1AFBA]', 'py-2 mr-[23px] last:mr-0')}>
      {title}
    </li>
  );
}
