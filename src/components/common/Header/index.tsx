import { useTransactionModal } from "../../../hooks/useTransactionModal";

import "./index.css";

function Header() {
  const { handleOpenTransactionModal } = useTransactionModal();
  return (
    <header className="container">
      <div className="content">
        <h1>Sen Finança</h1>
        <button type="button" onClick={handleOpenTransactionModal}>
          Nova transação
        </button>
      </div>
    </header>
  );
}

export default Header;
