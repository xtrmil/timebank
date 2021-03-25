import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarTimes, faGlobeEurope} from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bootstrap";
import AddVacationRequestModal from "./calendarvacationrequest/AddVacationRequestModal";
import AddIneligiblePeriodModal from "../ineligibleperiod/AddIneligiblePeriodModal";
import {useAuth} from "../../contexts/AuthContext";

const CalendarNav = () => {

    const {isAdmin} = useAuth();
    const [showAddRequestModal, setShowAddRequestModal] = useState(false);
    const [showAddPeriodModal, setShowAddPeriodModal] = useState(false);

    return(
        <div className="justify-content-center text-center">
            <Button onClick={() => setShowAddPeriodModal(true)}
                className="custom-button btn-light btn-sm mr-2 mb-1">
                <FontAwesomeIcon
                    className="custom-icon mr-1"
                    icon={faCalendarTimes}
                    color="black"
                    size="lg"
                />
                Ineligible Periods
            </Button>

            <Button onClick={() => setShowAddRequestModal(true)}
                className="custom-button btn-light btn-sm mr-2 mb-1"
            >
                <FontAwesomeIcon
                    className=" custom-icon mr-1"
                    icon={faGlobeEurope}
                    color="black"
                    size="lg"
                />
                Add Vacation Request
            </Button>

            {isAdmin && <AddIneligiblePeriodModal
                showAddPeriodModal={showAddPeriodModal}
                setShowAddPeriodModal={setShowAddPeriodModal}/>}

            <AddVacationRequestModal
                showAddRequestModal={showAddRequestModal}
                setShowAddRequestModal={setShowAddRequestModal}/>
        </div>

    );
};

export default CalendarNav;