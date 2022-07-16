import "./Styles/HomePage.css";
import baseContext from "../Context/baseContext";
import { useContext, useEffect } from "react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage(props) {
    const context = useContext(baseContext);

    const [type, settype] = useState("admin");
    const chooseAdmin = () => {
        settype("admin");
    };
    const chooseAttend = () => {
        settype("attendant");
    };

    useEffect(() => {
        setTimeout(() => {
            const homeUpper = document.getElementById("homeUpper");
            const homeLower = document.getElementById("homeLower");
            const homeWel = document.getElementById("homeWel");

            var url;
            if (window.innerWidth < 750) {
                url = `https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=${window.innerHeight}&w=${window.innerWidth}`;
            } else {
                url = `https://images.pexels.com/photos/2569997/pexels-photo-2569997.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=${
                    2 * window.innerHeight
                }&w=${2 * window.innerWidth}`;
            }

            homeUpper.style.backgroundImage = `url(${url})`;
            homeUpper.style.display = sessionStorage.getItem("hiddenBar")?"none":"auto"

            homeWel.style.left = `${
                (window.innerWidth - homeWel.offsetWidth) / 2
            }px`;
            homeWel.style.top = `${
                (window.innerHeight - homeWel.offsetHeight) / 2
            }px`;

            window.onscroll = () => {
                homeUpper.style.top = -window.scrollY * 0.05 + "px";
                homeLower.style.height="100vh";
                if(-window.scrollY * 1.1 <= window.innerHeight * 0.1){
                    homeUpper.style.top = -window.innerHeight*1.1+"px";
                    window.onscroll = ()=>{
                        var a = document.querySelectorAll(".topFix");
                        for(var i of a){
                            i.style.top = window.scrollY+"px";
                        }
                    };
                    homeLower.style.top="0px";
                    setTimeout(()=>{
                        homeUpper.style.display="none";
                        sessionStorage.setItem("hiddenBar", true)

                    },2000);
                    return;
                }
                homeLower.style.top = window.scrollY +"px";
            };
        }, 100);
    }, []);
    const showNotif = ()=>{
        const elem = document.getElementById("notification");
        elem.style.height = "400px";
    }
    return (
        <>
            <div id="homeUpper" style={{display : localStorage.getItem("hiddenBar")?"none":"auto"}}>
                <div id="homeWel">
                    <h1>Welcome To Forms</h1>
                    <h4>Change the Way you Work</h4>
                </div>
            </div>
            <div id="homeLower">
                <div className="signin-full">
                <h2 className="main-head"> Welcome to Forms</h2>
                <div className="signin">
                <div className="admin-signin">
                <div className="signin-option-btn">
                    <button
                    className="btn-1 btn-option"
                    style={{
                        backgroundColor:
                        type != "attendant" ? "#6fcd07" : "lightgray",
                        color: type != "attendant" ? "white" : "black",
                    }}
                    onClick={chooseAdmin}
                    >
                    Admin
                    </button>
                    <button
                    className="btn-2 btn-option"
                    onClick={chooseAttend}
                    style={{
                        backgroundColor: type != "admin" ? "#6fcd07" : "lightgray",
                        color: type != "admin" ? "white" : "black",
                    }}
                    >
                    Attendant
                    </button>
                </div>
                <div className="signin-admin-main">


                    {type == "attendant" ? (
                        <>
                        <h2 className="form-head-attendant">Attend the Quiz</h2>
                        <form className="signin-attendant-form">
                            <div className="form-id">
                            <label className="signin-label">Enter Form Id</label>
                            <input type="text"
                            placeholder="Enter Form Id"
                            className="signin-inp"
                            ></input>
                            </div>

                            <button className="attendant-enter-btn">Enter</button>
                        </form>
                        </>
                    ) : (
                        <>
                        <h2 className="signin-msg">Sign In</h2>
                        <form className="signin-admin-form">
                            <div className="admin-email">
                            <label className="signin-label">Email</label>
                            <input
                            type="email"
                            placeholder="Enter your email"
                            className="signin-inp"
                            ></input>
                            </div>

                            <div className="admin-password">
                            <label className="signin-label">Password</label>
                            <input
                            type="password"
                            className="signin-inp"
                            placeholder="Enter your password here"
                            ></input>
                            </div>
                            <a href="" className="forgot">
                            Forgot Password?
                            </a>
                            <button className="admin-signin-btn">Sign In</button> 
                        </form>


                        <div className="signin-div">
                        <button className="signin-google signin-option">
                            <i class="fa-brands fa-google"></i>
                        </button>
                        <button className="signin-twitter signin-option">
                            <i class="fa-brands fa-twitter"></i>
                        </button>
                        <button className="signin-github signin-option">
                            <i class="fa-brands fa-github"></i>
                        </button>
                        </div>


                        <div className="signupoption">
                        New user? <Link to="/">Create an account</Link>
                        </div>
                        </>
                    )}
                    
                </div>
                </div>
                </div>
                </div>
            </div>
        </>
    );
}
