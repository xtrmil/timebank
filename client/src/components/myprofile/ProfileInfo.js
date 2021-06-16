import React, { useState,useEffect } from "react";
import ProfileForm from "./ProfileForm";
import UpdatePasswordForm from "./UpdatePasswordForm";
import {Card, Col, Row } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import {uploadImage,fetchImageByUser} from '../../api/user';
import {useToast} from "../../contexts/ToastContext";
import "../commonButtonStyling.scss";

const ProfileInfo = (props) => {
    const {setToastHeader, setToastMsg, setToast} = useToast();
    const { loggedInUser} = useAuth();
    const { editDisabled, setEditDisabled, updateProfileInfo } = props;
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [image,setImage] = useState();
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImage =async()=>{
      let response = await fetchImageByUser();
      setImage(response.data.data)
      setIsLoading(false);
    };
    fetchImage();
  }, [])

 const handleFileChange = (event)=>{
  setSelectedFile(event.target.files[0]);
 }

 const OnClickUploadImage = async()=>{
      try{
          if(!!selectedFile){
              let formData = new FormData();
              formData.append('image', selectedFile);
              let response  = await uploadImage(formData);
              setImage(response.data.data);
              setToastHeader("Success");
              setToastMsg(response.data.msg);
              setToast(true);
          };
      }catch (error){
          setToastHeader("Error");
          setToastMsg(error.message);
          setToast(true);
      }

 };
  return (
    <>
      <Row className="justify-content-center mb-3">
        <h5>My Profile</h5>
      </Row>

        {!isLoading &&
      <Row className="justify-content-center">
        <Col xs={8} md={4}>
          <Card className="text-center">
              <Card.Img variant="top" alt="someImg" src={image}></Card.Img>
              <Card.Body>
                  <input className="w-100 mb-2" type="file" onChange={handleFileChange}/>

                  <p><strong>Total Vacation Days:</strong> 25</p>
                  <p><strong>Remaining Vacation Days: </strong> {loggedInUser.currentVacationDays}</p>
                <button className=" text-center edit-image-button mt-2 btn-sm" onClick={OnClickUploadImage}>Change image</button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={8} md={5}>
            <Card className="p-4">
                {!showPasswordForm && (
                    <ProfileForm
                        setEditDisabled={setEditDisabled}
                        editDisabled={editDisabled}
                        onSubmitClicked={updateProfileInfo}
                        setShowPasswordForm={setShowPasswordForm}
                    />
                )}
                {showPasswordForm && (
                    <UpdatePasswordForm setShowPasswordForm={setShowPasswordForm} />
                )}
            </Card>

        </Col>
      </Row>}
    </>
  );
};

export default ProfileInfo;
