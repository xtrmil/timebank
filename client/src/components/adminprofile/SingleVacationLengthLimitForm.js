import React from "react";
import { updateSingleVacationRequestLengthLimit } from "../../api/vacationRequest";
import * as yup from "yup";
import { Formik } from "formik";
import { Button, Form,Row } from "react-bootstrap";

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
                        <Row>
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
                        </Form.Group>


                        <div className="justify-content-center text-center">
                            {editDisabled && (
                                <>
                                    <Button
                                        className="mr-2"
                                        variant="primary"
                                        onClick={onEditClicked}>
                                        Edit
                                    </Button>
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
                        </Row>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default SingleVacationRequestLengthLimitForm;