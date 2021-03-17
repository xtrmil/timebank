import React, {useEffect, useState} from "react";
import {deleteIneligiblePeriodById, getAllIneligiblePeriods, updateIneligiblePeriod} from "../api/ineligiblePeriod";
import IneligiblePeriodTable from "../components/ineligibleperiod/IneligiblePeriodTable";
import {Row} from "react-bootstrap";

const IneligiblePeriodPage = () => {

    const [ineligiblePeriods, setIneligiblePeriods] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchIneligiblePeriods = async () => {
        try{
            let response = await getAllIneligiblePeriods();
            setIneligiblePeriods(response.data.data);
        }catch(error) {
            console.log(error);
        } finally{
            setIsLoading(false);
        }
    }

    const onUpdateIneligiblePeriodClicked = async (id, data) => {
        try{
            const startDate = new Date(data.startDate);
            const endDate = new Date(data.endDate);
            if(startDate.getTime() < endDate.getTime()){
                await updateIneligiblePeriod(id, data);
                await fetchIneligiblePeriods();
            }

        }catch (error){
            console.log(error.response.data.msg);
        }
    }

    const onDeletePeriodClicked = async (id) => {
        try{
            await deleteIneligiblePeriodById(id);
            await fetchIneligiblePeriods();

        }catch (error) {
            console.log(error.response.data.msg);
        }
    }

    useEffect(() => {
        fetchIneligiblePeriods();
    }, []);


    return(
        <>
            <Row className="justify-content-center mb-3">
                <h5>All Ineligible Periods</h5>
            </Row>
            <IneligiblePeriodTable
                onUpdateIneligiblePeriodClicked={onUpdateIneligiblePeriodClicked}
                onDeletePeriodClicked={onDeletePeriodClicked}
                ineligiblePeriods={ineligiblePeriods}
                isLoading={isLoading}/>
        </>
    );
};

export default IneligiblePeriodPage;