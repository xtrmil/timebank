import React from "react";
import LoginForm from "../components/login/LoginForm";
import {useAuth} from '../contexts/AuthContext'
import { Redirect } from "react-router-dom";
import {Card, Container,Row} from 'react-bootstrap';
const LoginPage = () => {

    const {isLoading,isLoggedIn} = useAuth();
    if(!isLoading && isLoggedIn){
      return  <Redirect to="/home"/>
    }
    
    return(
        !isLoading &&
        <Container className="justify-content-center">
            <Row className="justify-content-center align-middle" noGutters>
            <Card className="w-50 mt-5">
                <Card.Body className="">
            <LoginForm/>
            </Card.Body>
            </Card>
            </Row>
        </Container>
    )
}

export default LoginPage;