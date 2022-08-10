import { FC } from 'react';
import { usePurchaseNFTContext } from 'src/context/purchase-nft';
import { StatusWithdrawNFT } from 'src/types/marketplace';
interface IProp {}

const PurchaseScreen: FC<IProp> = () => {
  const { valueNFT, status, setStatus } = usePurchaseNFTContext();
  return (
    <>
    <h1>OUEHGOUSGHEOIUGHSEOGFIUHSEOU</h1>
      {/* {status === StatusWithdrawNFT.MAIN_SCREEN && (
        <WithdrawNFTMainScreen
          valueNFT={valueNFT}
          onChangeStatus={() => setStatus(StatusWithdrawNFT.INPROGRESS)}
        />
      )}
      {status === StatusWithdrawNFT.INPROGRESS && <WithdrawNFTInProgress valueNFT={valueNFT} />}
      {status === StatusWithdrawNFT.SUCCESS && <WithdrawNFTSuccess />}
      {status === StatusWithdrawNFT.COMPLETED && <WithdrawNFTCompleting />}
      {status === StatusWithdrawNFT.FAILED && <WithdrawNFTFailed />} */}
    </>
  );
};
export default PurchaseScreen;
