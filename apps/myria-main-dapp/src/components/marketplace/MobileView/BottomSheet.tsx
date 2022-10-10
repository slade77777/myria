import React, { useEffect } from 'react';
import Sheet from 'react-modal-sheet';

type Props = {
  children: JSX.Element | string;
  open: boolean;
  setOpen: (open: boolean) => void;
  snapPoints: number[];
};

const BottomSheet = ({ open, setOpen, snapPoints, children }: Props) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  return (
    <Sheet rootId="root" isOpen={open} onClose={() => setOpen(false)} snapPoints={snapPoints}>
      <Sheet.Container>
        {/* <Sheet.Header></Sheet.Header> */}
        <Sheet.Content>{children}</Sheet.Content>
      </Sheet.Container>
      {/* 
      // @ts-ignore */}
      <Sheet.Backdrop onClick={() => setOpen(false)} />
    </Sheet>
  );
};

export default BottomSheet;
