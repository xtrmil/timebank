import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/Context";
import VacationRequestTable from "../components/uservacationrequest/VacationRequestTable";
import { getAllVacationRequestsByUserId } from "../api/vacationRequest";
const UserProfilePage = (props) => {
  const history = useHistory();
  const { loggedInUser, isAdmin } = useAuth();
  const { user } = history.location.state;
  const isViewable = isAdmin || loggedInUser.id === user.id;
  const [vacationRequests, setVacationRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await getAllVacationRequestsByUserId(user.id);
      setVacationRequests(response.data.data);
    };
    fetchData();
  }, [user]);

  return (
    <div>
      <VacationRequestTable
        vacationRequests={vacationRequests}
        isViewable={isViewable}
        user={user}
      />
    </div>
  );
};

export default UserProfilePage;
