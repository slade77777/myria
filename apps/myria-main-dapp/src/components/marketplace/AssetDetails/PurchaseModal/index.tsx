import Modal from 'src/components/Modal';
import PurchasePopover from '../../PurchasePopover';
type Props = {
  open: boolean;
  onClose: () => void;
  assetBuy: {
    name: string;
    price: string;
  };
  onCloseMessage: () => void;
  onCreate: () => Promise<any>;
  setChangeStatusSuccess: () => void;
};
const PurchaseModal: React.FC<Props> = ({
  open,
  onClose,
  assetBuy,
  onCloseMessage,
  onCreate,
  setChangeStatusSuccess
}) => {
  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content className="shadow-[0_0_40px_10px_#0000004D] absolute top-6 right-28 h-[565px] w-[406px] rounded-xl bg-base/3 max-h-[80vh] border-[#202230] border z-50">
        <PurchasePopover
          onConfirm={onCreate}
          assetBuy={assetBuy}
          onCloseMessage={onCloseMessage}
          setChangeStatusSuccess={setChangeStatusSuccess}
        />
        <div className="absolute right-5 -top-1 w-10 h-6 bg-base/3 rotate-45 z-10"></div>
      </Modal.Content>
    </Modal>
  );
};
export default PurchaseModal;
