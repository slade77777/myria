import Popover from 'src/components/Popover';
import { useL2WalletContext } from 'src/context/l2-wallet';
import { useWithDrawNFTContext } from 'src/context/withdraw-nft';
import { StatusWithdrawNFT } from 'src/types/marketplace';

const WthdrawNFTPopover: React.FC<{}> = ({ children }) => {
  const { isShowLearnMore, setStatus } = useWithDrawNFTContext();
  const { isDisplayPopoverWithdrawNFT, handleDisplayPopoverWithdrawNFT } = useL2WalletContext();

  return (
    <Popover
      modal
      open={isDisplayPopoverWithdrawNFT}
      onOpenChange={(open) => {
        if (!open && !isShowLearnMore) {
          handleDisplayPopoverWithdrawNFT(false);
          setStatus(StatusWithdrawNFT.MAIN_SCREEN);
        }
      }}>
      <Popover.Trigger asChild>
        <div className="appearance-none"></div>
      </Popover.Trigger>
      <Popover.Content
        sideOffset={8}
        align="end"
        style={{
          boxShadow: '0 0 0 1px #202230, 0px 0px 40px 10px rgba(0, 0, 0, 0.5)'
        }}
        className="text-base/3 h-[565px] max-h-[80vh] w-[406px] overflow-auto rounded-xl bg-current p-6">
        <Popover.Arrow
          width={24}
          height={13}
          style={{
            filter: `drop-shadow(0px 1px 0px #202230)`
          }}
          className="translate-x-8 fill-current"
        />
        <div className="flex flex-col h-full">{children}</div>
      </Popover.Content>
    </Popover>
  );
};

export default WthdrawNFTPopover;
