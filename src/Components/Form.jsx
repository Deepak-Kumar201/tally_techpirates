import React , {useContext} from 'react';
import baseContext from "../Context/baseContext";
import { Link } from "react-router-dom";
import './Styles/Form.css';

export default function Form() {
    const logout = ()=>{
        localStorage.clear('token');
        window.location.reload();
    }
    const highlight = (e)=>{
        
        var active = document.querySelector('.highlight');
        if(active) active.classList.remove('highlight');
        e.target.classList.add('highlight');
    }
    return (
    
    <div className='form'>
        <div id="form-header">
            <div className="form-logo">
                Welcome to Forms
            </div>
            <div className="form-homeLog">
                <div className="form-logbtn">
                    <Link to = "/" className='form-home'>Home</Link>
                </div>
                <div className="form-logbtn" onClick={logout}>
                    Logout
                </div>
            </div>
        </div>
        <div className='form-links'>
            <div className='links link1'>
                <Link to = "/" className='linkname' onClick={(e) => {highlight(e)}}>Form</Link>
            </div>
            <div className='links link2'>
                <Link to = "/" className='linkname' onClick={(e) => {highlight(e)}}>Statistics</Link>
            </div>
            <div className='links link3'>
                <Link to = "/" className='linkname' onClick={(e) => {highlight(e)}}>Scoreboard</Link>
            </div>
        </div>

    </div>
  )
}
