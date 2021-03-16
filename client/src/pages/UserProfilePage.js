import React, { useEffect, useState ,useCallback} from "react";
import { Col, Card, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../context/Context";
import VacationRequestTable from "../components/uservacationrequest/VacationRequestTable";
import { getAllVacationRequestsByUserId } from "../api/vacationRequest";
import{ getUserById } from '../api/user';
const UserProfilePage = (props) => {
  const history = useHistory();
  const { loggedInUser, isAdmin } = useAuth();
  const  [user, setUser] =useState( history?.location?.state?.user);
  const isViewable = isAdmin || loggedInUser.id === user.id;
  const [vacationRequests, setVacationRequests] = useState([]);
  const {id} = useParams();
  const updateVacationRequestList = useCallback(async () => {
    try {
      let response = await getAllVacationRequestsByUserId(id);
      setVacationRequests(response.data.data);
    } catch (error) {
      console.log(error);
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
    <Row className="mt-2">
      <Col xs={4}>
        <Card>
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
      <div>
        <VacationRequestTable
          updateVacationRequestList={updateVacationRequestList}
          vacationRequests={vacationRequests}
          isViewable={isViewable}
          user={user}
        />
      </div>
      
    </>}
    </>
  );
};

export default UserProfilePage;
