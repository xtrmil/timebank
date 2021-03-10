import React,{useState} from "react";
import {Container,Button,Form} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Formik} from "formik";
import { Redirect } from 'react-router-dom';
import * as yup from "yup";
import { login } from "../../api/auth";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};
const LoginForm = () => {
  const [redirect,setRedirect] = useState();
  const[qrSecret,setQrSecret] = useState();
  const [verified, setVerified] = useState(false);
  const [email,setEmail] = useState();

  const onFormSubmit = async (data) => {
    const response = await login(data);

    if (response.status === "OK") {
      setEmail(data.email);
      if(response.data == null){
        setVerified(true);
      }
      setQrSecret(response.data);
      setRedirect("/verify");
    }
  };

  if (redirect) {
    return (
      <Redirect to={{ pathname: redirect, state: { qrSecret: qrSecret ,verified: verified, email: email} }} />
    );
  }
  return (
    
    <Container>
      <div>
        <h2>
          Sign In
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(data) => onFormSubmit(data)}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleChange,
            handleBlur,
          }) => (
            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group>
                
                <Form.Label>
                  Email
                </Form.Label>
                <Form.Control name="email" value={values.email} type="email" onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.email && touched.email}/>
                <Form.Control.Feedback type="invalid" >{errors.email} </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  Password
                </Form.Label>
                <Form.Control name="password" value={values.password} type="password" onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.password && touched.password}/>
                <Form.Control.Feedback type="invalid" >{errors.password} </Form.Control.Feedback>
              </Form.Group>

              <Button type="submit" variant= "success">
                Sign In
              </Button>

              <Link to="" variant="body2">
                    Forgot password?
              </Link>

            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default LoginForm;
