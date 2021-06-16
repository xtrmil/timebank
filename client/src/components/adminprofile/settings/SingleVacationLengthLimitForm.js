import React from "react";
import { updateSingleVacationRequestLengthLimit } from "../../../api/vacationRequest";
import * as yup from "yup";
import { Formik } from "formik";
import { Button, Form, Card } from "react-bootstrap";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../commonButtonStyling.scss";
import { useToast } from "../../../contexts/ToastContext";

const SingleVacationRequestLengthLimitForm = (props) => {
  const { setToastHeader, setToastMsg, setToast } = useToast();

  const { editDisabled, setEditDisabled, lengthLimit, getLength } = props;

  const schema = yup.object().shape({
    length: yup.number().required(),
  });

  const initialValues = {
    length: lengthLimit,
  };

  const onSubmitClicked = async (data) => {
    try {
      let response = await updateSingleVacationRequestLengthLimit(data);
      getLength();
      setEditDisabled(true);
      setToastHeader("Success");
      setToastMsg(response.data.msg);
      setToast(true);
    } catch (error) {
        setToastHeader("Error");
        setToastMsg(error.message);
        setToast(true);
    }
  };

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
          <Card>
            <Card.Body>
              <p>
                <strong>Max Length For a Vacation Request</strong>
              </p>
              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group>
                  <Form.Label> </Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="number"
                      name="length"
                      readOnly={editDisabled}
                      value={values.length}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!!errors.length && touched.length}
                    />
                    {editDisabled && (
                      <>
                        <button
                          className="edit-vacation-length-button btn-sm ml-2"
                          onClick={onEditClicked}
                        >
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                      </>
                    )}
                  </div>
                  <Form.Control.Feedback type="invalid">
                    {errors.length}
                  </Form.Control.Feedback>
                  <div></div>
                  {!editDisabled && (
                    <>
                      <Button
                        className="btn btn-sm btn-info ml-1 mt-1"
                        onClick={() => onCancelClicked(resetForm)}
                        variant="primary"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="btn btn-sm btn-info ml-1 mt-1"
                        type="submit"
                        variant="primary"
                      >
                        Save
                      </Button>
                    </>
                  )}
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        )}
      </Formik>
    </>
  );
};

export default SingleVacationRequestLengthLimitForm;
