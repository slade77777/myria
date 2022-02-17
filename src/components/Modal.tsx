/* eslint-disable react/display-name */
import React, { ReactNode } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';
import CloseIcon from './icons/CloseIcon';

type DialogProps = {
  title?: string,
  className?: string,
  onClose: (e: any) => void,
  open?: boolean;
  children:
    | React.ReactNode
    | ((props: {
      title: boolean;
      onClose: () => void;
    }) => React.ReactNode);
};

type DialogType = React.FC<DialogProps & DialogPrimitive.DialogProps> & {
  Content: React.FC<DialogPrimitive.DialogContentProps>;
  Trigger: React.FC<DialogPrimitive.DialogTriggerProps>;
  Close: React.FC<DialogPrimitive.DialogCloseProps>;
};

const Dialog: DialogType = ({ title, children, className, onClose, ...props }) => {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Overlay className={clsx('dialog-overlay', className)} onClick={onClose} />
      {React.Children.map<ReactNode, ReactNode>(children, (child) => React.isValidElement(child) && React.cloneElement(child, { title, onClose }))}
    </DialogPrimitive.Root>
  );
}

export const DialogContent = React.forwardRef(
  ({ title, children, className, onClose, ...props }: any, forwardedRef) => {
    const close = (
      <div className="h-[24px] w-[24px] text-white hover:cursor-pointer">
        <CloseIcon />
      </div>
    );
    return (
      <DialogPrimitive.Content
        {...props}
        className={clsx('dialog-content overflow-auto', className)}
        ref={forwardedRef}>
        <div className="mx-8 mt-8">
          <div className="flex items-center justify-between">
            <p className="heading-md text-white">{title}</p>
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

Dialog.Content = DialogContent;
Dialog.Trigger = DialogPrimitive.Trigger;
Dialog.Close = DialogPrimitive.Close;

export default Dialog;
