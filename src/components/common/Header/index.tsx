import "./index.css";

type HeaderProps = {
  onOpenNewTransactionModal: () => void;
};

function Header({ onOpenNewTransactionModal }: HeaderProps) {
  return (
    <header className="container">
      <div className="content">
        <h1>Sen Finança</h1>
        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova transação
        </button>
      </div>
    </header>
  );
}

export default Header;
