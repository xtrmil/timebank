import React from "react";
import {Button} from 'react-bootstrap';

import "./calendarToolbar.scss";

function CalendarToolbar(props) {

    const navigate = (action) => {
        props.onNavigate(action);
    }

    return (
        <div className='rbc-toolbar'>
          <span className="rbc-btn-group">
            <Button className="calendar-button" type="button" onClick={() => navigate('PREV')}>Previous</Button>
              <span className="rbc-toolbar-label"><strong>{props.label}</strong></span>
            <Button className="calendar-button" type="button" onClick={() => navigate('NEXT')}>Next</Button>
          </span>
        </div>
    );
}

export default CalendarToolbar;