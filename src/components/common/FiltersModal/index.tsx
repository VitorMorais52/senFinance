import { useState, useEffect } from "react";
import Modal from "react-modal";

import { useTransactions } from "../../../hooks/useTransactions";

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

  const handleInputDate =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFilters({ ...filters, [field]: value });
    };

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
          <div className="filter" key={filter}>
            <span>{filter === "type" ? "Tipo de entrada" : "Categoria"}</span>
            <select
              className="select"
              value={filters[filter]}
              onChange={(e) =>
                setFilters({ ...filters, [filter]: e.target.value })
              }
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {translateOptions(option)}
                </option>
              ))}
            </select>
          </div>
        ))}
        <div className="filter">
          <span>Data</span>
          <input
            type="date"
            className="input-date"
            value={filters.dateMin}
            onChange={handleInputDate("dateMin")}
          />
          <span className="span-date">até</span>
          <input
            type="date"
            className="input-date"
            onChange={handleInputDate("dateMax")}
            value={filters.dateMax}
            pattern="dd-MM-yyyy"
          />
        </div>
      </div>
    </Modal>
  );
}

export default FiltersModal;
