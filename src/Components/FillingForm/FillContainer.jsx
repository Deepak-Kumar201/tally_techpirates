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
                <div className="questionCont">
                    {
                        context.queArr.map((elem, ind)=>{
                            return <Quebutton number={ind + 1}/>
                        })
                    }
                </div>
                <div className='submittest' onClick={()=>{context.setCurQue(1e5);context.submit();}}>Sumbit Test</div>
            </div>

        </div>
    )
}
