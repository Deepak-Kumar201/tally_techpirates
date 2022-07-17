import React , {useContext, useState} from 'react';
import { Link, useHistory } from "react-router-dom";
import baseContext from '../Context/baseContext';
import './Styles/Card.css';


export default function Card({data}) {
    const context = useContext(baseContext);
    const [status, setstatus] = useState(data.accepting);
    const history = useHistory();
    const shrink = (str)=>{
        if(str.length <= 12) return str;
        return str.substring(0, 12)+"...";
    }
    const style = {
        "background": status? "#6fcd07":"#ccc"
    }
    const chgState = async(e)=>{
        setstatus(e.target.checked);
        context.startLoader();
        const uri = "http://localhost:5000/api/forms/updateRecieve";
        data = {
            fId : data._id,
            accepting : e.target.checked,
            token : localStorage.getItem('token')
        }
        console.log(data);
        var resp = await fetch(uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        context.stopLoader();
    }
    
    const openCard = ()=>{
        history.push(`/details?id=${data._id}&tab=form`)
    }

    return (
        
            <div className='card-full'>
                <div className='card-upper'>
                    <div className='upper-left'>
                        <Link className = 'form-name' to = "/">{shrink(data.title)}</Link>
                    </div>
                    <div className='upper-right'>
                        <label class="toggle">
                            <input class="toggle-checkbox" type="checkbox" onChange={(e)=>{chgState(e)}} checked={status}/>
                            <div class="toggle-switch" style={style}></div>
                        </label>
                    </div>
                </div>
                
                <div className='card-lower' onClick={openCard} style={{cursor:"pointer"}}>
                    <div className='time'>
                        <div className='time-details start'>
                            <h4 className='time-head'>Start Date and Time</h4>
                            <p><time>
                                {
                                    data.time[0] == -1? "Accepting Forever":(new Date(data.time[0]).toDateString()+", "+new Date(data.time[0]).toLocaleTimeString())
                                }
                                </time></p>
                        </div> 
                        <div className='time-details last'>
                            <h4 className='time-head'>End Date and Time</h4>
                            <p><time>
                                {
                                    data.time[0] == -1? "Accepting Forever":(new Date(data.time[1]).toDateString()+", "+new Date(data.time[1]).toLocaleTimeString())
                                }
                                </time></p>
                        </div> 
                    </div>
                    <div className='form-status'>
                        {
                            status? 
                            (<h4 style = {{color: '#6fcd07'}}>Open</h4>):(<h4 style = {{color: 'red'}}>Closed</h4>)
                        }
                    </div>
                </div>
            </div>
       
    )
}
