import React from "react";
import Toast from "react-bootstrap/Toast";
import "./toaster.scss";

const Toaster = (props) => {

    const {toastHeader, toastMsg} = props;

    return (
        <div className="toast-container" aria-live="polite" aria-atomic="true">
            <Toast className={ toastHeader ==="Error" ? "error-toast" : "success-toast"}
                   onClose={props.onClose} delay={5000} autohide>
                <Toast.Header>
                    <strong className="mr-auto">{toastHeader}</strong>
                    <small>just now</small>
                </Toast.Header>
                <Toast.Body className="toast-body">
                    <p className={toastHeader === "Error" ? "error-message" : "success-message"}>
                        {toastMsg}</p>
                </Toast.Body>
            </Toast>
        </div>
    );
};

export default Toaster;