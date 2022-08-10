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
        className="shadow-[0_0_40px_10px_#0000004D] absolute top-8 right-14 max-w-[450px] rounded-xl bg-base/5 max-h-[80vh] border-[#202230] border"
        headerClassName="absolute right-0 top-4 pt-0">
        <div className="flex w-full max-w-lg rounded-[16px] shadow text-gray-400 py-[32px] pl-[72px] pr-[48px]">
          {children}
        </div>
      </Modal.Content>
    </Modal>
  );
}
