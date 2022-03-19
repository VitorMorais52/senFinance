import { useState, createContext, useContext } from "react";

import { useTransactions } from "../hooks/useTransactions";

type Transaction = {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
};

type TransactionModalProviderProps = {
  children: React.ReactNode;
};

type TransactionModalContextProps = {
  isTransactionModalOpen: boolean;
  handleOpenTransactionModal: () => void;
  handleCloseTransactionModal: () => void;
};

const TransactionModalContext = createContext<TransactionModalContextProps>(
  {} as TransactionModalContextProps
);

export function TransactionModalProvider({
  children,
}: TransactionModalProviderProps) {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  function handleOpenTransactionModal() {
    setIsTransactionModalOpen(true);
  }

  function handleCloseTransactionModal() {
    setIsTransactionModalOpen(false);
  }

  return (
    <TransactionModalContext.Provider
      value={{
        isTransactionModalOpen,
        handleOpenTransactionModal,
        handleCloseTransactionModal,
      }}
    >
      {children}
    </TransactionModalContext.Provider>
  );
}

export function useTransactionModal() {
  const context = useContext(TransactionModalContext);
  return context;
}
