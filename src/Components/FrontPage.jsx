import "./Styles/HomePage.css";
import baseContext from "../Context/baseContext";
import { useContext, useEffect } from "react";
import Alert from "./Alert";
import { useHistory } from "react-router-dom";
import './Styles/FrontPage.css';
import FormImg from '../Images/form-main.svg';

export default function FrontPage() {
    const context = useContext(baseContext);
    const history = useHistory();
    const showAlert = () => {
        context.setType("input");
        context.setAlert(true);
    };

    const createForm = () => {
        history.push("/create");
    };

    const myForms = () => {

    };

    const logout = ()=>{
        localStorage.clear('token');
        window.location.reload();
    }

    return (
        <>
            <div id="homeLower">
                <div id="header">
                    <div className="logo">
                        Welcome to Forms
                    </div>
                    <div className="homeLog">
                        <div className="username" onClick={()=>{}}>
                            Hii, {context.user.name}
                        </div>
                        <div className="logbtn" onClick={logout}>
                            Logout
                        </div>
                    </div>
                </div>
                <div id="homeCont">
                    <div id="homeLeft">
                        <div className="homebtn" onClick={createForm}>
                            Create Form
                        </div>
                        <div className="homebtn" onClick={showAlert}>
                            Fill Form
                        </div>
                        <div className="homebtn" onClick={myForms}>
                            Your Forms
                        </div>
                    </div>

                    <div id="homeRight">
                        <img src = {FormImg} alt = "Form Image"></img>
                    </div>
                </div>
            </div>
        </>
    );
}
