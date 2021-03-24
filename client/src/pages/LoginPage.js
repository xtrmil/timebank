import React from "react";
import LoginForm from "../components/login/LoginForm";
import {useAuth} from '../contexts/AuthContext'
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