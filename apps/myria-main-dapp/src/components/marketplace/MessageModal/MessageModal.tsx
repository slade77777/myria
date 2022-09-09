import Modal from 'src/components/Modal';

type Props = {
  isShowMessage: boolean;
  setIsShowMessage: () => void;
  children?: JSX.Element;
};

export default function MessageModal({ isShowMessage, setIsShowMessage, children }: Props) {
  return (
    <Modal open={isShowMessage} onOpenChange={setIsShowMessage}>
      <Modal.Content
        className="bg-base/5 top-15 absolute right-14 max-h-[80vh] max-w-[450px] rounded-2xl border border-[#202230] shadow-[0_0_40px_10px_#0000004D]"
        headerClassName="absolute right-0 top-4 pt-0">
        <div className="flex w-full max-w-lg rounded-[16px] py-[32px] pl-[72px] pr-[48px] text-gray-400 shadow">
          {children}
        </div>
      </Modal.Content>
    </Modal>
  );
}
