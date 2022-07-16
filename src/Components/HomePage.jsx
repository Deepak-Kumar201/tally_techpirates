import "./Styles/HomePage.css";
import baseContext from "../Context/baseContext";
import { useContext, useEffect } from "react";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import GoogleImg from "../Images/google.svg";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect,
  signInWithPopup,
} from "firebase/auth";

export default function HomePage(props) {
  const context = useContext(baseContext);
  const history = useHistory();
  const [type, settype] = useState("admin");
  const chooseAdmin = () => {
    settype("admin");
  };
  const chooseAttend = () => {
    settype("attendant");
  };

  const signin = async (e) => {
    e.preventDefault();

    var email = document.getElementById("signinemail").value.trim();
    var password = document.getElementById("signinpass").value;
    var data = {
      email: email,
      password: password,
    };
    if (email == "") {
      context.showAlert("Email not entered");
      return;
    }
    if (password == "") {
      context.showAlert("Password not entered");
      return;
    }
    context.startLoader();
    console.log(data);
    var uri = "http://localhost:5000/api/user/signin";
    var resp = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    resp = await resp.json();
    context.stopLoader();
    if (resp.error) {
      context.showAlert(resp.error);
      return;
    }
    localStorage.setItem("token", resp.token);
    context.authUser();
    // history.push("/");
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
      homeUpper.style.display = sessionStorage.getItem("hiddenBar")
        ? "none"
        : "auto";

      homeWel.style.left = `${(window.innerWidth - homeWel.offsetWidth) / 2}px`;
      homeWel.style.top = `${
        (window.innerHeight - homeWel.offsetHeight) / 2
      }px`;

      window.onscroll = () => {
        homeUpper.style.top = -window.scrollY * 0.05 + "px";
        homeLower.style.height = "100vh";
        if (-window.scrollY * 1.1 <= window.innerHeight * 0.1) {
          homeUpper.style.top = -window.innerHeight * 1.1 + "px";
          window.onscroll = () => {
            var a = document.querySelectorAll(".topFix");
            for (var i of a) {
              i.style.top = window.scrollY + "px";
            }
          };
          homeLower.style.top = "0px";
          setTimeout(() => {
            homeUpper.style.display = "none";
            sessionStorage.setItem("hiddenBar", true);
          }, 2000);
          return;
        }
        homeLower.style.top = window.scrollY + "px";
      };
    }, 100);
  }, []);
  const getForm = (e) => {
    e.preventDefault();
    var fId = document.getElementById("formId").value;
    history.push(`/fill?id=${fId}`);
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

  const signinwithGoogle = (e) => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // console.log(result);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // ...
        context.startLoader();
        var data = {
          email: user.email,
          password: user.uid,
        };
        var uri = "http://localhost:5000/api/user/signin";
        var resp = await fetch(uri, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        resp = await resp.json();
        context.stopLoader();
        if (resp.error) {
          context.showAlert(resp.error);
          return;
        }
        localStorage.setItem("token", resp.token);
        context.authUser();
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
    <>
      <div
        id="homeUpper"
        style={{ display: localStorage.getItem("hiddenBar") ? "none" : "auto" }}
      >
        <div id="homeWel">
          <h1>Welcome To Quiz-Shetra</h1>
          <h4>Change the Way you Work</h4>
        </div>
      </div>
      <div id="homeLower">
        <div className="signin-full">
          <h2 className="main-head"> Welcome to Quiz-Shetra</h2>
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
                  Candidate
                </button>
              </div>
              <div className="signin-admin-main">
                {type == "attendant" ? (
                  <>
                    <h2 className="form-head-attendant">Attend the Quiz</h2>
                    <form className="signin-attendant-form">
                      <div className="form-id">
                        <label className="signin-label">Enter Quiz Id</label>
                        <input
                          type="text"
                          placeholder="Enter Form Id"
                          className="signin-inp"
                          id="formId"
                        ></input>
                      </div>

                      <button className="attendant-enter-btn" onClick={getForm}>
                        Enter
                      </button>
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
                          required={true}
                          placeholder="Enter your email"
                          className="signin-inp"
                          id="signinemail"
                        ></input>
                      </div>

                      <div className="admin-password">
                        <label className="signin-label">Password</label>
                        <input
                          type="password"
                          className="signin-inp"
                          placeholder="Enter your password here"
                          id="signinpass"
                          required={true}
                        ></input>
                      </div>
                      <a href="" className="forgot">
                        Forgot Password?
                      </a>

                      <button
                        className="admin-signin-btn"
                        onClick={signin}
                        type="submit"
                        style = {{width: "90%"}}
                      >
                        Sign In
                      </button>
                    </form>

                    <div className="signin-div">
                      <button
                        className=" signin-option"
                        id="signin-google"
                        onClick={signinwithGoogle}
                        style = {{width: "90%"}}
                      >
                        Sign In with{" "}
                        <img src={GoogleImg} type="icon" alt="Google Icon" />
                      </button>
                    </div>

                    <div className="signupoption">
                      New user? <Link to="/signup">Create an account</Link>
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
