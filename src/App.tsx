import { useContext } from "react";
import Modal from "react-modal";

import { TransactionsProvider, useTransactions } from "./hooks/useTransactions";
import { TransactionModalProvider } from "./hooks/useTransactionModal";

import Header from "./components/common/Header";
import Dashboard from "./components/pages/Dashboard";
import NewTransactionModal from "./components/common/NewTransactionModal";

//styles
import "./App.css";

Modal.setAppElement("#root");

function App() {
  const { transactionEdit } = useTransactions();
  return (
    <div className="App">
      <TransactionsProvider>
        <TransactionModalProvider>
          <Header />
          <Dashboard />
          <NewTransactionModal />
        </TransactionModalProvider>
      </TransactionsProvider>
    </div>
  );
}

export default App;
