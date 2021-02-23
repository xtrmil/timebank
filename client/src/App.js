import React from "react";
import {BrowserRouter as Router, Switch, Redirect, Route} from "react-router-dom";

import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyLoginPage from "./pages/VerifyLoginPage"

function App() {
  return (
      <Router>
        <div className="App">
           <Switch>
               <Route exact path="/">
                   <Redirect to="/login"/>
               </Route>
               <Route exact path="/login" component={LoginPage}/>
               <Route exact path="/verify" component={VerifyLoginPage}/>
               <Route exact path="/register" component={RegisterPage}/>
               <Route exact path="/home" component={Home}/>
               <Route path="*" component={NotFoundPage}/>
           </Switch>
        </div>
      </Router>
  );
}

export default App;
