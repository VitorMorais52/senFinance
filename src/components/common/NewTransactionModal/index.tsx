import { FormEvent, useState } from "react";
import Modal from "react-modal";

import { useTransactions } from "../../../hooks/useTransactions";

import closeImg from "../../../assets/close.svg";
import incomeImg from "../../../assets/income.svg";
import outcomeImg from "../../../assets/outcome.svg";

import "./index.css";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}
export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("deposit");

  async function handleCreateNewTransaction(e: FormEvent) {
    e.preventDefault();

    await createTransaction({ title, category, amount, type });

    setTitle("");
    setAmount(0);
    setCategory("");
    setType("deposit");
    onRequestClose();
  }

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
      <form onSubmit={handleCreateNewTransaction}>
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
            <img src={outcomeImg} alt="Saída" />
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
