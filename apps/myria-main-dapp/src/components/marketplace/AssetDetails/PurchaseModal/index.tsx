import Modal from "src/components/Modal";
import PurchasePopover from "../../PurchasePopover";
type Props = {
    open: boolean;
    onClose: () => void;
    assetBuy: {
      name: string;
      price: string;
    };
    onCloseMessage: () => void,
    onCreate: () => Promise<any>,
}
const PurchaseModal: React.FC<Props> = ({
    open,
    onClose,
    assetBuy,
    onCloseMessage,
    onCreate,
  }) => {
    return (
      <Modal open={open} onOpenChange={onClose}>
        <Modal.Content title={'Purchase'} className="w-[468px] shadow-[0_0_40px_10px_#0000004D]">
          <PurchasePopover
            onConfirm={onCreate}
            assetBuy={assetBuy}
            onCloseMessage={onCloseMessage}
          />
        </Modal.Content>
      </Modal>
    );
  };
export default PurchaseModal