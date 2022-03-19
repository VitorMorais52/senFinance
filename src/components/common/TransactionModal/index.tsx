import { FormEvent, useState, useEffect } from "react";
import Modal from "react-modal";

import { useTransactions } from "../../../hooks/useTransactions";
import { useTransactionModal } from "../../../hooks/useTransactionModal";

import { Transaction } from "../../../types/transaction";

import closeImg from "../../../assets/close.svg";
import incomeImg from "../../../assets/income.svg";
import outcomeImg from "../../../assets/outcome.svg";

import "./index.css";
import { parseCurrencyToFloat } from "../../../utils/formatData";

export function TransactionModal() {
  const {
    handleCloseTransactionModal: onRequestClose,
    isTransactionModalOpen: isOpen,
  } = useTransactionModal();

  const { createTransaction, transactionEdit, editTransaction } =
    useTransactions();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("deposit");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (transactionEdit) handleEditTransaction();
    else handleCreateNewTransaction();
  }

  async function handleCreateNewTransaction() {
    const amountFormatted = parseCurrencyToFloat(amount);
    await createTransaction({ title, category, amount: amountFormatted, type });
    setFields();
    onRequestClose();
  }

  async function handleEditTransaction() {
    const amountFormatted = parseCurrencyToFloat(amount);

    if (transactionEdit)
      await editTransaction({
        ...transactionEdit,
        title,
        category,
        amount: amountFormatted,
        type,
      });
    onRequestClose();
  }

  function setFields(transaction?: Transaction) {
    setTitle(transaction?.title || "");
    setAmount((transaction?.amount || "").toString());
    setCategory(transaction?.category || "");
    setType(transaction?.type || "deposit");
  }

  useEffect(() => {
    setFields(transactionEdit);
  }, [transactionEdit]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img className="img-type" src={closeImg} alt="Fechar modal" />
      </button>
      <form onSubmit={submit}>
        <h2>Cadastrar transação</h2>
        <input
          placeholder="Titulo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          pattern="(?:\.|,|[0-9])*"
          required
        />
        <div className="transactionTypeContainer">
          <button
            className={`radioBox ${type === "deposit" ? type : "unselected"}`}
            type="button"
            onClick={() => setType("deposit")}
          >
            <img className="img-type" src={incomeImg} alt="Deposit icon" />
            <span>Entrada</span>
          </button>
          <button
            type="button"
            className={`radioBox ${type === "withdraw" ? type : "unselected"}`}
            onClick={() => setType("withdraw")}
          >
            <img className="img-type" src={outcomeImg} alt="Withdraw icon" />
            <span>Saída</span>
          </button>
        </div>
        <input
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <button type="submit">
          {transactionEdit ? "Editar" : "Cadastrar"}
        </button>
      </form>
    </Modal>
  );
}

export default TransactionModal;
