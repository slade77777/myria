import React from 'react';
import clsx from 'clsx';

type Props = {
  errorText?: string;
  error?: boolean;
  containerClassName?: string;
};

const Input = React.forwardRef<HTMLInputElement, Props & React.HTMLProps<HTMLInputElement>>(
  ({ className, errorText, error, containerClassName, ...props }, ref) => {
    return (
      <div className={containerClassName}>
        <input
          className={clsx(className, 'input block w-full', {
            'border-[#F37272]': error
          })}
          type="text"
          ref={ref}
          {...props}
        />
        {error && (
          <p
            className={clsx('text-[14px] leading-[1.5] mt-[7px]', {
              'text-[#F37272]': error
            })}>
            {errorText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
