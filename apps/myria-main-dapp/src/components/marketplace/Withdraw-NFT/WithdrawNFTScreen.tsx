import { FC, useState } from 'react';
import { useWithDrawNFTContext } from 'src/context/withdraw-nft';
import { StatusWithdrawNFT } from 'src/types/marketplace';
import WithdrawNFTCompleting from './WithdrawNFTCompleting';
import WithdrawNFTFailed from './WithdrawNFTFailed';
import WithdrawNFTInProgress from './WithdrawNFTInProgress';
import WithdrawNFTMainScreen from './WithdrawNFTMainScreen';
import WithdrawNFTSuccess from './WithdrawNFTSuccess';
interface IProp {}

const WithdrawNFTScreen: FC<IProp> = () => {
  const { valueNFT, status, setStatus } = useWithDrawNFTContext();
  return (
    <>
      {status === StatusWithdrawNFT.MAIN_SCREEN && (
        <WithdrawNFTMainScreen
          valueNFT={valueNFT}
          onChangeStatus={() => setStatus(StatusWithdrawNFT.INPROGRESS)}
        />
      )}
      {status === StatusWithdrawNFT.INPROGRESS && <WithdrawNFTInProgress valueNFT={valueNFT} />}
      {status === StatusWithdrawNFT.SUCCESS && <WithdrawNFTSuccess />}
      {status === StatusWithdrawNFT.COMPLETED && <WithdrawNFTCompleting />}
      {status === StatusWithdrawNFT.FAILED && <WithdrawNFTFailed />}
    </>
  );
};
export default WithdrawNFTScreen;
