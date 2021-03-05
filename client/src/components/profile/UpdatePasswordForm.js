import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import "./profilePage.scss";
import { updatePassword } from "../../api/user";

const UpdatePasswordForm = (props) => {
  const { setShowPasswordForm } = props;

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const schema = yup.object().shape({
    currentPassword: yup.string().required("Enter current password"),

    newPassword: yup
      .string()
      .min(8, " New password must be at least 8 characters")
      .when("currentPassword", {
        is: (value) => (value && value.length > 0 ? true : false),
        then: yup
          .string()
          .notOneOf(
            [yup.ref("currentPassword")],
            "New password cannot be the current password"
          )
          .required("Enter a new password"),
      }),

    confirmNewPassword: yup.string().when("newPassword", {
      is: (value) => (value && value.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf(
          [yup.ref("newPassword")],
          "Confirmed password do not match the new password"
        )
        .required("Enter a confirmed password"),
    }),
  });

  const onCancelClicked = () => {
    setShowPasswordForm(false);
  };

  const onSubmit = async (data, setErrors) => {
    const { currentPassword, newPassword } = data;
    const passwords = {
      currentPassword,
      newPassword,
    };
    try {
      await updatePassword(passwords);
      setShowPasswordForm(false);
    } catch (error) {
      setErrors({ currentPassword: error.response.data.msg });
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values, { setErrors }) => onSubmit(values, setErrors)}
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
              <strong>Current Password: </strong>
            </Form.Label>
            <Form.Control
              type="password"
              name="currentPassword"
              value={values.currentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.currentPassword && touched.currentPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.currentPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              <strong>New Password: </strong>
            </Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.newPassword && touched.newPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.newPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              <strong>Confirm Password: </strong>
            </Form.Label>
            <Form.Control
              type="password"
              name="confirmNewPassword"
              value={values.confirmNewPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={
                !!errors.confirmNewPassword && touched.confirmNewPassword
              }
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmNewPassword}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="text-center">
            <Button
              className="mr-2"
              onClick={onCancelClicked}
              variant="primary"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdatePasswordForm;
