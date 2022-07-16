import React, { useState } from "react";

import baseContext from "./baseContext.js";

const BaseState = (props) => {
    const [newForm, setNewForm] = useState([]);
    const [newQue, setnewQue] = useState(false);
    const [user, setuser] = useState({_id:null});
    const [alert, setAlert] = useState(false);
    const [id, setID] = useState("");
    const [type, setType] = useState("input");
    const [alertBody, setAlertBody] = useState("");
    const [alertRed, setAlertRed] = useState(null);
    const [alwaysAccpet, setalwaysAccpet] = useState(false)
	const [timeBound, setTimeBound] = useState(false);
    const [decreasing, setDecreasing] = useState(false)

    let title = "";
    let description = "";
    let form = {};


    const showAlert = (data) => {
        setAlertBody(data);
        setType("message");
        setAlert(true);
    };

    const startLoader = ()=>{
        const ring = document.querySelector(".loader");
        ring.classList.remove("hiddenLoader");
    }
    const stopLoader = ()=>{
        const ring = document.querySelector(".loader");
        ring.classList.add("hiddenLoader");
    }

    const authUser =async ()=>{
        const uri = "http://localhost:5000/api/user/auth";
        const data = {
            "token": localStorage.getItem('token')
        }
        var resp = await fetch(uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        resp = await resp.json();
        if(resp.error){
            showAlert(resp.error);
            localStorage.clear("token");
        }else{
            console.log(resp)
            setuser(resp.user);
        }
    }

    const textField =  (id)=>{
        var text = document.getElementById(id);
        var question = text.querySelector("textarea");
        var answer = text.querySelector("div textarea");
        var props = text.querySelectorAll(".properties div input");
        var data = {
            que : question.value,
            ans : [answer.value]
        }
        if(data.que.length == 0){
            return {error:"Question is empty"};
        }
        props.forEach((elem, ind)=>{
            if(ind == 0) {
                data.points = [parseInt(elem.value)];
                data.score = [parseInt(elem.value)];
            }
            else if(ind == 1)data.time = elem.value;
            else data.minScore = elem.value;
        })
        console.log(data);
        return data;
    }

    const radioField = (id)=>{
        var radio = document.getElementById(id);
        var question = radio.querySelector("textarea").value;
        if(question.length == 0){
            return {error:"Question is empty"};
        }
        var options = radio.querySelectorAll(".optionCont");
        var score = radio.querySelector("div div .score").value, answer = [], points = [], option = [];
        options.forEach((elem)=>{
            if(elem.querySelector(".form-check-input").checked) {
                answer.push(1);
                points.push(parseInt(score));
            }
            else {
                answer.push(0);
                points.push(0);
            }
            option.push(elem.querySelector(".option").value);
            if(elem.querySelector(".option").value.length == 0){
                return {error : "empty option"};
            }
        });
        var data = {
            que : question,
            ans : answer,
            points : points,
            option : option,
            score : score
        }
        var props  = radio.querySelectorAll(".properties div input");
        props.forEach((elem, ind)=>{
            if(ind == 0);
            else if(ind == 1)data.time = elem.value;
            else data.minScore = elem.value;
        })
        console.log(data);
        return data;
    }

    const checkField = (id)=>{
        var check = document.getElementById(id);
        var que = check.querySelector("textarea").value;
        if(que.length == 0){
            return {error:"Question is empty"};
        }
        var options = check.querySelectorAll(".optionCont");
        var ans = [], points = [], option = [], score = 0;
        options.forEach((elem)=>{
            var childs = elem.childNodes;
            ans.push(childs[0].checked);
            option.push(childs[1].value);
            if(childs[1].value.length == 0){
                return {error : "empty option"};
            }
            var sc = parseInt(childs[2].value);
            if(childs[2].value.length == 0) sc = 0;
            points.push(sc);
            score += sc;
        })
        var data = {
            que : que,
            option : option,
            ans : ans, 
            points : points,
            score : score
        }
        var props  = check.querySelectorAll(".properties div input");
        props.forEach((elem, ind)=>{
            if(ind == 0)data.time = elem.value;
            else data.minScore = elem.value;
        })
        console.log(data);
        return data;
        
    }


    const save = async () => {
        var formData = {};
        var ans = [];

        var child = document.getElementById("parser").children;
        if (newForm.length === 0) {
            showAlert("Cannot create empty form!");
            return;
        }

        var time = [-1, -1];
        if(document.getElementById("foreverAccpet").checked == false){
            var st = (new Date(document.getElementById("startTime").value));
            var ed = (new Date(document.getElementById("endTime").value));
            console.log(st, ed, Date.now());
            if(document.getElementById("startTime").value.length == 0 || document.getElementById("endTime").value.length == 0){
                return {error : "Invalid times"};
            }
            if(st > ed || ed < Date.now()){
                return {error:"Invalid time for start and end"};
            }
            time[0] = st.getTime(); time[1] = ed.getTime();
        }

        var timeBound = false, decreasing = false;

        if(document.getElementById("timeBound").checked){
            timeBound = true;
            if(document.getElementById("decreasing").checked) decreasing = true;
        }

        title = child[1].children[2].value;
        description = child[2].children[2].value;
        
        var n = child.length;
        for (var i = 3; i < n - 1; i++) {
            var id = child[i].getAttribute("id");
            
            if (child[i].getAttribute("type") === "text") {
                var data = textField(id);
                if(data.error) return data;
                var queelem = {
                    que : data.que,
                    score : data.score
                };
                if(data.ans.length == 0){
                    return {error:"Text Field without answer"};
                }
                var anselem = {
                    ans : data.ans,
                    points : data.points,
                    decreasing : decreasing,
                    minScore : decreasing?data.minScore:0,
                    queId : id,
                    wrong : 0,
                    right : 0
                }
                formData[id] = JSON.stringify(queelem);
                ans.push(anselem);
            } else if (child[i].getAttribute("type") === "radio") {
                var data = radioField(id);
                if(data.error) return data;
                if(data.option.length == 0){
                    return {error:"No option field in MCQ"};
                }
                var queelem = {
                    que : data.que,
                    option : data.option,
                    score : data.score
                };
                var anselem = {
                    ans : data.ans,
                    points : data.points,
                    decreasing : decreasing,
                    minScore : decreasing?data.minScore:0,
                    queId : id,
                    wrong : 0,
                    right : 0
                }
                formData[id] = JSON.stringify(queelem);
                ans.push(anselem);
                
            } else {
                var data = checkField(id);
                if(data.error) return data;
                if(data.option.length == 0){
                    return {error:"No option field in MCQ"};
                }
                var queelem = {
                    que : data.que,
                    option : data.option,
                    score : data.score
                };
                var anselem = {
                    ans : data.ans,
                    points : data.points,
                    decreasing : decreasing,
                    minScore : decreasing?data.minScore:0,
                    queId : id,
                    wrong : 0,
                    right : 0
                }
                formData[id] = JSON.stringify(queelem);
                ans.push(anselem);
            }
        }

        form = JSON.stringify(formData);
        ans = JSON.stringify(ans);

        data = {
            title: title,
            description: description,
            data: form,
            answer : ans,
            time : time,
            token : localStorage.getItem('token')
        };
        console.log(data);
        // return;
        
        const url = "http://localhost:5000/api/forms/create";
        startLoader();

        var resp = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        resp = await resp.json();
        console.log(resp);
        stopLoader();
        if(resp.error){
            showAlert(resp.error);
            return;
        }

        showAlert(
            <>
                <div>Form has been successfully save!</div>
                <div> Form ID is {resp.fId}</div>
            </>
        );
        setNewForm([]);
        setDecreasing(false);
        setTimeBound(false);
        setalwaysAccpet(false);
        
        setAlertRed("/");
        return {success:"Form created"};
    };

    return (
        <baseContext.Provider
            value={{
                newForm,
                setNewForm,
                newQue,
                setnewQue,
                save,
                user,
                setuser,
                alert,
                setAlert,
                id,
                setID,
                type,
                setType,
                showAlert,
                alertBody,
                setAlertBody,
                alertRed,
                setAlertRed,
                startLoader,
                stopLoader,
                alwaysAccpet, 
                setalwaysAccpet,
                timeBound, 
                setTimeBound,
                decreasing, 
                setDecreasing,
                authUser
            }}
        >
            {props.children}
        </baseContext.Provider>
    );
};

export default BaseState;
