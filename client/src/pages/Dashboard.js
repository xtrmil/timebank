import React, {Children, useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./dashboard.scss";
import CalendarNavigation from "../components/CalendarNavigation";
import { getAllVacationRequestsByStatus } from "../api/vacationRequest";
import { getAllVacationRequests } from "../api/vacationRequest";
import EditVacationRequestModal from "../components/vacationrequest/EditVacationRequestModal";
import { useAuth } from "../context/Context";
import {getAllIneligiblePeriods} from "../api/ineligiblePeriod";
const localizer = momentLocalizer(moment);

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [ineligiblePeriods, setIneligiblePeriods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchVacationRequests = async () => {
    try {
      let result = await getAllVacationRequests();
      setRequests(result.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchIneligiblePeriods = async () => {
    try{
      let result = await getAllIneligiblePeriods();
      setIneligiblePeriods(result.data.data);
    }catch(error){
        console.log("inside fetchInPeriods", error);
    }finally {
      setIsLoading(false);
    }
  }

    const blockedDateCellWrapper = ({ children, value }) => {
    let blockedDate =
          ineligiblePeriods.find(period =>
              moment(value).isBetween(
                  moment(period.startDate),
                  moment(period.endDate),
                  null,
                  "[]"
              )
          ) != undefined;

     return React.cloneElement(Children.only(children), {
        style: {
          ...children.style,
          backgroundColor: blockedDate ? "#e4e8f0" : "white"
        }
      });
  }

 const blockedDateStyle = {
     dateHeader: ({ date, label }) => {
       let highlightDate =
           ineligiblePeriods.find(period =>
               moment(date).isBetween(
                   moment(period.startDate),
                   moment(period.endDate),
                   null,
                   "[]"
               )
           ) != undefined;
       return (
        <a style={highlightDate ? {color: "#c8cedb"} : null}>{label}</a>
      );
}}

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  useEffect(() => {
    fetchVacationRequests();
    fetchIneligiblePeriods();
  }, []);

  const eventColorStyle = (event, start, end, isSelected) => {
    let backgroundColor = "#ff0300";
    if (event.status === "APPROVED") {
      backgroundColor = "#a5d6b8";
    } else if (event.status === "PENDING") {
      backgroundColor = "#ffcc00";
    }
    let style = {
      backgroundColor: backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "black",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };

  return (
    <Container>
      {!isLoading && (
        <>
          <h1>Home</h1>
          <Calendar
            eventPropGetter={eventColorStyle}
            components={{ toolbar: CalendarNavigation, dateCellWrapper: blockedDateCellWrapper, month: blockedDateStyle}}
            views={["month"]}
            localizer={localizer}
            events={requests}
            startAccessor="startDate"
            endAccessor="endDate"
            style={{ height: 1000 }}
            popup
            onSelectEvent={(event) => handleSelectEvent(event)}
          />
          <EditVacationRequestModal
            request={selectedEvent}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </>
      )}
    </Container>
  );
};

export default Dashboard;
