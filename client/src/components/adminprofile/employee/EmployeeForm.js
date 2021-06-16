import React from "react";
import {Formik} from "formik";
import {Button, Form} from "react-bootstrap";

const EmployeeForm = (props) => {
    const{setShowModal, initialValues, schema, onSubmitClicked} = props;

    const onCancelClicked = () => {
        setShowModal(false);
    }

    return(
       <Formik
           initialValues={initialValues}
           validationSchema={schema}
           onSubmit={(data, {setErrors}) => onSubmitClicked(data, setErrors)}
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
                             <strong>First name: </strong>
                         </Form.Label>
                         <Form.Control
                             type="text"
                             name="firstName"
                             value={values.firstName}
                             onChange={handleChange}
                             onBlur={handleBlur}
                             isInvalid={!!errors.firstName && touched.firstName}
                         />
                         <Form.Control.Feedback type="invalid">
                             {errors.firstName}
                         </Form.Control.Feedback>
                     </Form.Group>

                     <Form.Group>
                         <Form.Label>
                             <strong>Last name: </strong>
                         </Form.Label>
                         <Form.Control
                             type="text"
                             name="lastName"
                             value={values.lastName}
                             onChange={handleChange}
                             onBlur={handleBlur}
                             isInvalid={!!errors.lastName && touched.lastName}
                         />
                         <Form.Control.Feedback type="invalid">
                             {errors.lastName}
                         </Form.Control.Feedback>
                     </Form.Group>

                     <Form.Group>
                         <Form.Label>
                             <strong>Email: </strong>
                         </Form.Label>
                         <Form.Control
                             type="email"
                             name="email"
                             value={values.email}
                             onChange={handleChange}
                             onBlur={handleBlur}
                             isInvalid={!!errors.email && touched.email}
                         />
                         <Form.Control.Feedback type="invalid">
                             {errors.email}
                         </Form.Control.Feedback>
                     </Form.Group>

                     <Form.Group>
                         <Form.Label>
                             <strong>Password: </strong>
                         </Form.Label>
                         <Form.Control
                             type="password"
                             name="password"
                             value={values.password}
                             onChange={handleChange}
                             onBlur={handleBlur}
                             isInvalid={!!errors.password && touched.password}
                         />
                         <Form.Control.Feedback type="invalid">
                             {errors.password}
                         </Form.Control.Feedback>
                     </Form.Group>

                     <Form.Group>
                         <Form.Label>
                             <strong>Administrator Privileges: </strong>
                         </Form.Label>
                         <Form.Check>
                            <Form.Check.Input
                                type="checkbox"
                                name="isAdmin"
                                value={values.isAdmin}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={!!errors.isAdmin && touched.isAdmin}/>
                            <Form.Check.Label>Yes</Form.Check.Label>
                         </Form.Check>
                     </Form.Group>

                     <div className="text-center mt-5">
                         <Button className="mr-2" variant="secondary" onClick={onCancelClicked}>
                             Cancel
                         </Button>
                         <Button type="submit" variant="primary">Save</Button>
                     </div>
                 </Form>
           )}

       </Formik>
    )

}

export default EmployeeForm;