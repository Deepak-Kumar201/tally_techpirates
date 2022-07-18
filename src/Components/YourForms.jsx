import React , {useContext} from 'react';
import baseContext from "../Context/baseContext";
import { Link, useHistory } from "react-router-dom";
import Card from './Card';
import './Styles/YourForms.css';
import Logo from '../Images/logo.png';

export default function YourForms() {
    const history = useHistory();
    const logout = ()=>{
        localStorage.removeItem('token');
        history.push("/")
        window.location.reload();
    }

    const context = useContext(baseContext);
    return (
        <div className='forms-page'>
            <div id="forms-page-header">
                <div className="forms-page-logo">
                    <img src={Logo} alt = "Quiz-Shetra logo" className="forms-page-quiz-logo"/>
                </div>
                <div className="forms-page-homeLog">
                    <div className="forms-page-logbtn">
                        <Link to = "/" className='forms-page-home'>Home</Link>
                    </div>
                    <div className="forms-page-logbtn" onClick={logout}>
                        Logout
                    </div>
                </div>
            </div>
            <div className='forms-page-head'>
                <h1 className='forms-page-heading'>Your Quizzes</h1>
            </div>
            <div className='allForms'>
                {
                    context.user.forms.map((elem, ind)=>{
                        return <Card data={elem} key={elem._id}/>
                    })
                }
            </div>
        </div>
  )
}
