import React, {Children, useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./dashboard.scss";
import CalendarToolbar from "../components/calendar/CalendarToolbar";
import { getAllVacationRequestsByStatus } from "../api/vacationRequest";
import { getAllVacationRequests } from "../api/vacationRequest";
import EditVacationRequestModal from "../components/calendar/calendarvacationrequest/EditVacationRequestModal";
import { useAuth } from "../contexts/AuthContext";
import {getAllIneligiblePeriods} from "../api/ineligiblePeriod";
import {useHistory} from "react-router-dom";
import AdminNav from "../components/adminprofile/AdminNav";
import CalendarNav from "../components/calendar/CalendarNav";
import {useToast} from "../contexts/ToastContext";
const localizer = momentLocalizer(moment);

const Dashboard = () => {
  const {setToastHeader, setToastMsg, setToast} = useToast();
  const [requests, setRequests] = useState([]);
  const [ineligiblePeriods, setIneligiblePeriods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const afterUpdate = () => {
    history.go(0);
  }
  const fetchVacationRequests = async () => {
    try {
      let result = await getAllVacationRequests();
      setRequests(result.data.data);
    } catch (error) {
      setToastHeader("Error");
      setToastMsg(error.message);
      setToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchIneligiblePeriods = async () => {
    try{
      let result = await getAllIneligiblePeriods();
      setIneligiblePeriods(result.data.data);
    }catch(error){
      setToastHeader("Error");
      setToastMsg(error.message);
      setToast(true);
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
          ) !== undefined;

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
           ) !== undefined;
       return (
        <span style={highlightDate ? {color: "#c8cedb"} : null}>{label}</span>
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
    let backgroundColor = "#d12a2a";
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
    <>
      {!isLoading && (
        <>
          <div className="profile-banner my-4 pt-3 justify-content-center">
            <div>
              <h6 className="text-center m-0 p-0">Welcome</h6>
              <h3 className="text-center"> Calendar Overview</h3>
              <CalendarNav/>
            </div>
          </div>
          <Container>

            <Calendar
              eventPropGetter={eventColorStyle}
              components={{ toolbar: CalendarToolbar, dateCellWrapper: blockedDateCellWrapper, month: blockedDateStyle}}
              views={["month"]}
              localizer={localizer}
              events={requests}
              startAccessor="startDate"
              endAccessor="endDate"
              style={{ height: 1000 }}
              popup
              onSelectEvent={(event) => handleSelectEvent(event)}
            />
          </Container>
          <EditVacationRequestModal
            afterUpdate={afterUpdate}
            request={selectedEvent}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </>

      )}
    </>

  );
};

export default Dashboard;
