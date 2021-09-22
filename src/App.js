import { Switch, Route } from "react-router-dom";
import React from "react";
import GlobalStateProvider from "./context/GlobalState";
import GlobalStyle from "./styles/GlobalStyle";
import Email from "./components/Email";
import PaymentMethods from "./components/PaymentMethods";
import PinPayment from "./components/PinPayment";
import PaymentDetails from "./components/PaymentDetails";
import Success from "./components/Success";
import InvalidRequest from "./components/InvalidRequest";
import ErrorComponent from "./components/ErrorComponent";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <GlobalStateProvider>
        <Switch>
          <Route path="/invalid-request" component={InvalidRequest} />
          <Route path="/success" component={Success} />
          <Route path="/pin-payment" component={PinPayment} />
          <Route path="/payment-details" component={PaymentDetails} />
          <Route path="/payment-methods" component={PaymentMethods} />
          <Route path="/email" component={Email} />
          <Route path="*" component={ErrorComponent} />
        </Switch>
      </GlobalStateProvider>
    </>
  );
};

export default App;
