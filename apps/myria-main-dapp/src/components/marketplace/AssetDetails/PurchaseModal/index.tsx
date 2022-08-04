import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import Modal from 'src/components/Modal';
import { RootState } from 'src/packages/l2-wallet/src/app/store';
import { assetModule } from 'src/services/myriaCore';
import PurchasePopover from '../../PurchasePopover';
// @ts-ignore
import { asset } from '@starkware-industries/starkware-crypto-utils';
import { convertQuantizedAmountToEth } from 'src/packages/l2-wallet/src/utils/Converter';

const QUANTUM_CONSTANT = 10000000000;

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
  const pKey = useSelector((state: RootState) => state.account.starkPublicKeyFromPrivateKey);

  const { data: balanceList, isLoading } = useQuery(['getBalanceList', open], async () => {
    const assetList = await assetModule?.getListAssetsByStarkKey(`0x${pKey}`);
    return assetList?.data;
  });

  const [balanceL2Eth, setBalanceL2Eth] = useState<string>('');

  useEffect(() => {
    const assetType = asset.getAssetType({
      type: 'ETH',
      data: {
        quantum: QUANTUM_CONSTANT.toString()
      }
    });
    let exactBalance: any;
    if (Array.isArray(balanceList)) {
      exactBalance = balanceList?.filter((item: any) => item.assetId === assetType);
    }

    if (exactBalance && exactBalance.length > 0) {
      setBalanceL2Eth(convertQuantizedAmountToEth(exactBalance[0].quantizedAmount).toString());
    }
  }, [balanceList]);

  return (
    <Modal open={open} onOpenChange={onClose}>
      <Modal.Content className="shadow-[0_0_40px_10px_#0000004D] absolute top-6 right-28 h-[565px] w-[406px] rounded-xl bg-base/3 max-h-[80vh] border-[#202230] border z-50">
        <PurchasePopover
          onConfirm={onCreate}
          assetBuy={assetBuy}
          onCloseMessage={onCloseMessage}
          setChangeStatusSuccess={setChangeStatusSuccess}
          isDeposit={parseFloat(balanceL2Eth) < parseFloat(assetBuy.price)}
          isLoading={isLoading}
        />
        <div className="absolute right-5 -top-1 w-10 h-6 bg-base/3 rotate-45 z-10"></div>
      </Modal.Content>
    </Modal>
  );
};
export default PurchaseModal;
