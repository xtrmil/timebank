import React from "react";
import * as yup from "yup";
import {Formik} from "formik";
import {Button, Form} from "react-bootstrap";
import {useAuth} from "../context/Context";

const ProfileForm = (props) => {
    const {onSubmit} = props;
    const { loggedInUser} = useAuth();

    console.log(loggedInUser);

    const initialValues = {
        firstName: loggedInUser.firstName,
        lastName: loggedInUser.lastName,
        email: loggedInUser.email,
        password: loggedInUser.password
    }

    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string()
    })

    return(
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(data) => onSubmit(data)}
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
                         readOnly
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
                        readOnly
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
                        readOnly
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

                <Form.Group>
                    <Form.Label> <strong>Old password: </strong></Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.password && touched.password}
                    />
                    <Form.Control.Feedback
                        type="invalid"
                    >
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label> <strong>New password: </strong></Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.password && touched.password}
                    />
                    <Form.Control.Feedback
                        type="invalid"
                    >
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant="primary">Save</Button>
                </Form>
            )}

        </Formik>
    )

}

export default ProfileForm;