import React, { useContext } from "react";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Styles/SignUp.css";
import baseContext from "../Context/baseContext";
import GoogleImg from "../Images/google.svg";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect,
  signInWithPopup,
} from "firebase/auth";

export default function SignUp() {
    const context = useContext(baseContext);
    const history = useHistory();
    const SubmitData = async(e) => {
        e.preventDefault();
        const url = "http://localhost:5000/api/user/signup";
        let Name = document.getElementById("NAME").value;
        let Email = document.getElementById("EMAIL").value.trim();
        let Pass = document.getElementById("PASS").value;
        let ConfPass = document.getElementById("CONFPASS").value;
        if(Name == "" || Email == "" || Pass == "" || ConfPass == "")
        {
            context.showAlert("Enter all fields data");
            return;
        }
        else if(ConfPass != Pass)
        {
            context.showAlert("Password is not same");
            return;
        }
        else
        {   
            context.startLoader();
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
            context.stopLoader();
            if(resp.error){
                context.showAlert(resp.error);
                return;
            }
            localStorage.setItem('token', resp.token);
            history.push("/");
            window.location.reload();
        }  
    };


    const firebaseConfig = {
        apiKey: "AIzaSyAwoYWVrnF-4nbdMJ7DMhZbK_3SkFPhniI",
        authDomain: "tallytechpirates.firebaseapp.com",
        projectId: "tallytechpirates",
        storageBucket: "tallytechpirates.appspot.com",
        messagingSenderId: "1002084638911",
        appId: "1:1002084638911:web:b7e7fa5575aa50f469660a",
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider(app);

    const signupwithGoogle = (e) => {
        signInWithPopup(auth, provider)
      .then(async(result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // console.log(result);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        context.startLoader();
            let JsonObj = {
                "name" : user.displayName,
                "email" : user.email,
                "password": user.uid
            }
            const url = "http://localhost:5000/api/user/signup";
            var resp = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(JsonObj),
            });
            resp = await resp.json();
            context.stopLoader();
            if(resp.error){
                context.showAlert(resp.error);
                return;
            }
            localStorage.setItem('token', resp.token);
            history.push("/");
            window.location.reload();
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

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
                    required = {true}
                    id = "NAME"
                    ></input>
                    </div>

                    <div className="admin-email">
                    <label className="signup-admin-label">Email</label>
                    <input
                    type="email"
                    placeholder="Enter your email"
                    className="signup-admin-inp"
                    required = {true}
                    id = "EMAIL"
                    ></input>
                    </div>

                    <div className="admin-password">
                    <label className="signup-admin-label">Password</label>
                    <input
                    type="password"
                    className="signup-admin-inp"
                    placeholder="Enter your password here"
                    required = {true}
                    id = "PASS"
                    ></input>
                    </div>
                    
                    <div className="admin-password-confirm">
                    <label className="signup-admin-label">Confirm Password</label>
                    <input
                    type="password"
                    className="signup-admin-inp"
                    placeholder="Enter your password here"
                    required = {true}
                    id = "CONFPASS"
                    ></input>
                    </div>
                    <button className="admin-signup-btn" onClick={SubmitData}>Sign Up</button> 
                </form>
                <div className="signup-div">
                    <button className=" signup-option" id="signup-google" onClick={signupwithGoogle}>
                        Sign Up with{" "}
                        <img src={GoogleImg} type="icon" alt="Google Icon" />
                      </button>
                </div>
                <div className="loginoption-signup">
                      Existing user? <Link to="/">Login</Link>
                </div>
                
            </div>
            </div>
        </div>
        </div>
  );
}
