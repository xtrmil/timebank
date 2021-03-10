import React from "react";
import * as yup from "yup";
import {Formik} from "formik";
import {Button, Form, Modal} from "react-bootstrap";

const VacationRequestForm = (props) => {
    const {setShowModal, initialValues, onSubmitClicked} = props;

    const onClickClose = () => {
        setShowModal(false);
    }

    const schema = yup.object().shape({
        title: yup.string().required("Please enter a title."),
        startDate: yup.date("Invalid date").required("Start date is required."),
        endDate: yup.date("Invalid date").required("End date is required."),
        description: yup.string()
    });

    return(
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
                  handleBlur,
              }) => (
                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group>
                        <Form.Label>
                            <strong>Title:</strong>
                        </Form.Label>
                        <Form.Control type="text"
                                      name="title"
                                      value={values.title}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      isInvalid={!!errors.title && touched.title}/>
                        <Form.Control.Feedback
                            type="invalid" >
                            {errors.title}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            <strong>Start Date:</strong>
                        </Form.Label>
                        <Form.Control type="date"
                                      name="startDate"
                                      value={values.startDate}
                                      max={values.endDate}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      isInvalid={!!errors.startDate && touched.startDate}/>
                        <Form.Control.Feedback
                            type="invalid"
                        >
                            {errors.startDate}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            <strong>End Date:</strong>
                        </Form.Label>
                        <Form.Control type="date"
                                      name="endDate"
                                      value={values.endDate}
                                      min={values.startDate}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      isInvalid={!!errors.endDate && touched.endDate}/>
                        <Form.Control.Feedback
                            type="invalid" >
                            {errors.endDate}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            <strong>Description:</strong>
                        </Form.Label>
                        <Form.Control type="text"
                                      as = "textarea"
                                      maxLength={255}
                                      name="description"
                                      value={values.description}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      isInvalid={!!errors.description && touched.description}/>
                        <Form.Control.Feedback
                            type="invalid" >
                            {errors.description}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="text-center mt-5">
                    <Button className="mr-2" variant="secondary" onClick={onClickClose}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary">Save</Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default VacationRequestForm;