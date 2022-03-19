import React, { FormEvent, useState, useEffect } from "react";
import Modal from "react-modal";

import { useTransactions } from "../../../hooks/useTransactions";
import { useTransactionModal } from "../../../hooks/useTransactionModal";

import closeImg from "../../../assets/close.svg";
import incomeImg from "../../../assets/income.svg";
import outcomeImg from "../../../assets/outcome.svg";

import "./index.css";

type Transaction = {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
};

export function NewTransactionModal() {
  const {
    handleCloseTransactionModal: onRequestClose,
    isTransactionModalOpen: isOpen,
  } = useTransactionModal();

  const { createTransaction, transactionEdit, editTransaction } =
    useTransactions();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("deposit");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (transactionEdit) handleEditTransaction();
    else handleCreateNewTransaction();
  }

  function setFields(transaction?: Transaction) {
    setTitle(transaction?.title || "");
    setAmount(transaction?.amount || 0);
    setCategory(transaction?.category || "");
    setType(transaction?.type || "deposit");
  }

  async function handleCreateNewTransaction() {
    await createTransaction({ title, category, amount, type });
    setFields();
    onRequestClose();
  }

  async function handleEditTransaction() {
    if (transactionEdit)
      await editTransaction({
        ...transactionEdit,
        title,
        category,
        amount,
        type,
      });

    setTitle("");
    setAmount(0);
    setCategory("");
    setType("deposit");
    onRequestClose();
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
        />
        <input
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <div className="transactionTypeContainer">
          <button
            className={`radioBox ${type === "deposit" ? type : "unselected"}`}
            type="button"
            onClick={() => setType("deposit")}
          >
            <img className="img-type" src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </button>
          <button
            type="button"
            className={`radioBox ${type === "withdraw" ? type : "unselected"}`}
            onClick={() => setType("withdraw")}
          >
            <img className="img-type" src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </button>
        </div>
        <input
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </Modal>
  );
}

export default NewTransactionModal;
