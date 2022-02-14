/* eslint-disable react/display-name */
import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';
import CloseIcon from './icons/CloseIcon';

export function Dialog({ title, children, className, onClose, ...props }: any) {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Overlay className={clsx('dialog-overlay', className)} onClick={onClose} />
      {React.Children.map(children, (child) => React.cloneElement(child, { title, onClose }))}
    </DialogPrimitive.Root>
  );
}

export const DialogContent = React.forwardRef(
  ({ title, children, className, onClose, ...props }: any, forwardedRef) => {
    const close = (
      <div className="h-[24px] w-[24px] hover:cursor-pointer">
        <CloseIcon />
      </div>
    );
    return (
      <DialogPrimitive.Content
        {...props}
        className={clsx('dialog-content', className)}
        ref={forwardedRef}>
        <div className="mx-8 mt-8">
          <div className="flex items-center justify-between">
            <p className="heading-md">Complete your purchase</p>
            {!onClose ? (
              <DialogPrimitive.Close>{close}</DialogPrimitive.Close>
            ) : (
              <div onClick={onClose}>{close}</div>
            )}
          </div>
        </div>
        {children}
      </DialogPrimitive.Content>
    );
  }
);
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
