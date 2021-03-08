import React from "react";
import {Formik} from "formik";
import {Form, Button} from "react-bootstrap";
import * as yup from "yup";
import {updateComment} from "../../api/comment";

const UpdateCommentForm = (props) => {
    const {comment, setShowForm} = props;

    const initialValues = {
        message: comment.message
    };

    const schema = yup.object().shape({
        message: yup.string().required("CommentCard cannot be empty")
    });

    const onSubmit = async (data) => {
        try {
            await updateComment(comment.id, data);
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

export default UpdateCommentForm;