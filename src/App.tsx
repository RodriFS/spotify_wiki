import React from "react";

import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import Authorization from "./containers/Auth/Authorization";
import Authorized from "./containers/Auth/Authorized";
import Library from "./containers/Albums/Library";
import ArtistContainer from "./containers/Albums/ArtistContainer";
import ProtectedRoute from "./containers/Auth/ProtectedRoute";
import SingleAlbum from "./components/SingleAlbum";

import "./layout/index.scss";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Authorization} />
        <Route path="/authorized" component={Authorized} />
        <ProtectedRoute path="/mylibrary" component={Library} />
        <ProtectedRoute path="/artist" component={ArtistContainer} />
        <ProtectedRoute path="/album" component={SingleAlbum} />
      </Switch>
    </Router>
  );
}

export default App;
