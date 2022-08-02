import { useState } from 'react';
import { useSelector } from 'react-redux';
import Popover from 'src/components/Popover';
import { usePurchaseNFTContext } from 'src/context/purchase-nft';
import { RootState } from 'src/packages/l2-wallet/src/app/store';
const TRIGGER_PURCHASE = 'trigger-popover-purchase';
const PurchaseCheckout: React.FC<{}> = ({ children }) => {
  const { visible } = usePurchaseNFTContext();
  const showClaimPopover = useSelector((state: RootState) => state.ui.showClaimPopover);

  const [openDropdown, setOpenDropdown] = useState(showClaimPopover);

  return (
    <Popover modal defaultOpen={false} open={false} onOpenChange={(open) => setOpenDropdown(open)}>
      {/* <Popover.Trigger asChild>
        <div id={TRIGGER_PURCHASE}></div>
      </Popover.Trigger> */}
      <Popover.Content
        sideOffset={8}
        align="end"
        style={{
          boxShadow: '0 0 0 1px #202230, 0px 0px 40px 10px rgba(0, 0, 0, 0.5)'
        }}
        className="text-base/3 w-[408px] rounded-xl bg-current p-8">
        <Popover.Arrow
          width={24}
          height={13}
          style={{
            filter: `drop-shadow(0px 1px 0px #202230)`
          }}
          className="translate-x-8 fill-current"
        />
        <div>{children}</div>
      </Popover.Content>
    </Popover>
  );
};

export default PurchaseCheckout;
