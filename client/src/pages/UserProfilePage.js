import React, { useEffect, useState ,useCallback} from "react";
import { Col, Card, Row, Container } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import VacationRequestTable from "../components/vacationrequest/VacationRequestTable";
import { getAllVacationRequestsByUserId } from "../api/vacationRequest";
import{ getUserById } from '../api/user';
import './UserProfilePage.css';
import {useToast} from "../contexts/ToastContext";

const UserProfilePage = () => {
  const {setToastHeader, setToastMsg, setToast} = useToast();
  const history = useHistory();
  const { loggedInUser, isAdmin } = useAuth();
  const  [user, setUser] =useState( history?.location?.state?.user);
  const isViewable = isAdmin || loggedInUser.id === user?.id;
  const [vacationRequests, setVacationRequests] = useState([]);
  const {id} = useParams();

  const updateVacationRequestList = useCallback(async () => {
    try {
      let response = await getAllVacationRequestsByUserId(id);
      setVacationRequests(response.data.data);
    } catch (error) {
      setToastHeader("Error");
      setToastMsg(error.message);
      setToast(true);
    }
  },[id]);

  useEffect(() => {
    const fetchUser = async()=>{
    let response = await getUserById(id);
     setUser(response.data.data);
    }
    if(!user){
      fetchUser();
    }
    updateVacationRequestList();

  }, [user,updateVacationRequestList,id]);

  return (
    <>
    {user &&
    <>
    <Container>
    <Row className="mt-2">
      <Col xs={4} className="justify-content-center d-flex">
        <Card className="card-img-wrapper border-0">
          <Card.Img variant="top" alt="someImg" src={user.profileImg}></Card.Img>
        </Card>
        
      </Col>
      <Col>
            <h2>
              <strong>{user.firstName} {user.lastName}</strong>
            </h2>
            <p>
            <strong>email: {user.email}</strong>
            </p>
      </Col>
      </Row>
      <div className="mt-3">
        <VacationRequestTable
          updateVacationRequestList={updateVacationRequestList}
          vacationRequests={vacationRequests}
          isViewable={isViewable}
          user={user}
        />
      </div>
      </Container>
    </>}
    
    </>
  );
};

export default UserProfilePage;
