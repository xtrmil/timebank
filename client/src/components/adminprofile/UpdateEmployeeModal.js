import React from "react";
import {Modal} from "react-bootstrap";
import EmployeeForm from "./EmployeeForm";
import IneligiblePeriodForm from "../ineligibleperiod/IneligiblePeriodForm";
import * as yup from "yup";

const UpdateEmployeeModal = (props) => {
    const {employee, showUpdateModal, setShowUpdateModal, onUpDateEmployeeClicked} = props;

    const initialValues = {
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        password: employee.password,
        isAdmin: employee.isAdmin
    }

    const schema = yup.object().shape({
        firstName: yup.string().required("Please enter a first name."),
        lastName: yup.string().required("Please enter a last name."),
        email: yup.string().email().required("Please enter a unique email."),
        password: yup.string(),
        isAdmin: yup.boolean().required(),
    });

    const onUpdateClicked = (data, setErrors) => {
        onUpDateEmployeeClicked(employee.id, data);
        setShowUpdateModal(false);
    }

    return(
        <>
            <Modal show={showUpdateModal}>
                <Modal.Body>
                    <h4 className="text-center">Update Employee: {employee.firstName} {employee.lastName}</h4>
                    <EmployeeForm
                        initialValues={initialValues}
                        schema={schema}
                        setShowModal={setShowUpdateModal}
                        onSubmitClicked={onUpdateClicked}/>
                </Modal.Body>

            </Modal>
        </>
    );
};

export default UpdateEmployeeModal;