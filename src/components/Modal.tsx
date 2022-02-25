import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';
import CloseIcon from './icons/CloseIcon';

type ModalProps = {
  overlayClassName?: string;
};

type ModalContentProps = {
  title?: string;
  includingHeader?: boolean;
};

type ModalType = React.FC<ModalProps & DialogPrimitive.DialogProps> & {
  Content: React.FC<DialogPrimitive.DialogContentProps & ModalContentProps>;
  Trigger: React.FC<DialogPrimitive.DialogTriggerProps>;
  Close: React.FC<DialogPrimitive.DialogCloseProps>;
};

const Modal: ModalType = ({ children, overlayClassName, ...props }) => {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Overlay className={clsx('dialog-overlay', overlayClassName)} />
      {children}
    </DialogPrimitive.Root>
  );
};

type ExtractProps<T> = T extends React.FC<infer P> ? P : never;

const ModalContent = React.forwardRef<HTMLDivElement, ExtractProps<ModalType['Content']>>(
  ({ title, className, children, includingHeader = true, ...props }, forwardedRef) => {
    return (
      <DialogPrimitive.Content {...props} className={clsx('dialog-content')} ref={forwardedRef}>
        <div className={clsx('mx-auto my-auto w-full rounded-lg bg-brand-deep-blue', className)}>
          {includingHeader && (
            <div className="px-8 pt-8">
              <div className="flex items-center justify-between">
                <p className="heading-md text-white">{title}</p>
                <DialogPrimitive.Close asChild>
                  <button className="h-[24px] w-[24px] text-white hover:cursor-pointer">
                    <CloseIcon />
                  </button>
                </DialogPrimitive.Close>
              </div>
            </div>
          )}
          {children}
        </div>
      </DialogPrimitive.Content>
    );
  }
);

ModalContent.displayName = 'ModalContent';

Modal.Content = ModalContent;
Modal.Trigger = DialogPrimitive.Trigger;
Modal.Close = DialogPrimitive.Close;

export default Modal;
