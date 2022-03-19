import { useState } from "react";
import Modal from "react-modal";

import { TransactionsProvider } from "./hooks/useTransactions";

import Header from "./components/common/Header";
import Dashboard from "./components/pages/Dashboard";
import NewTransactionModal from "./components/common/NewTransactionModal";

//styles
import "./App.css";

Modal.setAppElement("#root");

function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <div className="App">
      <TransactionsProvider>
        <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
        <Dashboard />
        <NewTransactionModal
          isOpen={isNewTransactionModalOpen}
          onRequestClose={handleCloseNewTransactionModal}
        />
      </TransactionsProvider>
    </div>
  );
}

export default App;
