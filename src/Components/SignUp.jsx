import React, { useContext } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Styles/SignUp.css";
import baseContext from "../Context/baseContext";

export default function SignUp() {
    const context = useContext(baseContext);
    const SubmitData = async(e) => {
        e.preventDefault();
        const url = "http://localhost:5000/api/user/signup";
        let Name = document.getElementById("NAME").value;
        let Email = document.getElementById("EMAIL").value;
        let Pass = document.getElementById("PASS").value;
        let ConfPass = document.getElementById("CONFPASS").value;

        if(ConfPass != Pass)
        {
            // context.showAlert("Enter Valid details");
            // context.stopLoader();
        }
        else
        {
            let JsonObj = {
                "name" : Name,
                "email" : Email,
                "password": Pass
            }
    
            var resp = await fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(JsonObj),
              });
            resp = await resp.json();
            console.log(resp);
        }  
    };

    
    
    return (
        <div className="signup-full">
            <h1 className="main-head"> Welcome to Forms</h1>
            <div className="signup">
            <div className="admin-signup">
            
            <div className="signup-admin-main">
                <h2 className="signup-msg">Sign Up</h2>
                <form className="signup-admin-form">
                    <div className="admin-name">
                    <label className="signup-admin-label">Name</label>
                    <input
                    type="text"
                    placeholder="Enter your Name"
                    className="signup-admin-inp"
                    id = "NAME"
                    ></input>
                    </div>

                    <div className="admin-email">
                    <label className="signup-admin-label">Email</label>
                    <input
                    type="email"
                    placeholder="Enter your email"
                    className="signup-admin-inp"
                    id = "EMAIL"
                    ></input>
                    </div>

                    <div className="admin-password">
                    <label className="signup-admin-label">Password</label>
                    <input
                    type="password"
                    className="signup-admin-inp"
                    placeholder="Enter your password here"
                    id = "PASS"
                    ></input>
                    </div>
                    
                    <div className="admin-password-confirm">
                    <label className="signup-admin-label">Confirm Password</label>
                    <input
                    type="password"
                    className="signup-admin-inp"
                    placeholder="Enter your password here"
                    id = "CONFPASS"
                    ></input>
                    </div>
                    <button className="admin-signup-btn" onClick={SubmitData}>Sign Up</button> 
                </form>

                <p className="signup-other">OR<br /> Sign Up using: </p>
                <div className="signup-div">
                    <button className="signup-google signup-option">
                        <i class="fa-brands fa-google"></i>
                    </button>
                    <button className="signup-twitter signup-option">
                        <i class="fa-brands fa-twitter"></i>
                    </button>
                    <button className="signup-github signup-option">
                        <i class="fa-brands fa-github"></i>
                    </button>
                </div>
            
                
            </div>
            </div>
        </div>
        </div>
  );
}
