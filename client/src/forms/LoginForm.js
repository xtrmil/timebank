import React,{useState} from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import { Formik, Form } from "formik";
import { Redirect } from 'react-router-dom';
import * as yup from "yup";
import { login } from "../api/auth";
import {useStyles} from './styles';

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


  const classes = useStyles();

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
    
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
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
                id="email"
                label="Email Address"
                required
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.email && !!touched.email}
                helperText={errors.email && touched.email && errors.email}
                FormHelperTextProps={{
                  error: !!errors.email && !!touched.email,
                  classes: { error: classes.error },
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                value={values.password}
                error={!!errors.password && !!touched.password}
                helperText={
                  errors.password && touched.password && errors.password
                }
                FormHelperTextProps={{ error:!!errors.password && !!touched.password ,classes:{error: classes.error}}}
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                label="Password"
                required
                type="password"
                id="password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default LoginForm;
