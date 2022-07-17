import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import baseContext from "../Context/baseContext";
import "./Styles/Alert.css";

export default function Alert(props) {
    const context = useContext(baseContext);
    let history = useHistory();

    

    const hideForm = () => {
        if (context.alertRed != null) history.push(context.alertRed);
        context.setAlert(false);
        context.setAlertRed(null);
    }

    if (context.alert === false) return <></>;
    const getForm = ()=>{
        var fId = document.getElementById("data").value;
        history.push(`/fill?id=${fId}`)
        hideForm();
    }

    if (context.type === "input") {
        return (
            <div className="topFix" style={{top : window.scrollY + "px"}}>
                <div className="alertBox">
                    <input type="text" className="alertBody" id="data" placeholder="Enter Quiz ID"/>
                    <div className="fillAlert cancelAlert" onClick={hideForm}>Cancel</div>
                    <div className="fillAlert" onClick={getForm}>
                        Ok
                    </div>
                </div>
                <div className="cover" onClick={hideForm}></div>
            </div>
        );
    } else {
        return (
            <div className="topFix" style={{top : window.scrollY + "px"}}>
                <div className="alertBox">
                    <div className="alertBody">{context.alertBody}</div>
                    <div className="alertOk" onClick={hideForm}>Ok</div>
                </div>
                <div className="cover" onClick={hideForm}></div>
            </div>
        );
    }
}
