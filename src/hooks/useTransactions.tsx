import { useState, createContext, useContext, useEffect } from "react";
import { Transaction } from "../types/transaction";

type TransactionInput = Omit<Transaction, "id" | "createdAt">;

type TransactionsProviderProps = {
  children: React.ReactNode;
};

type TransactionsContextData = {
  transactions: Transaction[];
  transactionEdit: Transaction | undefined;
  setTransactionEdit: (transaction: Transaction | undefined) => void;
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  editTransaction: (transaction: Transaction) => Promise<void>;
  removeTransaction: (id: number) => Promise<void>;
};

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionEdit, setTransactionEdit] = useState<
    Transaction | undefined
  >();

  async function createTransaction(transaction: TransactionInput) {
    const id = transactions.length + 1;
    const createdAt = new Date().toString();
    setTransactions([...transactions, { id, createdAt, ...transaction }]);
  }

  async function editTransaction(transaction: Transaction) {
    const indexEdit = transactions.findIndex(
      (OldTransaction) => OldTransaction.id === transaction.id
    );

    const newTransactions = transactions;
    newTransactions[indexEdit] = { ...transaction };

    setTransactions([...newTransactions]);
  }

  async function removeTransaction(id: number) {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  }

  useEffect(() => {
    const transactionsStorage = localStorage.getItem(
      "@SenFinance:transactions"
    );
    if (transactionsStorage) {
      setTransactions(JSON.parse(transactionsStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "@SenFinance:transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        transactionEdit,
        setTransactionEdit,
        createTransaction,
        editTransaction,
        removeTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}
