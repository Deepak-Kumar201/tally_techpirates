import React , {useContext, useEffect, useState} from 'react';
import { Link, useHistory } from "react-router-dom";
import baseContext from '../../Context/baseContext';
import QuesStatic from './QuesStatic';
import ScoreCard from './ScoreCard';
import ShowForm from './ShowForm';
import './Styles/Form.css';
import Logo from '../../Images/logo.png';

export default function Form() {
    const [url, seturl] = useState(new URL(window.location.href));
    const [tab, setTab] = useState("form")
    const history = useHistory();
    const [form, setform] = useState({})
    const [formQue, setFormQue] = useState({});
    const context = useContext(baseContext);

    const logout = ()=>{
        localStorage.clear('token');
        window.location.reload();
    }
    const highlight = (e)=>{
        var active = document.querySelector('.highlight');
        if(active) active.classList.remove('highlight');
        e.target.classList.add('highlight');
        if(e.target.classList.contains("formdet")){
            setTab("form");
        }else if(e.target.classList.contains("statistics")){
            setTab("statistics");
        }else{
            setTab("scoreboard")
        }
    }

    useEffect(()=>{
        var tab = url.searchParams.get("tab");
        if(tab == "form"){
            document.querySelector('.formdet').classList.add('highlight');
            setTab("form")
        }else if(tab == 'statistics'){
            document.querySelector('.statistics').classList.add('highlight');
            setTab("statistics");
        }else if(tab == 'scoreboard'){
            document.querySelector('.scoreboard').classList.add('highlight');
            setTab("scoreboard")
        }
        else {
            history.push(`/details?id=${url.searchParams.get("id")}&tab=form`);
            document.querySelector('.formdet').classList.add('highlight');
            setTab("form")
        }
    }, [])

    useEffect(()=>{
        const getForm = async ()=>{
            const uri = new URL(window.location.href);
            const url = "http://localhost:5000/api/forms/getauthform";
            context.startLoader();
            var data = {
                fId : uri.searchParams.get("id"),
                token : localStorage.getItem("token")
            }
            var resp = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
    
            resp = await resp.json();
            console.log("form data-> ", resp.data);
            context.stopLoader();
            if(resp.error){
                context.showAlert(resp.error);
                history.push("/yourforms");
                return;
            }
            setform(resp.data)
            setFormQue(JSON.parse(JSON.parse(resp.data.data)))
        }
        getForm();
    }, [])

    return (
        <div className='form'>
            <div id="form-header">
                {/* <div className="form-logo">
                    Welcome to Forms
                </div> */}
                <div className="form-logo">
                    <img src={Logo} alt = "Quiz-Shetra logo" className="form-quiz-logo"/>
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
                    <Link to = {`/details?id=${url.searchParams.get("id")}&tab=form`} className='linkname formdet' onClick={(e) => {highlight(e)}}>Quiz</Link>
                </div>
                <div className='links link2'>
                    <Link to = {`/details?id=${url.searchParams.get("id")}&tab=statistics`} className='linkname statistics' onClick={(e) => {highlight(e)}}>Statistics</Link>
                </div>
                <div className='links link3'>
                    <Link to = {`/details?id=${url.searchParams.get("id")}&tab=scoreboard`} className='linkname scoreboard' onClick={(e) => {highlight(e)}}>Scoreboard</Link>
                </div>
            </div>
            <div>
                {
                    tab == "form" ? <ShowForm  form={form} formQue={formQue}/> : (tab == "statistics"?<QuesStatic  form={form} formQue={formQue}/>:<ScoreCard  form={form}/>)
                }
            </div>

        </div>
  )
}
