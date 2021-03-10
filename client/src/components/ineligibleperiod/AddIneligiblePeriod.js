import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {Formik} from "formik";
import * as yup from "yup";
import {addIneligiblePeriod} from "../../api/ineligiblePeriod";
import {useAuth} from "../../context/Context"

const AddIneligiblePeriod = () => {
    const auth = useAuth();

    const [showModal, setShowModal] = useState(false);

    const onClickAddVacationRequest = () =>{
        setShowModal(true);
    }

    const onClickClose = () => {
        setShowModal(false);
    }

    const schema = yup.object().shape({
        startDate: yup.date("Invalid date").required("Start date is required."),
        endDate: yup.date("Invalid date").required("End date is required.")
    });

    const initialValues = {
        startDate: null,
        endDate: null
    }

    const onFormSubmit = (data) => {
        const startDate = new Date (data.startDate);
        const endDate = new Date (data.endDate);
        if (startDate.getTime() < endDate.getTime()){
            addIneligiblePeriod(data);
            onClickClose();
        }else { 
        }
    }

    return (
        <div>
            <Button className="ml-3" onClick={onClickAddVacationRequest}>Add Ineligible Period</Button>
            <Modal show={showModal}>
                <Modal.Body>
                    <h4 className="text-center">Add Ineligible Period</h4>

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
                                <Button className="mr-2" variant="secondary" onClick={onClickClose}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="primary">Add</Button>
                                </div>
                                <pre> {JSON.stringify(values, null, 2)} </pre>
                            </Form>
                        )}

                    </Formik>
                </Modal.Body>
            </Modal>

        </div>
    );
}

export default AddIneligiblePeriod
