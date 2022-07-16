import React , {useState} from 'react';
import { Link } from "react-router-dom";
import './Styles/Card.css';


export default function Card() {
    const [status, setstatus] = useState("NO");
    const ToggleStatus = () => {
        if(status === "YES")
            setstatus("NO");
        else
            setstatus("YES");
    };

    const style = {
        "background": (status == "YES")? "#6fcd07":"#ccc"
    }
    return (
        
            <div className='card-full'>
                <div className='card-upper'>
                    <div className='upper-left'>
                        <Link className = 'form-name' to = "/">Name</Link>
                    </div>
                    <div className='upper-right'>
                        <label class="toggle">
                            <input class="toggle-checkbox" type="checkbox" onClick={ToggleStatus}/>
                            <div class="toggle-switch" style={style}></div>
                        </label>
                    </div>
                </div>
                
                <div className='card-lower'>
                    <div className='time'>
                        <div className='time-details start'>
                            <h4 className='time-head'>Start Date and Time</h4>
                            <p><time>04-05-2022 12:12</time></p>
                        </div> 
                        <div className='time-details last'>
                            <h4 className='time-head'>End Date and Time</h4>
                            <p><time>04-05-2022 12:12</time></p>
                        </div> 
                    </div>
                    <div className='form-status'>
                        {
                            status === "YES"? 
                            (<h4 style = {{color: '#6fcd07'}}>Open</h4>):(<h4 style = {{color: 'red'}}>Closed</h4>)
                        }
                    </div>
                </div>
            </div>
       
    )
}
