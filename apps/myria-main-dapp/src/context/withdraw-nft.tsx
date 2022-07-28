import React, { useContext, useState } from 'react';
import { StatusWithdrawNFT } from 'src/types/marketplace';

interface WithdrawNFT {
  valueNFT: any;
  handleSetValueNFT: (value: any) => void;
  isWithdrawing: boolean;
  handleWithdrawing: (value: boolean) => void;
  status: StatusWithdrawNFT;
  setStatus: (value: StatusWithdrawNFT) => void;
}

const WithDrawNFT = React.createContext<WithdrawNFT>({} as WithdrawNFT);

export const WithfrawNFT: React.FC = ({ children }) => {
  const [valueNFT, setValueNFT] = useState({});
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [status, setStatus] = useState(StatusWithdrawNFT.MAIN_SCREEN);
  const handleSetValueNFT = (value: any) => {
    setValueNFT(value);
  };

  const handleWithdrawing = (isValue: boolean) => {
    setIsWithdrawing(isValue);
  };

  return (
    <WithDrawNFT.Provider
      value={{ valueNFT, handleSetValueNFT, isWithdrawing, handleWithdrawing, status, setStatus }}>
      {children}
    </WithDrawNFT.Provider>
  );
};

export const useWithDrawNFTContext = () => useContext(WithDrawNFT);
