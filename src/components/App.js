import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import Email from "./Email";
import Payment from "./Payment";
import PinPayment from "./PinPayment";
import Success from "./Success";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route path="/success" component={Success} />
        <Route path="/pin-payment" component={PinPayment} />
        <Route path="/payment" component={Payment} />
        <Route path="/email" component={Email} />
        <Route exact path="/" render={() => <Redirect to="/email" />} />
      </Switch>
    </>
  );
};

export default App;
