import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from "react-router-dom";
import "./index.css";
import CreateService from "./pages/CreateService";
import Home from "./pages/Home";
import ServiceList from "./pages/ServiceList";
import * as serviceWorker from "./serviceWorker";
import EditService from "./pages/EditService";

const Routing = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/create">Create</NavLink>
          </li>
          <li>
            <NavLink to="/list">View list</NavLink>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/create" component={CreateService} />
        <Route
          path="/edit/:id"
          render={(
            { location }: { location: any } // todo: not sure where to get the type for this one..
          ) => <EditService service={location.state} />}
        />
        <Route path="/list" component={ServiceList} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
