import { FormEvent, useState, useEffect } from "react";
import Modal from "react-modal";

import { useTransactions } from "../../../hooks/useTransactions";
import { useTransactionModal } from "../../../hooks/useTransactionModal";

import { Transaction } from "../../../types/transaction";
import { parseCurrencyToFloat } from "../../../utils/formatData";

import closeImg from "../../../assets/close.svg";

import "./index.css";

type OptionsFilter = {
  type: string[];
  category: string[];
};

type FiltersModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

export function FiltersModal({ isOpen, onRequestClose }: FiltersModalProps) {
  const { transactions, filters, setFilters } = useTransactions();

  const [optionsFilters, setOptionsFilters] = useState<OptionsFilter>(
    {} as OptionsFilter
  );

  function getOptionsFilters() {
    const optionsType: string[] = [...new Set(transactions.map((t) => t.type))];
    const optionsCategory = [...new Set(transactions.map((t) => t.category))];
    setOptionsFilters({
      type: ["all", ...optionsType],
      category: ["all", ...optionsCategory],
    });
  }

  function translateOptions(option: string) {
    switch (option) {
      case "all":
        return "Todos(a)";
      case "deposit":
        return "Entrada";
      case "withdraw":
        return "Saída";
      default:
        return option;
    }
  }

  useEffect(() => {
    getOptionsFilters();
  }, [transactions]);

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
      <div className="container-filters">
        <h2>Filtros</h2>
        {Object.entries(optionsFilters).map(([filter, options], index) => (
          <div className="filter">
            <span>{filter === "type" ? "Tipo de entrada" : "Categoria"}</span>
            <select
              className="select"
              value={filters[filter]}
              onChange={(e) =>
                setFilters({ ...filters, [filter]: e.target.value })
              }
            >
              {options.map((option) => (
                <option value={option}>{translateOptions(option)}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default FiltersModal;
