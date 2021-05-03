import React from "react";
import "./App.css";
import { GlobalStyle } from "./styles/globalStyle";
import { MainTable } from "./component/mainTable";

const App: React.FC<{}> = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <MainTable />
    </React.Fragment>
  );
};

export default App;
