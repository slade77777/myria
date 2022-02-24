import React, { ReactNode } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';
import CloseIcon from './icons/CloseIcon';

type ModalProps = {
  title?: string;
  className?: string;
  onClose?: (e: any) => void;
  open?: boolean;
  children: React.ReactNode | ((props: { title: boolean; onClose: () => void }) => React.ReactNode);
};

type ModalContentProps = {
  onClose?: () => void;
  includingHeader?: boolean;
};

type ModalType = React.FC<ModalProps & DialogPrimitive.DialogProps> & {
  Content: React.FC<DialogPrimitive.DialogContentProps & ModalContentProps>;
  Trigger: React.FC<DialogPrimitive.DialogTriggerProps>;
  Close: React.FC<DialogPrimitive.DialogCloseProps>;
};

const Modal: ModalType = ({ title, children, className, onClose, ...props }) => {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Overlay className={clsx('dialog-overlay', className)} onClick={onClose} />
      {React.Children.map<ReactNode, ReactNode>(
        children,
        (child) => React.isValidElement(child) && React.cloneElement(child, { title, onClose })
      )}
    </DialogPrimitive.Root>
  );
};

type ExtractProps<T> = T extends React.FC<infer P> ? P : never;

const ModalContent = React.forwardRef<HTMLDivElement, ExtractProps<ModalType['Content']>>(
  ({ title, children, className, onClose, includingHeader = true, ...props }, forwardedRef) => {
    const close = (
      <div className="h-[24px] w-[24px] text-white hover:cursor-pointer">
        <CloseIcon />
      </div>
    );
    return (
      <DialogPrimitive.Content {...props} className={clsx('dialog-content')} ref={forwardedRef}>
        <div className={clsx('mx-auto my-auto w-full rounded-lg bg-brand-deep-blue', className)}>
          {includingHeader && (
            <div className="px-8 pt-8">
              <div className="flex items-center justify-between">
                <p className="heading-md text-white">{title}</p>
                {!onClose ? (
                  <DialogPrimitive.Close>{close}</DialogPrimitive.Close>
                ) : (
                  <button onClick={onClose}>{close}</button>
                )}
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
