import { useTransactions } from "../../../hooks/useTransactions";

import incomeImg from "../../../assets/income.svg";
import outcomeImg from "../../../assets/outcome.svg";
import totalImg from "../../../assets/total.svg";

import "./index.css";
import { parseToCurrency } from "../../../utils/formatData";

function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "deposit") {
        acc.deposits += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.withdraws -= transaction.amount;
        acc.total -= transaction.amount;
      }
      return acc;
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  );

  return (
    <div className="container-summary">
      <div className="card">
        <header className="header-summary">
          <p>Entradas</p>
          <img src={incomeImg} alt="Deposit icon"></img>
        </header>
        <strong>{parseToCurrency(summary.deposits)}</strong>
      </div>
      <div className="card">
        <header className="header-summary">
          <p>Saídas</p>
          <img src={outcomeImg} alt="Withdraw icon"></img>
        </header>
        <strong>{parseToCurrency(summary.withdraws)}</strong>
      </div>
      <div className="card-highlight">
        <header className="header-summary">
          <p>Total</p>
          <img src={totalImg} alt="Total icon"></img>
        </header>
        <strong>{parseToCurrency(summary.total)}</strong>
      </div>
    </div>
  );
}

export default Summary;
