import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import baseContext from '../Context/baseContext';
import "./Styles/Changepassword.css"

export default function Changepassword() {
    const context = useContext(baseContext);
    const [active, setactive] = useState(true);
    var history = useHistory();
    const reqOTP = async(e)=>{
        e.preventDefault();
        var email = document.getElementById("changeemail").value;
        if(email.length == 0){
            context.showAlert("Enter valid email");
            return
        }
        var data = {
            email : email
        };
        console.log(data);
        context.startLoader();
        const url = "http://localhost:5000/api/user/requestOTP";
        var resp = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        resp = await resp.json();
        context.stopLoader();
        console.log(resp);
        if(resp.error){
            context.showAlert(resp.error);
            return
        }
        setactive(false);
    }

    const changepass = ()=>{

    }

    useEffect(()=>{
        if(context.user._id) history.push("/")
    }, [context.user])

    return (
        <div>
            <form>
                Email : <input type="email" id='changeemail' required/> <button className='btn btn-primary' onClick={reqOTP} type="submit">Send OTP</button>
            </form>
            <form>
                <input type="number" id="changeotp" className = "changePass changePassotp" placeholder='Enter OTP' disabled={active}/>
                <input type="password" id="changepass" className = "changePass changePasspass" placeholder='Enter Password' disabled={active}/>
                <input type="password" id="changecpass" placeholder='Confirm Password' disabled={active} className = "changePass changePassconfpass"/>
                <input type="submit" value="Change Password" disabled={active} className = "changePass changePassbtn"/>
            </form>
        </div>
    )
}
