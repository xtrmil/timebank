import React from "react";
import {BrowserRouter as Router, Switch, Redirect, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Dashboard from "./pages/Dashboard";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import VerifyLoginPage from "./pages/VerifyLoginPage"
import BootstrapNavbar from "./components/navbar/Navbar";
import PrivateRoute from "./utils/PrivateRoute";
import AdminPage from "./pages/AdminPage";
import MyProfilePage from "./pages/MyProfilePage";
import UserProfilePage from "./pages/UserProfilePage";
import VacationRequestDetailsPage from './pages/VacationRequestDetailsPage'
import Toaster from "./components/toast/Toaster";
import {useToast} from "./contexts/ToastContext";

function App() {
    const {toast,setToast, toastHeader, toastMsg} = useToast();

  return (
      <Router>
        <div className="App">
            <BootstrapNavbar/>
            {toast && (
                <Toaster
                    toastHeader={toastHeader}
                    toastMsg={toastMsg}
                    onClose={() => {setToast(false);}}
                />
            )}
           <Switch>
               <Route exact path="/"><Redirect to="/login"/></Route>
               <Route exact path="/login" component={LoginPage}/>
               <Route exact path="/verify" component={VerifyLoginPage}/>
               <PrivateRoute exact path="/home" component={Dashboard}/>
               <PrivateRoute exact path="/admin" component={AdminPage}/>
               <PrivateRoute exact path="/profile" component={MyProfilePage}/>
               <PrivateRoute exact path="/user/:id" component={UserProfilePage}/>
               <PrivateRoute exact path="/request/:id" component={VacationRequestDetailsPage}/>
               <Route path="*" component={NotFoundPage}/>
           </Switch>
        </div>
      </Router>
  );
}

export default App;
