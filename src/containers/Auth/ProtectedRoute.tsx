import React from "react";
import { getTokenFromLocalStorage } from "../../utils/auth";
import { Route, useHistory, RouteProps } from "react-router-dom";
import TopBar from "../Navigation/TopBar";
import { History } from "history";

const ProtectedRoute = ({ component, ...rest }: RouteProps) => {
  const history = useHistory<History>();
  const token = getTokenFromLocalStorage();
  if (!token) {
    history.push("/");
    return null;
  }
  return (
    <div className="route">
      <TopBar history={history} />
      <Route component={component} {...rest} />
    </div>
  );
};

export default ProtectedRoute;
