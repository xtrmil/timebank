import React, {useEffect, useState} from "react";
import {deleteIneligiblePeriodById, getAllIneligiblePeriods, updateIneligiblePeriod} from "../api/ineligiblePeriod";
import IneligiblePeriodTable from "../components/ineligibleperiod/IneligiblePeriodTable";
import {Row, Button} from "react-bootstrap";
import {useToast} from "../contexts/ToastContext";
import AddIneligiblePeriodModal from "../components/ineligibleperiod/AddIneligiblePeriodModal";
const IneligiblePeriodPage = () => {

    const {setToastHeader, setToastMsg, setToast} = useToast();
    const [ineligiblePeriods, setIneligiblePeriods] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState();
    const fetchIneligiblePeriods = async () => {
        try{
            let response = await getAllIneligiblePeriods();
            setIneligiblePeriods(response.data.data);
        }catch(error) {
            setToastHeader("Error");
            setToastMsg(error.message);
            setToast(true);
        } finally{
            setIsLoading(false);
        }
    }

    const onUpdateIneligiblePeriodClicked = async (id, data) => {
        try{
            const startDate = new Date(data.startDate);
            const endDate = new Date(data.endDate);
            if(startDate.getTime() <= endDate.getTime()){
                let response = await updateIneligiblePeriod(id, data);
                setToastHeader("Success");
                setToastMsg(response.data.msg);
                setToast(true);
                await fetchIneligiblePeriods();
            }
        }catch (error){
            setToastHeader("Error");
            setToastMsg(error.message);
            setToast(true);
        }
    }

    const onDeletePeriodClicked = async (id) => {
        try{
            let response = await deleteIneligiblePeriodById(id);
            setToastHeader("Success");
            setToastMsg(response.data.msg);
            setToast(true);
            await fetchIneligiblePeriods();
        }catch (error) {
            setToastHeader("Error");
            setToastMsg(error.message);
            setToast(true);
        }
    }

    useEffect(() => {
        fetchIneligiblePeriods();
    }, []);

    return(
        <>
            <Row className="justify-content-center">
                <h5>All Ineligible Periods</h5>
            </Row>
            <Row className="mb-2 justify-content-end" noGutters>
          <Button
            onClick={() => setShowAddModal(true)}
            className="btn btn-sm btn-info"
          >
            Add Ineligible Period
          </Button>
        </Row>
            <IneligiblePeriodTable
                onUpdateIneligiblePeriodClicked={onUpdateIneligiblePeriodClicked}
                onDeletePeriodClicked={onDeletePeriodClicked}
                ineligiblePeriods={ineligiblePeriods}
                isLoading={isLoading}/>

                <AddIneligiblePeriodModal
                showAddPeriodModal={showAddModal}
                setShowAddPeriodModal={setShowAddModal}/>
        </>
    );
};

export default IneligiblePeriodPage;