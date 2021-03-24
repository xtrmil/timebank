import React, {useState, useEffect} from "react";
import {Row, Button, Col} from "react-bootstrap";
import {addUser, deleteUser, getAllUsers, updateUser} from "../api/user";
import EmployeeTable from "../components/adminprofile/EmployeeTable";
import AddEmployeeModal from "../components/adminprofile/AddEmployeeModal";
import {useToast} from "../contexts/ToastContext";

const EmployeePage = () => {

    const {setToastHeader, setToastMsg, setToast} = useToast();
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    
    const fetchEmployees = async () => {
        try{
            let response = await getAllUsers();
            setEmployees(response.data.data);
        }catch(error){
            setToastHeader("Error");
            setToastMsg(error.message);
            setToast(true);
        }finally {
            setIsLoading(false);
        }
    }

    const onAddEmployeeClicked = async (data, setErrors) => {
        try{
            let response = await addUser(data);
            setShowAddModal(false);
            setToastHeader("Success");
            setToastMsg(response.data.msg);
            setToast(true);
            await fetchEmployees();
        }catch (error){
            setToastHeader("Error");
            setToastMsg(error.message);
            setToast(true);
        }
    }

    const onUpdateEmployeeClicked = async (id, body) => {
        try{
            let response = await updateUser(id, body);
            setToastHeader("Success");
            setToastMsg(response.data.msg);
            setToast(true);
            await fetchEmployees();
        }catch (error){
            setToastHeader("Error");
            setToastMsg(error.message);
            setToast(true);
        }
    }

    const onDeleteEmployeeClicked = async (id) => {
        try{
            let response = await deleteUser(id);
            setToastHeader("Success");
            setToastMsg(response.data.msg);
            setToast(true);
            await fetchEmployees();
        }catch(error){
            setToastHeader("Error");
            setToastMsg(error.message);
            setToast(true);
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