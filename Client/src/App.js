import React from "react";
import Anchor from "./components/anchor/index";
import Header from "./components/Header/index";
import SignUp from "./components/user-login/SignUp";
import LogIn from "./components/user-login/LogIn";
import LandingPage from "./components/Landing-page/index";
import ContextList from "./components/contextlist/ContextList";
import "bootstrap/dist/css/bootstrap.css";
import "toastr/build/toastr.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserProvider from "./provider/UserProvider";
import "./App.css";
import SearchContext from "./components/contextlist/SearchContext";
function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/anchor" component={Anchor} />
            <Route path="/contextlist" component={ContextList} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/login" component={LogIn} />
            <Route path="/search-context" component={SearchContext} />
          </Switch>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
