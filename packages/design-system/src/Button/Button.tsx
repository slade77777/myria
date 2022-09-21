import React from 'react';
import clsx from 'clsx';

type BasicProps = {
  size: 'sm' | 'md' | 'lg' | 'xl';
  variant: 'primary' | 'secondary' | 'tetiary' | 'low-emphasis';
  startIcon?: React.ReactNode;
  startIconClassName?: string;
  endIcon?: React.ReactNode;
  endIconClassName?: string;
};

type Props = BasicProps &
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button: React.FC<Props> = ({
  children,
  size = 'sm',
  variant = 'primary',
  startIcon,
  startIconClassName,
  endIcon,
  endIconClassName,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(className, 'flex items-center rounded-lg px-4 disabled:cursor-not-allowed', {
        'body-14-bold py-[5px]': size === 'sm',
        'body-14-bold py-[9px] uppercase': size === 'md',
        'body-16-bold py-[12.5px] uppercase': size === 'lg',
        'body-16-bold py-[16.5px] uppercase': size === 'xl',
        'bg-primary/6 text-base/1 hover:bg-primary/5 hover:text-primary/1 disabled:bg-gray/4 disabled:text-gray/6':
          variant === 'primary',
        'bg-blue/7 text-base/2 hover:bg-blue/5 hover:text-base/4 disabled:bg-gray/4 disabled:text-gray/6':
          variant === 'secondary',
        'border-base/9 focus:border-primary/7 hover:text-primary/10 disabled:border-gray/6 disabled:text-gray/6 border text-white':
          variant === 'tetiary',
        'focus:border-primary/7 hover:text-primary/10 disabled:text-gray/6 border border-transparent text-white':
          variant === 'low-emphasis'
      })}
      {...props}
    >
      {startIcon && (
        <i
          className={clsx('mr-2', startIconClassName, {
            'w-[18px]': size === 'sm',
            'w-5': size === 'md',
            'w-[28px]': size === 'lg' || size === 'xl'
          })}
        >
          {startIcon}
        </i>
      )}
      {children}
      {endIcon && (
        <i
          className={clsx('ml-2', endIconClassName, {
            'w-4': size === 'sm' || size === 'md',
            'w-6': size === 'lg' || size === 'xl'
          })}
        >
          {endIcon}
        </i>
      )}
    </button>
  );
};
