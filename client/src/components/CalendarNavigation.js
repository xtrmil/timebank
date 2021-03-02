import React from "react";
import AddNewVacationRequest from "./vacationrequest/AddNewVacationRequest";
import {useAuth} from '../context/Context'
import {Button} from 'react-bootstrap'
import AddIneligiblePeriod from '../components/ineligibleperiod/AddIneligiblePeriod';

function CalendarNavigation(props) {
  const {isAdmin} = useAuth();
    const navigate = (action) => {

        props.onNavigate(action);
    }


    return (
        <div className='rbc-toolbar'>
          <span className="rbc-btn-group">
            <button type="button" onClick={() => navigate('PREV')}>Previous</button>
            <span className="rbc-toolbar-label">{props.label}</span>
            <button type="button" onClick={() => navigate('NEXT')}>Next</button>
          </span>
           { <AddNewVacationRequest/>}
           {isAdmin && <AddIneligiblePeriod/>}
        </div>
    );
}

export default CalendarNavigation;