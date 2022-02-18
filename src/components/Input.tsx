import React, { ReactNode, useState } from 'react';
import clsx from 'clsx';
import ErrorIcon from './icons/ErrorIcon';

export type Props = {
  message?: ReactNode | string;
  errorText?: string;
  error?: boolean;
  containerClassName?: string;
  icon?: React.ReactNode | string;
};

const Input = React.forwardRef<HTMLInputElement, Props & React.HTMLProps<HTMLInputElement>>(
  ({ className, message = null, errorText, error, containerClassName, icon, ...props }, ref) => {
    return (
      <div className={clsx(containerClassName)}>
        <div>
          <input
            className={clsx(className, 'input block w-full', {
              'border-[#FFFFFF]': error
            })}
            type="text"
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <div className="mt-2 flex">
            <ErrorIcon />
            <p
              className={clsx('ml-[10px] text-[14px] leading-[1.5]', {
                'text-brand-orange': error
              })}>
              {errorText}
            </p>
          </div>
        )}
        {message}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
