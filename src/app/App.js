import * as React from "react";
import { Layout } from "../components/Layout/Layout";
import { Transactions } from "../views/transactions/Transactions";

function App() {
  return (
    <div>
      <Layout>
        <Transactions />
      </Layout>
    </div>
  );
}

export default App;
