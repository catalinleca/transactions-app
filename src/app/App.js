import * as React from "react";
import { useEffect } from "react";
import ApiClient from "../client";

function App() {
  useEffect(() => {
    const client = new ApiClient({
      baseURL: "http://localhost:3000"
    });

    client.transactions.getLarge().then((res) => {
      console.log(res);
    });
  }, []);
  return <div>Render your app here.</div>;
}

export default App;
