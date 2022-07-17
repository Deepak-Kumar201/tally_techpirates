import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import baseContext from '../../Context/baseContext';
import './Styles/QuesStatic.css';
import { PieChart } from 'react-minimal-pie-chart';

export default function QuesStatic({formQue}) {
    const context = useContext(baseContext);
    const [ans, setAns] = useState([]);
    const history = useHistory();
    useEffect(()=>{
        const getForm = async ()=>{
            const uri = new URL(window.location.href);
            const url = "http://localhost:5000/api/forms/getanswer";
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
            console.log("resp -> ", JSON.parse(resp.data.answer[0]));
            context.stopLoader();
            if(resp.error){
                context.showAlert(resp.error);
                history.push("/yourforms");
                return;
            }
            setAns(JSON.parse(resp.data.answer[0]))
        }
        getForm();
    }, [])

    return (
        <div className='quesstatic'>
            <div className='quesstatic-accor'>
                <div className="accordion" id="accordionExample">
                    {
                        ans.map((elem, ind)=>{
                            return (
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button  shadow-none" type="button" data-bs-toggle="collapse" data-bs-target={"#collapseOne"+ind} aria-expanded="true" aria-controls="collapseOne">
                                        Que No {ind + 1} : {JSON.parse(formQue[elem.queId]).que}
                                    </button>
                                    </h2>
                                    <div id={"collapseOne"+ind} className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            {
                                                elem.wrong+elem.right == 0?
                                                    <div className='noattemps'>No One Attempted</div>
                                                :
                                                (
                                                    <PieChart
                                                        data={[
                                                            { title: 'Right', value: elem.right, color: 'green' },
                                                            { title: 'Wrong', value: elem.wrong, color: 'red' },
                                                        ]}
                                                        style={{width:"200px", fontSize:"10px", color :'white'}}
                                                        // label={({ dataEntry }) => dataEntry.title}
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
