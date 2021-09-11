import { Switch, Route } from "react-router-dom";
import React from "react";
import GlobalStateProvider from "./context/GlobalState";
import GlobalStyle from "./styles/GlobalStyle";
import Email from "./components/Email";
import Payment from "./components/Payment";
import PinPayment from "./components/PinPayment";
import Success from "./components/Success";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <GlobalStateProvider>
        <Switch>
          <Route path="/success" component={Success} />
          <Route path="/pin-payment" component={PinPayment} />
          <Route path="/payment" component={Payment} />
          <Route path="/email" component={Email} />
        </Switch>
      </GlobalStateProvider>
    </>
  );
};

export default App;
