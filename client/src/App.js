import React from "react";
import {BrowserRouter as Router, Switch, Redirect, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Dashboard from "./pages/Dashboard";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import VerifyLoginPage from "./pages/VerifyLoginPage"
import BootstrapNavbar from "./components/navbar/Navbar";
import PrivateRoute from "./components/utils/PrivateRoute";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import VacationRequestPage from "./pages/VacationRequestPage";

function App() {
  return (
      <Router>
        <div className="App">
            <BootstrapNavbar/>
           <Switch>
               <Route exact path="/"><Redirect to="/login"/></Route>
               <Route exact path="/login" component={LoginPage}/>
               <Route exact path="/verify" component={VerifyLoginPage}/>
               <PrivateRoute exact path="/home" component={Dashboard}/>
               <PrivateRoute exact path="/admin" component={AdminPage}/>
               <PrivateRoute exact path="/profile" component={ProfilePage}/>
               <PrivateRoute exact path="/request/user/:id" component={VacationRequestPage}/>
               <Route path="*" component={NotFoundPage}/>
           </Switch>
        </div>
      </Router>
  );
}

export default App;
