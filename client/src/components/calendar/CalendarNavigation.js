import React from "react";
import AddVacationRequestModal from "./calendarvacationrequest/AddVacationRequestModal";
import {useAuth} from '../../context/Context'
import {Button} from 'react-bootstrap'
import AddIneligiblePeriodModal from '../ineligibleperiod/AddIneligiblePeriodModal';

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
           { <AddVacationRequestModal/>}
           {isAdmin && <AddIneligiblePeriodModal/>}
        </div>
    );
}

export default CalendarNavigation;