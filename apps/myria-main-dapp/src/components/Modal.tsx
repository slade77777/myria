import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import clsx from 'clsx';
import CloseIcon from './icons/CloseIcon';

type ModalProps = {
  overlayClassName?: string;
};

type ModalContentProps = {
  title?: string | JSX.Element;
  includingHeader?: boolean;
  headerClassName?: string;
  titleClassName?: string;
  isIcon?: boolean;
};

type ModalType = React.FC<ModalProps & DialogPrimitive.DialogProps> & {
  Content: React.FC<Omit<DialogPrimitive.DialogContentProps, 'title'> & ModalContentProps>;
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
  (
    {
      title,
      className,
      children,
      includingHeader = true,
      headerClassName,
      titleClassName,
      isIcon = false,
      ...props
    },
    forwardedRef
  ) => {
    return (
      <DialogPrimitive.Content {...props} className={clsx('dialog-content')} ref={forwardedRef}>
        <div
          className={clsx(
            'mx-auto my-auto w-full max-w-[576px] rounded-lg bg-brand-deep-blue z-50',
            className
          )}>
          {includingHeader && (
            <div className={clsx('px-8 pt-8', headerClassName)}>
              <div className="flex items-center justify-between">
                <div className={clsx('heading-md text-white', titleClassName)}>
                  <span>{title}</span>
                  {isIcon && (
                    <span className="ml-2 my-auto">
                      {' '}
                      <img src="/assets/images/sad-face.png" alt="" width={24} />
                    </span>
                  )}
                </div>
                <DialogPrimitive.Close asChild>
                  <button className="h-[24px] w-[24px] text-white hover:cursor-pointer focus:outline-none">
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
