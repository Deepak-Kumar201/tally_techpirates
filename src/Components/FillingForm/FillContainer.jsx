import React, { useContext, useEffect } from 'react'
import FillContext from './Context/FillContext';
import LeftFill from './LeftFill';
import Quebutton from './Quebutton';
import "./style.css"

export default function FillContainer() {
    const context = useContext(FillContext)

    useEffect(()=>{
        const uri = new URL(window.location.href);
        const id = uri.searchParams.get("id");
        context.getForm(id);
    }, []);


    return (
        <div id="fillCont">
            <div className="fillleft">
                <LeftFill/>
            </div>
            <div className='fillright'>
                <div className='fillright-desc'>
                    <div className='color-desc'><div className='lightgreen color-span' style = {{backgroundColor: "lightgreen"}}></div><div>Current Unsubmitted Question </div></div>
                    <div className='color-desc'><div className='dark-green color-span' style = {{backgroundColor: "#1ab552"}}></div> <div>Not Submitted</div></div>
                    <div className='color-desc'><div className='blue color-span' style = {{backgroundColor: "blue"}}></div>Submitted</div>
                    <div className='color-desc'><div className='purple color-span' style = {{backgroundColor: "purple"}}></div>Current Submitted Question</div>
                    <div className='color-desc'><div className='lightgray color-span' style = {{backgroundColor: "gray"}}></div>Submitted but not answered</div>
                </div>
                <div className="questionCont">
                    {
                        context.queArr.map((elem, ind)=>{
                            return <Quebutton number={ind + 1}/>
                        })
                    }
                </div>
                <div className='submittest' onClick={()=>{context.setCurQue(0);context.submit();}}>Submit Test</div>
            </div>

        </div>
    )
}
