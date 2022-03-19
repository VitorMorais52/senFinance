import Summary from "../../common/Summary";
import TransactionsTable from "../../common/TransactionsTable";

import "./index.css";

function Dashboard() {
  return (
    <main>
      <Summary />
      <TransactionsTable />
    </main>
  );
}

export default Dashboard;
