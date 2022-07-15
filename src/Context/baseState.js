import React, { useState } from "react";

import baseContext from "./baseContext.js";

const BaseState = (props) => {
    
    const [alert, setAlert] = useState(false);
    const [type, setType] = useState("input");
    const [alertBody, setAlertBody] = useState("");
    const [alertRed, setAlertRed] = useState(null);



    const showAlert = (data) => {
        setAlertBody(data);
        setType("message");
        setAlert(true);
    };

    const startLoader = ()=>{
        const ring = document.querySelector(".loader");
        ring.classList.remove("hiddenLoader");
    }
    const stopLoader = ()=>{
        const ring = document.querySelector(".loader");
        ring.classList.add("hiddenLoader");
    }

    return (
        <baseContext.Provider
            value={{
                alert,
                setAlert,
                
                type,
                setType,
                
                showAlert,
                alertBody,
                setAlertBody,
                alertRed,
                setAlertRed,
                startLoader,
                stopLoader
            }}
        >
            {props.children}
        </baseContext.Provider>
    );
};

export default BaseState;
