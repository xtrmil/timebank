import React from "react";
import { updateSingleVacationRequestLengthLimit } from "../../../api/vacationRequest";
import * as yup from "yup";
import { Formik } from "formik";
import { Button, Form, Row } from "react-bootstrap";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SingleVacationRequestLengthLimitForm = (props) => {

    const {
        editDisabled,
        setEditDisabled,
        lengthLimit,
        getLength
    } = props;


    const schema = yup.object().shape({
        length: yup.number().required()
    });

    const initialValues = {
        length: lengthLimit
    };

    const onSubmitClicked = async (data) => {
        console.log(data);
        await updateSingleVacationRequestLengthLimit(data);
        getLength();
        setEditDisabled(true);

    }

    const onCancelClicked = (resetForm) => {
        resetForm();
        setEditDisabled(true);
    };

    const onEditClicked = () => {
        setEditDisabled(false);
    };
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={(data) => onSubmitClicked(data)}
            >
                {({
                    values,
                    resetForm,
                    errors,
                    touched,
                    handleSubmit,
                    handleChange,
                    handleBlur,
                }) => (
                    <Form onSubmit={handleSubmit} noValidate>
                        
                            <Form.Group>
                                <Form.Label>
                                    {" "}
                                    <strong>Max length for single vacationrequest </strong>
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="length"
                                    readOnly={editDisabled}
                                    value={values.length}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.length && touched.length}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.length}
                                </Form.Control.Feedback>

                                <div className="justify-content-center text-center">
                                    {editDisabled && (
                                        <>
                                            <button
                                                className="btn edit-button btn-sm mr-2"
                                                onClick={onEditClicked}>
                                                 <FontAwesomeIcon color={"white"} icon={faPencilAlt}/>
                                            </button>
                                        </>
                                    )}
                                    {!editDisabled && (
                                        <>
                                            <Button
                                                className="mr-2"
                                                onClick={() => onCancelClicked(resetForm)}
                                                variant="primary">
                                                Cancel</Button>
                                            <Button
                                                type="submit"
                                                variant="primary">
                                                Save
                                    </Button>
                                        </>
                                    )}
                                </div>
                            </Form.Group>



                      
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default SingleVacationRequestLengthLimitForm;