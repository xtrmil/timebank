
import { Formik } from "formik";
import { Form,Button,Container } from "react-bootstrap";
import React from "react";
import { Redirect } from "react-router-dom";
import "./VerifyLoginPage.scss";
import * as yup from "yup";
import { useStyles } from "../components/forms/styles";
import { verifyLogin } from "../api/auth";
import MobileStoreButton from "react-mobile-store-button";
import {Cookies} from 'react-cookie'
import {useAuth} from '../context/Context'
import {useHistory} from 'react-router-dom';
const initialValues = {
  code: "",
};
const schema = yup.object().shape({
  code: yup.number().required(),
});

const VerifyLoginPage = (props) => {
  const history = useHistory();
  const auth = useAuth();
  const classes = useStyles();
  const cookies = new Cookies();

  if (!props.location.state) {
    return <Redirect to="/login" />;
  }

  const { qrSecret, verified, email } = props.location.state;
  const onFormSubmit = async (data) => {

    const verifyRequest = {
      email,
      code: data.code,
    };
    const response = await verifyLogin(verifyRequest);
    const jwtToken = response.data;
     await cookies.set("session_token", jwtToken);
    auth.login();
    history.replace("/home");
  };
  return (
    <Container component="main" maxWidth="xs" className="verify-container">
      <div className={classes.paper}>
        {!verified && (
          <>
            <img src={qrSecret.qrUri} alt=""></img>
            <h3>{qrSecret.configCode}</h3>
          </>
        )}
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
                  Verification code
                </Form.Label>
                <Form.Control name="code" value={values.code} type="text" onChange={handleChange} onBlur={handleBlur} isInvalid={!!errors.code && touched.code} />
                <Form.Control.Feedback type="invalid" >{errors.code} </Form.Control.Feedback>
              </Form.Group>

              <Button type="submit" variant="success">
                Verify
              </Button>
            </Form>
          )}
        </Formik>
        <MobileStoreButton
          store="ios"
          url={"https://apps.apple.com/se/app/google-authenticator/id388497605"}
          linkProps={{ title: "iOS Store Button" }}
        />
        <MobileStoreButton
          store="android"
          url={"https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=sv&gl=US"}
          linkProps={{ title: "Android Store Button" }}
        />
      </div>
    </Container>
  );
};

export default VerifyLoginPage;
