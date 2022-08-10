import React, { useContext, useState } from 'react';
import { StatusWithdrawNFT } from 'src/types/marketplace';

interface WithdrawNFT {
  valueNFT: any;
  handleSetValueNFT: (value: any) => void;
  visible: boolean;
  handleVisible: (value: boolean) => void;
  status: StatusWithdrawNFT;
  setStatus: (value: StatusWithdrawNFT) => void;
}

const PurchaseNFTContext = React.createContext<WithdrawNFT>({} as WithdrawNFT);

export const PurchaseNFT: React.FC = ({ children }) => {
  const [valueNFT, setValueNFT] = useState({});
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState(StatusWithdrawNFT.MAIN_SCREEN);
  const handleSetValueNFT = (value: any) => {
    setValueNFT(value);
  };
  const handleVisible = (value: boolean) => {
    setVisible(value);
  };
  return (
    <PurchaseNFTContext.Provider
      value={{ valueNFT, handleSetValueNFT, status, setStatus, visible, handleVisible }}>
      {children}
    </PurchaseNFTContext.Provider>
  );
};

export const usePurchaseNFTContext = () => useContext(PurchaseNFTContext);
