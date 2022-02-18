import ETH from 'src/components/icons/ETHIcon';
import Dialog from 'src/components/Modal';
import Register from '../Register';

const RegisterModal = ({ open, onClose }: { open: boolean; onClose?: () => void }) => {
  return (
    <Dialog open={true} title="Register" onClose={onClose}>
      <Dialog.Content className="z-20 w-80 shadow-[0_0_40px_10px_#0000004D] md:w-[576px]">
        <Register />
      </Dialog.Content>
    </Dialog>
  );
};

export default RegisterModal;
