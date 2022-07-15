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

    if (context.type === "input") {
        return (
            <div className="topFix">
                <div className="alertBox">
                    <input type="text" className="alertBody" id="data" placeholder="Enter Form ID"/>
                    <div className="fillAlert cancelAlert" onClick={hideForm}>Cancel</div>
                    <div className="fillAlert" >
                        Ok
                    </div>
                </div>
                <div className="cover" onClick={hideForm}></div>
            </div>
        );
    } else {
        return (
            <div className="topFix">
                <div className="alertBox">
                    <div className="alertBody">{context.alertBody}</div>
                    <div className="alertOk" onClick={hideForm}>Ok</div>
                </div>
                <div className="cover" onClick={hideForm}></div>
            </div>
        );
    }
}
