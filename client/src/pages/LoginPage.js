import React from "react";
import LoginForm from "../forms/LoginForm";
import {useAuth} from '../context/Context'
import { Redirect } from "react-router-dom";

const LoginPage = () => {

    const {isLoading,isLoggedIn} = useAuth();
    if(!isLoading && isLoggedIn){
      return  <Redirect to="/home"/>
    }
    
    return(
        !isLoading &&
        <div>
            <LoginForm/>
        </div>
    )
}

export default LoginPage;