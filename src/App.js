import React, { Fragment, useEffect } from "react";
import Home from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { AuthForm } from "./pages/AuthForm";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Card } from "./components/layouts/Card";
import { StickyHeadTable } from "./pages/Table";
import { Diagrams } from "./pages/Diagrams";
import InformCard from "./components/InformCard";
import { setUserToken } from "./utils/setUserToken";
import "./App.css";
/* REDUX */
import { Provider } from "react-redux";
import store from "./redux/store";

export const App = () => {
  useEffect(() => {
    setUserToken();
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Fragment>
            <Navbar />
            <Card />
            <Route exact path="/" component={Home} />
            <Route exact path="/table" component={StickyHeadTable} />
            <Route exact path="/table/:item" component={InformCard} />
            <Route exact path="/authform" component={AuthForm} />
            <Route exact path="/diagrams" component={Diagrams} />
          </Fragment>
        </Switch>
      </Router>
    </Provider>
  );
};
