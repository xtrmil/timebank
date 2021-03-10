import React from "react";
import {useAuth} from "../../context/Context";
import {Route, Redirect} from "react-router-dom";

const PrivateRoute = ({component: Component, ...rest}) => {
    const auth = useAuth();

    return(
      !auth.isLoading
          ? (
              auth.isLoggedIn ? <Route {...rest} render={(props) => <Component {...props}/>}/> : (<Redirect to="/login"/>)
          )
          : ""


    )
}

export default PrivateRoute;