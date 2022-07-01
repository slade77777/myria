import ETH from 'src/components/icons/ETHIcon';
import Dialog from 'src/components/Modal';
import SignIn from '../SignIn';

const SignInModal = ({ open, onClose }: { open: boolean; onClose?: () => void }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <Dialog.Content
        title="Sign in"
        className="z-20 shadow-[0_0_40px_10px_#0000004D] md:w-[576px]">
        <SignIn />
      </Dialog.Content>
    </Dialog>
  );
};

export default SignInModal;
