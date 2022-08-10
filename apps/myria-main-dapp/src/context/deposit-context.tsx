import React, { useContext, useState } from 'react';

interface Deposit {
  amount: number;
  handleSetAmount: (value: number) => void;
  showMessageDeposit: boolean;
  handleShowMessageDeposit: (value: boolean) => void;
}

const DepositContext = React.createContext<Deposit>({} as Deposit);

export const DepositProvider: React.FC = ({ children }) => {
  const [amount, setAmount] = useState(0);
  const [showMessageDeposit, setShowMessageDeposit] = useState(false);
  const handleSetAmount = (value: number) => {
    setAmount(value);
  };

  const handleShowMessageDeposit = (isValue: boolean) => {
    setShowMessageDeposit(isValue);
  };

  return (
    <DepositContext.Provider
      value={{ showMessageDeposit, handleShowMessageDeposit, amount, handleSetAmount }}>
      {children}
    </DepositContext.Provider>
  );
};

export const useDepositContext = () => useContext(DepositContext);
