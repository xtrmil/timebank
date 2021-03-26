import {createContext, useContext, useState} from "react";

const toastContext = createContext();


const ToastContextProvider = ({ children }) => {
    const toast = useCreateToastContext();
    return <toastContext.Provider value={toast}>{children}</toastContext.Provider>;
};

const useCreateToastContext = () => {
    const [toastHeader, setToastHeader] = useState("");
    const [toastMsg, setToastMsg] = useState("");
    const [toast, setToast] = useState(false);

    return {
        toastHeader,
        setToastHeader,
        toastMsg,
        setToastMsg,
        toast,
        setToast
    };

};

const useToast = () => {
    return useContext(toastContext);
};

export { ToastContextProvider, useToast };

