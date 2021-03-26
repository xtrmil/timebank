import React from "react";
import * as yup from "yup";
import {Button, Modal, Form} from "react-bootstrap";
import {Formik} from "formik";
import {updateVacationRequestStatus} from "../../api/vacationRequest";
import {addComment} from "../../api/comment";
import {useToast} from "../../contexts/ToastContext";

const EditVacationRequestStatusModal = (props) => {

    const {request, showModal, setShowModal} = props;
    const {setToastHeader, setToastMsg, setToast} = useToast();

    const onClickClose = () => {
        setShowModal(false);
    };

    const onSubmitClicked = async (data) => {
        try{
            await addComment(request.id, {message: data.comment});
            await updateVacationRequestStatus(request.id, data.status);
            setToastHeader("Success");
            setToastMsg("Added comment and updated status successfully.");
            setToast(true);
        }catch(error){
            setToastHeader("Error");
            setToastMsg(error.message);
            setToast(true);
        }finally {
            setShowModal(false);
        }
    }

    const initialValues = {
        status: request.status,
        comment: ""
      }

      const schema = yup.object().shape({
          status: yup.string().required("Please choose a status."),
          comment: yup.string().required("Please leave a comment.")
      })

      return (
        <>
          <Modal show={showModal} onHide={onClickClose}>
            <Modal.Body>
               <Formik initialValues={initialValues}
                       validationSchema={schema}
                       onSubmit={(data) => onSubmitClicked(data)}
               >
                   {({
                         values,
                         errors,
                         touched,
                         handleSubmit,
                         handleChange,
                         handleBlur
                   }) => (
                   <Form onSubmit={handleSubmit} noValidate>
                       <h4 className="text-center m-3">Edit Vacation Request Status</h4>

                       <p className="mt-4"><strong>Title:</strong> {request.title}</p>
                       <p><strong>Requested By: </strong>{request.user.firstName} {request.user.lastName}</p>

                       <Form.Group>
                           <Form.Label><strong>Status: </strong></Form.Label>
                           <Form.Control
                               as="select"
                               name="status"
                               value={values.status}
                               onChange={handleChange}
                               onBlur={handleBlur}
                               isInvalid={!!errors.status && touched.status}>
                               <option value="PENDING">Pending</option>
                               <option value="APPROVED">Approved</option>
                               <option value="DENIED">Denied</option>
                           </Form.Control>
                           <Form.Control.Feedback type="invalid">
                               {errors.status}
                           </Form.Control.Feedback>
                       </Form.Group>

                        <Form.Group>
                            <Form.Label><strong>Comment:</strong></Form.Label>
                            <Form.Control
                                as="textarea"
                                name="comment"
                                value={values.comment}
                                maxLength={255}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={!!errors.comment && touched.comment}/>
                                <Form.Control.Feedback type="invalid">
                                    {errors.comment}
                                </Form.Control.Feedback>

                        </Form.Group>

                       <div className="text-center mt-5">
                           <Button className="mr-2"
                                   variant="secondary"
                                   onClick={onClickClose}
                           >
                               Cancel
                           </Button>
                           <Button type="submit" variant="primary">Save</Button>
                       </div>
                   </Form>
                   )}
               </Formik>
            </Modal.Body>
          </Modal>
        </>
      );
}

export default EditVacationRequestStatusModal;