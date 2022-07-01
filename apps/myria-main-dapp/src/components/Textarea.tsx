import React from 'react';
import clsx from 'clsx';

type Props = {
  errorText?: string;
  error?: boolean;
  containerClassName?: string;
};

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  Props & React.HTMLProps<HTMLTextAreaElement>
>(({ className, errorText, error, containerClassName, ...props }, ref) => {
  return (
    <div className={containerClassName}>
      <textarea
        className={clsx(className, 'input block w-full', {
          'border-[#F37272]': error
        })}
        {...props}
        ref={ref}
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
});

Textarea.displayName = 'Textarea';

export default Textarea;
