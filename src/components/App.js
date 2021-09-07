import { Switch, Route } from "react-router-dom";
import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import Payment from "./Payment";
import Email from "./Email";
import Success from "./Success";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route path="/success" component={Success} />
        <Route path="/payment" component={Payment} />
        <Route path="/email" component={Email} />
      </Switch>
    </>
  );
};

export default App;
