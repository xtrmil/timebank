import React from "react";
import AddNewVacationRequest from "./AddNewVacationRequest";


function CalendarNavigation(props) {
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
            <AddNewVacationRequest/>
        </div>
    );
}

export default CalendarNavigation;