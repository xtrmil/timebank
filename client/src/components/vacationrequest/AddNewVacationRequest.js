 import React, {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {Formik} from "formik";
import * as yup from "yup";
import {Link} from "react-router-dom";
import {addVacationRequest} from "../../api/vacationRequest";
import {useAuth} from "../../context/Context"

const AddNewVacationRequest = () => {

    const auth = useAuth();

    const [showModal, setShowModal] = useState(false);

    const onClickAddVacationRequest = () =>{
        setShowModal(true);
    }

    const onClickClose = () => {
        setShowModal(false);
    }

    const schema = yup.object().shape({
        title: yup.string().required("Please enter a title."),
        startDate: yup.date("Invalid date").required("Start date is required."),
        endDate: yup.date("Invalid date").required("End date is required.")
    });

    const initialValues = {
        title: "",
        startDate: null,
        endDate: null
    }

    const onFormSubmit = (data) => {
        const startDate = new Date (data.startDate);
        const endDate = new Date (data.endDate);
        if (startDate.getTime() <= endDate.getTime()){
            console.log("success");
            const user = {id:auth.loggedInUser.id};
            data.user = user;
            addVacationRequest(data);
            onClickClose();
        }else {
            console.log("fail");
        }
        console.log(data);
    }

    return (
        <div>
            <Button className="ml-3" onClick={onClickAddVacationRequest}>Add Vacation Request</Button>
            <Modal show={showModal}>
                <Modal.Body>
                    <h4 className="text-center">Add Vacation Request</h4>

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
                                    <Button type="submit" variant="primary">Add</Button>
                                    <Button className="ml-2" variant="secondary" onClick={onClickClose}>
                                        Cancel
                                    </Button>
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

export default AddNewVacationRequest;