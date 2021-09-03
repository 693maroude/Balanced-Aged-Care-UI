import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import Payment from "./Payment";
import Email from "./Email";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route path="/payment" component={Payment} />
        <Route path="/email" component={Email} />
        <Route path="/" render={() => <Redirect to="/email" />} />
      </Switch>
    </>
  );
};

export default App;
