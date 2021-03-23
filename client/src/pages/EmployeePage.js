import React, {useState, useEffect} from "react";
import {Row, Button, Col} from "react-bootstrap";
import {addUser, deleteUser, getAllUsers, updateUser} from "../api/user";
import EmployeeTable from "../components/adminprofile/EmployeeTable";
import AddEmployeeModal from "../components/adminprofile/AddEmployeeModal";

const EmployeePage = () => {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    
    const fetchEmployees = async () => {
        try{
            let response = await getAllUsers();
            setEmployees(response.data.data);
        }catch(error){
            console.log(error);
        }finally {
            setIsLoading(false);
        }
    }

    const onAddEmployeeClicked = async (data, setErrors) => {
        try{
            await addUser(data);
            await fetchEmployees();
            setShowAddModal(false);
        }catch (error){
            setErrors({email: error.response.data.msg});
        }
    }

    const onUpdateEmployeeClicked = async (id, body) => {
        try{
            await updateUser(id, body);
            await fetchEmployees();
        }catch (error){
            console.log(error.response.data.msg);
        }
    }

    const onDeleteEmployeeClicked = async (id) => {
        try{
            await deleteUser(id);
            await fetchEmployees();
        }catch(error){
            console.log(error.response.data.msg);
        }
    }

    useEffect(() => {
        fetchEmployees();
    }, []);

    return(
        <>
            <Row className=" mt-4 justify-content-center" noGutters>
                <h5>All Employees</h5>

            </Row>
            <Row className="mb-2 justify-content-end" noGutters>
                <Button onClick={() => setShowAddModal(true)} className="btn btn-sm btn-info">
                    Add New Employee
                </Button>
            </Row>

            <EmployeeTable
                employees={employees}
                isLoading={isLoading}
                onUpdateEmployeeClicked={onUpdateEmployeeClicked}
                onDeleteEmployeeClicked={onDeleteEmployeeClicked}/>

            <AddEmployeeModal
                setShowModal={setShowAddModal}
                showModal={showAddModal}
                onAddEmployeeClicked={onAddEmployeeClicked}/>

        </>
    );
};

export default EmployeePage;