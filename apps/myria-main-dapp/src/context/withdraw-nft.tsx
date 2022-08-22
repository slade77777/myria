import React, { useContext, useState } from 'react';
import { StatusWithdrawNFT } from 'src/types/marketplace';

interface WithdrawNFT {
  valueNFT: any;
  handleSetValueNFT: (value: any) => void;
  status: StatusWithdrawNFT;
  setStatus: (value: StatusWithdrawNFT) => void;
  isShowLearnMore: boolean;
  handleLearnMore: (value: boolean) => void;
}

const WithDrawNFT = React.createContext<WithdrawNFT>({} as WithdrawNFT);

export const WithdrawNFT: React.FC = ({ children }) => {
  const [valueNFT, setValueNFT] = useState({});
  const [isShowLearnMore, setIsShowLearnMore] = useState<boolean>(false);
  const [status, setStatus] = useState(StatusWithdrawNFT.MAIN_SCREEN);
  const handleSetValueNFT = (value: any) => {
    setValueNFT(value);
  };
  const handleLearnMore = (isValue: boolean) => {
    setIsShowLearnMore(isValue);
  };

  return (
    <WithDrawNFT.Provider
      value={{
        valueNFT,
        handleSetValueNFT,
        status,
        setStatus,
        isShowLearnMore,
        handleLearnMore
      }}>
      {children}
    </WithDrawNFT.Provider>
  );
};

export const useWithDrawNFTContext = () => useContext(WithDrawNFT);
