import React from 'react';
import clsx from 'clsx';

export const Link: React.FC<
  React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
    disabled?: boolean;
    underline?: boolean;
  }
> = ({ disabled, underline, className, href, ...props }) => {
  return (
    <a
      {...props}
      href={disabled ? undefined : href}
      className={clsx(className, 'body-16-regular', {
        'border-b border-current font-medium': underline,
        'text-primary/3 cursor-not-allowed': disabled,
        'text-primary/6 hover:text-primary/5 active:text-primary/7': !disabled
      })}
    />
  );
};
