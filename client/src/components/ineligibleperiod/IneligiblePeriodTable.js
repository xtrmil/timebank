import React, {useState} from "react";
import {Button, Table} from "react-bootstrap";
import UpdateIneligiblePeriodModal from "./UpdateIneligiblePeriodModal";
import DeleteIneligiblePeriodModal from "./DeleteIneligiblePeriodModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faTrashAlt} from "@fortawesome/free-solid-svg-icons";


const IneligiblePeriodTable = (props) => {

    const {isLoading, ineligiblePeriods, onDeletePeriodClicked, onUpdateIneligiblePeriodClicked} = props;
    const [period, setPeriod] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const onShowUpdateModalClicked = (period) => {
        setPeriod(period);
        setShowUpdateModal(true);
    }

    const onShowDeleteModalClicked = (period) => {
        setPeriod(period);
        setShowDeleteModal(true);
    }

    const table = ineligiblePeriods.map((period, id) => {
        return (
            <tr className="text-center" key={period.id}>
                <td>{period.startDate}</td>
                <td>{period.endDate}</td>
                <td>{period.createdBy.firstName} {period.createdBy.lastName}</td>
                <td className="d-flex">
                    <Button onClick={() => onShowUpdateModalClicked(period)}
                            className="btn btn-info btn-sm mr-2">
                        <FontAwesomeIcon icon={faPencilAlt}/>
                    </Button>
                    <Button onClick={() => onShowDeleteModalClicked(period)}
                            className="btn btn-danger btn-sm">
                        <FontAwesomeIcon icon={faTrashAlt}/>
                    </Button>
                </td>
            </tr>
        );
    });

    return(
        <>
            <Table responsive className="table-hover table-borderless table-styling">
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

            <UpdateIneligiblePeriodModal
                period={period}
                showUpdateModal={showUpdateModal}
                setShowUpdateModal={setShowUpdateModal}
                onUpdateIneligiblePeriodClicked={onUpdateIneligiblePeriodClicked}
            />

            <DeleteIneligiblePeriodModal
                period={period}
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                onDeletePeriodClicked={onDeletePeriodClicked}
            />
        </>
    );
};

export default IneligiblePeriodTable;