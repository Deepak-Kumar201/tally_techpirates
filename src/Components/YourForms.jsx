import React , {useContext} from 'react';
import baseContext from "../Context/baseContext";
import { Link } from "react-router-dom";
import Card from './Card';
import './Styles/YourForms.css';


export default function YourForms() {
    const context = useContext(baseContext);
    return (
        <div className='forms-page'>
            <div id="forms-page-header">
                <div className="forms-page-logo">
                    Welcome to Forms
                </div>
                <div className="forms-page-homeLog">
                    <div className="forms-page-logbtn">
                        <Link to = "/" className='forms-page-home'>Home</Link>
                    </div>
                    <div className="forms-page-logbtn" onClick={() => {}}>
                        Logout
                    </div>
                </div>
            </div>
            <div className='forms-page-head'>
                <h1 className='forms-page-heading'>Your Forms</h1>
            </div>
            {
                context.user.forms.map((elem, ind)=>{
                    return <Card data={elem} key={ind}/>
                })
            }
        </div>
  )
}
