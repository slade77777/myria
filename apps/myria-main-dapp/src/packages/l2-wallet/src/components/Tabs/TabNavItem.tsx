import React from 'react';
import cn from 'classnames';

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
    <div
      key={id}
      className={cn(
        activeTab === id
          ? 'border-b-2 border-b-[#E7EBEE] text-[#E7EBEE]'
          : 'text-[#A1AFBA]',
        'mr-[23px] cursor-pointer py-2 last:mr-0',
      )}
      onClick={handleClick}
    >
      <li className="uppercase">{title}</li>
    </div>
  );
}
