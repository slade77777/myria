import Modal from 'src/components/Modal';
import Register from '../Register';

const RegisterModal = ({ open = true, onClose }: { open?: boolean; onClose?: () => void }) => {
  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content title="Register" className="shadow-[0_0_40px_10px_#0000004D]">
        <Register />
      </Modal.Content>
    </Modal>
  );
};

export default RegisterModal;
