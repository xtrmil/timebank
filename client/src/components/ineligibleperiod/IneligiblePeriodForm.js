import React from "react";
import * as yup from "yup";
import {Formik} from "formik";
import {Button, Form} from "react-bootstrap";

const IneligiblePeriodForm = (props) => {
    const{setShowModal, initialValues, onSubmitClicked} = props;

    const onCloseClicked = () => {
        setShowModal(false);
    }

    const schema = yup.object().shape({
        startDate: yup.date("Invalid date").required("Start date is required."),
        endDate: yup.date("Invalid date").required("End date is required.")
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
                            type="invalid" >
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

                    <div className="text-center mt-5">
                        <Button className="mr-2" variant="secondary" onClick={onCloseClicked}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary">Save</Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default IneligiblePeriodForm;