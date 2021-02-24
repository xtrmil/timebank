
import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./dashboard.scss";
import CalendarNavigation from "./CalendarNavigation";
import {getAllVacationRequestsByStatus} from "../api/vacationRequest";
import {getAllVacationRequestsByUser} from "../api/vacationRequest";

const localizer = momentLocalizer(moment);

const Dashboard = () => {

    const [events, setEvents] = useState([]);

    useEffect(async ()  => {
       let result = await getAllVacationRequestsByUser(1)
       console.log(result.data.data)
        setEvents(result.data.data);
    }, []);

    const eventColorStyle = (event, start, end, isSelected) => {
        let backgroundColor;
        if(event.status === "APPROVED") {
            backgroundColor = "#fcba03";
        }
        let style = {
            backgroundColor: backgroundColor,
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    }

    return(
       <Container>
           <h1>Home</h1>
           <Calendar
               eventPropGetter={(eventColorStyle)}
               selectable={true}
               onSelectSlot={(event) => console.log(event)}
               components={{toolbar: CalendarNavigation}}
               views={["month"]}
               localizer={localizer}
               events={events}
               startAccessor="startDate"
               endAccessor="endDate"
               style={{ height: 1000 }}
               popup
               onSelectEvent={(event) => console.log(event)}
           />
       </Container>
    )
}

export default Dashboard;