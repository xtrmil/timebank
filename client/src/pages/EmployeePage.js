import React, {useState, useEffect} from "react";
import {Row, Button} from "react-bootstrap";
import {getAllUsers} from "../api/user";
import EmployeeTable from "../components/adminprofile/EmployeeTable";

const EmployeePage = () => {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
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

    useEffect(() => {
        fetchEmployees();
    }, []);

    return(
        <>
            <Row className="justify-content-center mb-3">
                <h5>All Ineligible Periods</h5>
                <Button className="btn btn-sm btn-info">Add New Employee</Button>
            </Row>
            <EmployeeTable
                employees={employees}
                isLoading={isLoading}/>
            </>

    );
};

export default EmployeePage;