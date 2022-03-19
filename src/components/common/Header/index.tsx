import "./index.css";

interface HeaderProps {}

function Header({}: HeaderProps) {
  return (
    <div className="container">
      <div className="content">
        <h1>Sen Finança</h1>
        <button type="button">Nova transação</button>
      </div>
    </div>
  );
}

export default Header;
