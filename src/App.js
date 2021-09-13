import { Switch, Route } from "react-router-dom";
import React from "react";
import GlobalStateProvider from "./context/GlobalState";
import GlobalStyle from "./styles/GlobalStyle";
import Email from "./components/Email";
import PaymentMethods from "./components/PaymentMethods";
import PinPayment from "./components/PinPayment";
import WireTransfer from "./components/WireTransfer";
import Success from "./components/Success";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <GlobalStateProvider>
        <Switch>
          <Route path="/success" component={Success} />
          <Route path="/pin-payment" component={PinPayment} />
          <Route path="/wire-transfer" component={WireTransfer} />
          <Route path="/payment-methods" component={PaymentMethods} />
          <Route path="/email" component={Email} />
        </Switch>
      </GlobalStateProvider>
    </>
  );
};

export default App;
