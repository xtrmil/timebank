import React,{useState,useEffect} from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "../context/Context";
import "./profilePage.scss";


const ProfileForm = (props) => {
    const {loggedInUser} = useAuth();
    const { onSubmitClicked, editDisabled,setEditDisabled} = props;


    const initialValues = {
        firstName: loggedInUser.firstName,
        lastName: loggedInUser.lastName,
        email: loggedInUser.email
    }

    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required()
    })

    const onCancelClicked = () => {
        setEditDisabled(true);
    }

    const onEditClicked = () => {
        setEditDisabled(false);
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(data) => onSubmitClicked(data)}
        >
            {({
                values,
                errors,
                touched,
                handleSubmit,
                handleChange,
                handleBlur

            }) => (
                <Form
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <Form.Group>
                        <Form.Label> <strong>First name: </strong></Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            readOnly={editDisabled}
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.firstName && touched.firstName}
                        />
                        <Form.Control.Feedback
                            type="invalid"
                        >
                            {errors.firstName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label> <strong>Last name: </strong></Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            readOnly={editDisabled}
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.lastName && touched.lastName}
                        />
                        <Form.Control.Feedback
                            type="invalid"
                        >
                            {errors.lastName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label> <strong>Email: </strong></Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            readOnly={editDisabled}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.email && touched.email}
                        />
                        <Form.Control.Feedback
                            type="invalid"
                        >
                            {errors.email}
                        </Form.Control.Feedback>

                    </Form.Group>
                    <div>
                        {editDisabled &&
                        <Button
                            onClick={onEditClicked}
                            variant="primary">
                            Edit
                        </Button>
                        }
                        {!editDisabled && <>
                        <Button
                            type="submit"
                            variant="primary">
                            Save
                        </Button>
                        <Button
                            onClick={onCancelClicked}
                            variant="primary">
                            Cancel
                        </Button> </>
                        }

                    </div>
                </Form>
            )}

        </Formik>
    )

}

export default ProfileForm;