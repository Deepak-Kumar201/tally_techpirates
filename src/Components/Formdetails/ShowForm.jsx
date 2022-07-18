import { useEffect } from 'react';
import getForm from './getForm';
import './Styles/ShowForm.css';

export default function ShowForm({form, formQue}) {


    const copyLink = ()=>{
        navigator.clipboard.writeText("http://localhost:3000/fill?id="+form._id);
        const temp = document.querySelector(".showForm-Id-name");
        const text = temp.innerHTML;
        temp.innerHTML = "Link Copied";
        setTimeout(()=>{
            temp.innerHTML = text;
        }, 1000);
    }

    useEffect(()=>{
        // console.log("from form ", form);
    },[form])

    return (
    <div className='showForm-full'>
        <div className='showForm'>
            <div className='showForm-id' onClick={copyLink}>
                <p className='showForm-Id-name'>Quiz Id: <div style={{color:"white", display:"inline", marginLeft:"30px"}}>{form._id}</div></p>
            </div>
            <div className='showForm-form'>
                <h2 className='showForm-form-head'>Here Is Your Quiz</h2>
                <div className='usershowform'>
                    {
                        getForm(formQue)
                    }
                </div>
            </div>
        </div>
    </div>
    );
}
