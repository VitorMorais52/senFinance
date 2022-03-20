import { useState, createContext, useContext, useEffect } from "react";
import { Transaction } from "../types/transaction";
import { dateFormatToCompare } from "../utils/formatData";
import { getDate } from "../utils/genericFuntions";

type TransactionInput = Omit<Transaction, "id" | "createdAt">;

type Filters = {
  [key: string]: string;
  type: string;
  category: string;
};

type TransactionsProviderProps = {
  children: React.ReactNode;
};

type TransactionsContextData = {
  transactions: Transaction[];
  transactionEdit: Transaction | undefined;
  getFilteredTransactions: () => Transaction[];
  filters: Filters;
  setFilters: (filters: Filters) => void;
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
  const [filters, setFilters] = useState<Filters>({
    type: "all",
    category: "all",
    dateMin: "",
    dateMax: getDate(),
  });

  const [transactionEdit, setTransactionEdit] = useState<
    Transaction | undefined
  >();

  function getFilteredTransactions() {
    let filteredTransactions = transactions;
    if (filters.type !== "all") {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.type === filters.type
      );
    }
    if (filters.category !== "all") {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.category === filters.category
      );
    }
    if (filters.dateMin !== "" && new Date(filters.dateMin)) {
      const dateStringFormatted = dateFormatToCompare(filters.dateMin);
      const dateMin = new Date(dateStringFormatted);
      filteredTransactions = filteredTransactions.filter(
        (transaction) => new Date(transaction.createdAt) >= dateMin
      );
    }
    if (filters.dateMax !== "" && new Date(filters.dateMax)) {
      const dateStringFormatted = dateFormatToCompare(filters.dateMax);
      const dateMax = new Date(dateStringFormatted);
      filteredTransactions = filteredTransactions.filter(
        (transaction) => new Date(transaction.createdAt) <= dateMax
      );
    }

    return filteredTransactions;
  }

  async function createTransaction(transaction: TransactionInput) {
    const id = transactions.length + 1;
    const createdAt = getDate();
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
    console.log(transactions);
  }, [transactions]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        transactionEdit,
        setTransactionEdit,
        filters,
        setFilters,
        getFilteredTransactions,
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
