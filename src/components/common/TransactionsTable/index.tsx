import { useTransactions } from "../../../hooks/useTransactions";
import { useTransactionModal } from "../../../hooks/useTransactionModal";

import deleteIcon from "../../../assets/delete.svg";
import editIcon from "../../../assets/edit.svg";

import "./index.css";

type Transaction = {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
};

function TransactionsTable() {
  const { transactions, removeTransaction, setTransactionEdit } =
    useTransactions();
  const { handleOpenTransactionModal } = useTransactionModal();

  function handleEditTransaction(transaction: Transaction) {
    setTransactionEdit({ ...transaction });
    handleOpenTransactionModal();
  }

  return (
    <div className="container-transactions-table">
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type + "-table"}>
                {new Intl.NumberFormat("pt-br", {
                  style: "currency",
                  currency: "BRL",
                }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat("pt-br").format(
                  new Date(transaction.createdAt)
                )}
              </td>
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
  );
}

export default TransactionsTable;
