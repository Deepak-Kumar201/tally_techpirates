import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import baseContext from '../../Context/baseContext';
import './Styles/ScoreCard.css';

export default function ScoreCard() {
    const [score, setScore] = useState([])
    const [filter, setfilter] = useState(null)
    const context = useContext(baseContext);
    const history = useHistory();
    useEffect(()=>{
        const getForm = async ()=>{
            const uri = new URL(window.location.href);
            const url = "http://localhost:5000/api/forms/getresponse";
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
            console.log("resp data-> ", resp.data);
            context.stopLoader();
            if(resp.error){
                context.showAlert(resp.error);
                history.push("/yourforms");
                return;
            }
            setScore(resp.data.responses.map((elem)=>{
                return JSON.parse(elem);
            }))
        }
        getForm();
    }, [])
    return (
        <div className='scorecardCont'>
            <div>
                <input type="number" className='scorecard filter' placeholder='Enter number to filter marks greater than provided' value={filter} onChange={(e)=>{setfilter(e.target.value)}}/>
            </div>
            <div>
                {
                    score.map((data, ind)=>{
                        if(filter && data.marks.sum < filter) return <></>
                        return (
                            <div className='scorecard'>
                                <div className='scorecard-left'>
                                    <div className='scorecard-name'>
                                        <h4>{data.name}</h4>
                                    </div>
                                </div>
                                <div className='scorecard-right'>
                                    <div className='scorecard-score'>
                                        <h4>{data.marks.sum}</h4>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    );
}
