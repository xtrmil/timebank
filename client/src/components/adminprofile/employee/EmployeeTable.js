import React, {useState} from "react";
import {Button, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import UpdateEmployeeModal from "./UpdateEmployeeModal";
import DeleteEmployeeModal from "./DeleteEmployeeModal";

const EmployeeTable = (props) => {

    const {isLoading, employees, onUpdateEmployeeClicked, onDeleteEmployeeClicked} = props;
    console.log(employees)

    const [employee, setEmployee] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const onShowUpdateModalClicked = (employee) => {
        setEmployee(employee);
        setShowUpdateModal(true);
    }

    const onShowDeleteModalClicked = (employee) => {
        setEmployee(employee);
        setShowDeleteModal(true);
    }

    const table = employees.map((employee, id) => {
        return(
            <tr className="text-center" key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName} {employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.isAdmin}</td>
                <td className="d-flex justify-content-center">
                    <button onClick={() => onShowUpdateModalClicked(employee)}
                            className="edit-button btn-sm mr-2">
                        <FontAwesomeIcon color={"white"} icon={faPencilAlt}/>
                    </button>
                    <button onClick={() => onShowDeleteModalClicked(employee)}
                            className="delete-button btn-sm">
                        <FontAwesomeIcon color={"white"} icon={faTrashAlt}/>
                    </button>
                </td>
            </tr>
        );
    });

    return(
        <>
            <Table responsive className="table-hover table-sm table-styling">
                <thead className="table-secondary">
                <tr className="text-center">
                    <th>Employee id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin privileges</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {isLoading
                    ? <tr><td><strong>Loading...</strong></td></tr>
                    : (employees.length > 0 ? (table) : <tr><td>There are no records.</td></tr>)
                }
                </tbody>
            </Table>

            <UpdateEmployeeModal
                employee={employee}
                showUpdateModal={showUpdateModal}
                setShowUpdateModal={setShowUpdateModal}
                onUpDateEmployeeClicked={onUpdateEmployeeClicked}
            />

            <DeleteEmployeeModal
                employee={employee}
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                onDeleteEmployeeClicked={onDeleteEmployeeClicked}
            />
        </>
    );
};

export default EmployeeTable;