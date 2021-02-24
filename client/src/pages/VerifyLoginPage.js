import { Button, Container, TextField } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { Redirect } from "react-router-dom";
import "./VerifyLoginPage.scss";
import * as yup from "yup";
import { useStyles } from "../forms/styles";
import { verifyLogin } from "../api/auth";
import MobileStoreButton from "react-mobile-store-button";

const initialValues = {
  code: "",
};
const schema = yup.object().shape({
  code: yup.number().required(),
});

const VerifyLoginPage = (props) => {
  const classes = useStyles();

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
    console.log(jwtToken);
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
              <TextField
                variant="outlined"
                fullWidth
                id="code"
                label="Verification code"
                required
                name="code"
                value={values.code}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.code && !!touched.code}
                helperText={errors.code && touched.code && errors.code}
                FormHelperTextProps={{
                  error: !!errors.code && !!touched.code,
                  classes: { error: classes.error },
                }}
                autoComplete="off"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
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
