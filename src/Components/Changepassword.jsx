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
        // console.log(data);
        context.startLoader();
        const url = "/api/user/requestOTP";
        var resp = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        resp = await resp.json();
        context.stopLoader();
        // console.log(resp);
        if(resp.error){
            context.showAlert(resp.error);
            return
        }
        setactive(false);
    }

    const changepass = async(e)=>{
        e.preventDefault();
        var email = document.getElementById("changeemail").value.trim();
        var pass = document.getElementById("changepass").value.trim();
        var cpass = document.getElementById("changecpass").value.trim();
        var otp = document.getElementById("changeotp").value.trim();
        if(otp.length != 6){
            context.showAlert("Enter valid OTP");
            return;
        }
        if(pass.length < 8){
            context.showAlert("Enter valid password");
            return ;
        }
        if(pass != cpass){
            context.showAlert("Password and Confirm Password doesn't match");
            return;
        }

        var data = {
            email : email,
            newPassword : cpass,
            otp : otp
        };

        // console.log(data);
        context.startLoader();
        const url = "/api/user/updatePassword";
        var resp = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        resp = await resp.json();
        context.stopLoader();
        if(resp.error){
            context.showAlert(resp.error);
            return
        }else{
            context.showAlert(resp.success);
            history.push("/");
        }

    }

    useEffect(()=>{
        if(context.user._id) history.push("/")
    }, [context.user])

    return (
        <div className='changePass-full'>
            <div className='changePass-inside'>
            <h2> Forgot Password? </h2>
            <form className='changePass-upper'>
                <input type="email" id='changeemail' required placeholder = "Enter the Email ID"/> <button className='btn btn-primary changePass-sendbtn' onClick={reqOTP} type="submit">Send OTP</button>
            </form>
            <form className='changePass-lower'>
                <input type="number" id="changeotp" className = "changePass changePassotp" placeholder='Enter OTP' disabled={active}/>
                <input type="password" id="changepass" className = "changePass changePasspass" placeholder='Enter Password' disabled={active}/>
                <input type="password" id="changecpass" placeholder='Confirm Password' disabled={active} className = "changePass changePassconfpass"/>
                <input type="submit" value="Change Password" disabled={active} className = "changePassbtn" onClick={changepass}/>
            </form>
            </div>
        </div>
    )
}
