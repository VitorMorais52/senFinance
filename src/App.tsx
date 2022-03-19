import Modal from "react-modal";

import { TransactionsProvider } from "./hooks/useTransactions";
import { TransactionModalProvider } from "./hooks/useTransactionModal";

import Header from "./components/common/Header";
import Dashboard from "./components/pages/Dashboard";
import TransactionModal from "./components/common/TransactionModal";

//styles
import "./App.css";

Modal.setAppElement("#root");

function App() {
  return (
    <div className="App">
      <TransactionsProvider>
        <TransactionModalProvider>
          <Header />
          <Dashboard />
          <TransactionModal />
        </TransactionModalProvider>
      </TransactionsProvider>
    </div>
  );
}

export default App;
