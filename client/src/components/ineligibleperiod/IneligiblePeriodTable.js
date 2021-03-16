import React, {useState, useEffect} from "react";
import {getAllIneligiblePeriods} from "../../api/ineligiblePeriod";
import {Row, Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPencilAlt, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import UpdateIneligiblePeriodModal from "./UpdateIneligiblePeriodModal";
import DeleteIneligiblePeriodModal from "./DeleteIneligiblePeriodModal";


const IneligiblePeriodTable = () => {

    const [ineligiblePeriods, setIneligiblePeriods] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchIneligiblePeriods = async () => {
        try{
            let response = await getAllIneligiblePeriods();
            console.log(response);
            setIneligiblePeriods(response.data.data);
        }catch(error) {
            console.log(error);
        } finally{
            setIsLoading(false);
        }
    }

    useEffect( () => {
        fetchIneligiblePeriods();
    }, []);


   const table = ineligiblePeriods.map((period, id) => {
        return (
            <tr className="text-center" key={period.id}>
                <td>{period.startDate}</td>
                <td>{period.endDate}</td>
                <td>{period.createdBy.firstName} {period.createdBy.lastName}</td>
                <td>
                    <UpdateIneligiblePeriodModal
                        period={period}
                    />
                    <DeleteIneligiblePeriodModal
                        period={period}
                    />

                </td>
            </tr>
        );
    })


    return(
        <>
            <Row className="justify-content-center mb-3">
                <h5>All Ineligible Periods</h5>
            </Row>
            <Table responsive striped>
                <thead>
                    <tr className="text-center">
                        <th>Start date</th>
                        <th>End Date</th>
                        <th>Created By</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading
                        ? <tr><td><strong>Loading...</strong></td></tr>
                        : (ineligiblePeriods.length > 0 ? (table) : <tr><td>There are no records.</td></tr>)
                    }
                </tbody>
            </Table>
        </>

    );
};

export default IneligiblePeriodTable;