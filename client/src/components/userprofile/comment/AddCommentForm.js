import React from "react";
import {Formik} from "formik";
import {Form, Button} from "react-bootstrap";
import * as yup from "yup";
import {addComment} from "../../../api/comment";

const AddCommentForm = (props) => {
    const {comment, setShowForm, loadComments, requestId} = props;


    const initialValues = {
        message: ""
    };

    const schema = yup.object().shape({
        message: yup.string().required("CommentCard cannot be empty")
    });

    const onSubmit = async (data) => {
        console.log(data);
        try {
            await addComment(requestId, data);
            setShowForm(false);
            loadComments(requestId);
        } catch (error) {
            console.log(error.response.data.msg);
        }
    }

    const onCancelClicked = () => {
        setShowForm(false);
    }

    return(
        <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values) => onSubmit(values)}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleSubmit,
                  handleChange,
                  handleBlur,
              }) => (
            <Form onSubmit={handleSubmit}>
                <Form.Control
                    type="text"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.message && touched.message}
                />
                <Form.Control.Feedback type="invalid"> {errors.message}</Form.Control.Feedback>
                <div>
                    <Button className="btn-sm mr-2" onClick={onCancelClicked}>Cancel</Button>
                    <Button className="btn-sm"  type="submit">Save</Button>
                </div>
            </Form>
                )}
        </Formik>

    )
}

export default AddCommentForm;