import { useTransactions } from "../../../hooks/useTransactions";
import { useTransactionModal } from "../../../hooks/useTransactionModal";

import { Transaction } from "../../../types/transaction";

import { dateFormatToShow, parseToCurrency } from "../../../utils/formatData";

import FiltersModal from "../FiltersModal";

import deleteIcon from "../../../assets/delete.svg";
import editIcon from "../../../assets/edit.svg";

import "./index.css";
import { useState } from "react";

function TransactionsTable() {
  const {
    transactions,
    getFilteredTransactions,
    removeTransaction,
    setTransactionEdit,
  } = useTransactions();
  const { handleOpenTransactionModal } = useTransactionModal();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const filteredTransactions = getFilteredTransactions();

  function handleOpenFilterModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFilterModal() {
    setIsFiltersModalOpen(false);
  }

  function handleEditTransaction(transaction: Transaction) {
    setTransactionEdit({ ...transaction });
    handleOpenTransactionModal();
  }

  return (
    <>
      {transactions.length > 0 ? (
        <div className="container-transactions-table">
          <FiltersModal
            isOpen={isFiltersModalOpen}
            onRequestClose={handleCloseFilterModal}
          />
          <div className="filters">
            <button
              type="button"
              className="button-show-filter"
              onClick={handleOpenFilterModal}
            >
              <span>Filtros</span>
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Valor</th>
                <th>Categoria</th>
                <th>Data</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.title}</td>
                  <td className={transaction.type + "-table"}>
                    {parseToCurrency(transaction.amount)}
                  </td>
                  <td>{transaction.category}</td>
                  <td>{dateFormatToShow(transaction.createdAt)}</td>
                  <td>
                    <button
                      type="button"
                      className="button-handle-transaction"
                      onClick={() => handleEditTransaction(transaction)}
                    >
                      <img
                        className="img-button-transaction"
                        src={editIcon}
                        alt="Edit transaction"
                      />
                    </button>
                    <button
                      type="button"
                      className="button-handle-transaction"
                      onClick={() => removeTransaction(transaction.id)}
                    >
                      <img
                        className="img-button-transaction"
                        src={deleteIcon}
                        alt="Delete transaction"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="not-results">
          <h4>Nenhum registro encontrado.</h4>
          <span className="span-not-results">
            Registre sua primeira transação clicando em <b>Nova transação</b>
          </span>
        </div>
      )}
    </>
  );
}

export default TransactionsTable;
