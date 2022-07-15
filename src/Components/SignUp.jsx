import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Styles/SignUp.css";

export default function SignUp() {
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
                    ></input>
                    </div>

                    <div className="admin-email">
                    <label className="signup-admin-label">Email</label>
                    <input
                    type="email"
                    placeholder="Enter your email"
                    className="signup-admin-inp"
                    ></input>
                    </div>

                    <div className="admin-password">
                    <label className="signup-admin-label">Password</label>
                    <input
                    type="password"
                    className="signup-admin-inp"
                    placeholder="Enter your password here"
                    ></input>
                    </div>
                    
                    <div className="admin-password-confirm">
                    <label className="signup-admin-label">Confirm Password</label>
                    <input
                    type="password"
                    className="signup-admin-inp"
                    placeholder="Enter your password here"
                    ></input>
                    </div>
                    <button className="admin-signup-btn">Sign Up</button> 
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
