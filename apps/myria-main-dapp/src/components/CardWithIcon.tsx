import clsx from 'clsx';
import React from 'react';

type Props = {
  icon: JSX.Element;
  className?: string;
  iconClassName?: string;
};

const CardWithIcon: React.FC<Props> = ({ icon, children, className, iconClassName }) => {
  return (
    <article
      style={{
        boxShadow: '0px 0px 40px 10px rgba(0, 0, 0, 0.3)'
      }}
      className={clsx(
        'relative rounded-[20px] bg-brand-deep-blue px-[32px] pt-[80px] text-center',
        className
      )}>
      <div
        style={{
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)'
        }}
        className={clsx(
          'absolute top-0 left-1/2 flex h-[104px] w-[104px]  -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-deep-blue',
          iconClassName
        )}>
        {icon}
      </div>
      {children}
    </article>
  );
};

export default CardWithIcon;
