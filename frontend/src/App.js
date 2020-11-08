// export default App;
import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./Home";
import Signup from "./Signupmk";
import Login from "./Loginmk";
import { auth } from "./helpers/helpers";
import Feature from './Feature';
import Header from './Header';
import Footer from './Footer';
import PrivateHeader from './privateHeader';

const PrivateRoute = ({
  component: Component,
  authenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <React.Fragment>
            <PrivateHeader />
            <Component {...props} />
            <Footer />
          </React.Fragment>
        ) : (
            <Redirect
              to={{ pathname: "/", state: { from: props.location } }}
            />
          )
      }
    />
  );
};

const PublicRoute = ({
  component: Component,
  authenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <React.Fragment>
            <Header />
            <Component {...props} />
            <Footer />
          </React.Fragment>
        ) : (
            <Redirect to="/app" />
          )
      }
    />
  );
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    });
  }
  render() {
    console.log(this.state.authenticated);
    return this.state.loading === true ? (
      <h2>Loading...</h2>
    ) : (
        <Router>
          <Switch>
            <Route exact path="/" component={Home}></Route>

            <PrivateRoute
              path="/app"
              authenticated={this.state.authenticated}
              component={Feature}></PrivateRoute>
            <PublicRoute
              path="/signup"
              authenticated={this.state.authenticated}
              component={Signup}></PublicRoute>
            <PublicRoute
              path="/login"
              authenticated={this.state.authenticated}
              component={Login}></PublicRoute>
          </Switch>
        </Router>
      );
  }
}

export default App;