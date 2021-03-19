import React from "react";
import {Modal} from "react-bootstrap";
import EmployeeForm from "./EmployeeForm";
import * as yup from "yup";

const AddEmployeeModal = (props) => {

    const {showModal, setShowModal, onAddEmployeeClicked} = props;

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        isAdmin: false,
    }

    const schema = yup.object().shape({
        firstName: yup.string().required("Please enter a first name."),
        lastName: yup.string().required("Please enter a last name."),
        email: yup.string().email().required("Please enter a unique email."),
        password: yup.string().required(),
        isAdmin: yup.boolean().required(),
    });

    return(
        <>
            <Modal show={showModal}>
                <Modal.Body>
                    <h4 className="text-center"> Add New Employee</h4>
                    <EmployeeForm
                        setShowModal={setShowModal}
                        initialValues={initialValues}
                        schema={schema}
                        onSubmitClicked={onAddEmployeeClicked}/>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddEmployeeModal;