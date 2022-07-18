import React, { useState } from "react";

import baseContext from "./baseContext.js";

const BaseState = (props) => {
    const [newForm, setNewForm] = useState([]);
    const [newQue, setnewQue] = useState(false);
    const [user, setuser] = useState({_id:null, forms:[]});
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
            // console.log(resp)
            setuser(resp.user);
        }
    }

    const textField =  (id)=>{
        var text = document.getElementById(id);
        var question = text.querySelector("textarea");
        var answer = text.querySelector("div .answer");
        var props = text.querySelectorAll(".properties div input");
        var data = {
            que : question.value.trim(),
            ans : [answer.value.trim()]
        }
        if(data.que.length == 0){
            return {error:"Question is empty"};
        }
        // console.log(data);
        if(data.ans[0].length == 0){
            return {error:"Answer is empty"};
        }
        props.forEach((elem, ind)=>{
            if(ind == 0) {
                data.points = [parseInt(elem.value)];
                data.score = parseInt(elem.value);
            }
            else if(ind == 1){
                data.time = parseInt(elem.value);
                // console.log(data.time)
            }
            else data.minScore = elem.value;
        })
        
        if(data.time && data.time <= 0){
            return {error : "Time must be greater than 0"};
        }
        
        if(data.score <= 0){
            return {error : "Score must be positive number"};
        }

        if(data.minScore && (data.score < data.minScore || data.minScore <= 0)){
            return {error : "Min score mush be smaller than score and positive"};
        }

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
                answer.push(true);
                points.push(parseInt(score));
            }
            else {
                answer.push(false);
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
            else if(ind == 1){
                data.time = elem.value;
            }
            else data.minScore = elem.value;
        })
        if(data.time && data.time <= 0) return {error : "Time must be greater than 0"};
        if(option.length == 0){
            return {error: "Question should have at least 1 option"};
        }
        if(data.score <= 0){
            return {error : "Score must be positive number"};
        }

        var alloption = false;
        for(var i of option){
            if(i.length == 0) alloption = true;
        }
        if(alloption) {
            return {error:"Option Can't be empty"};
        }

        var ans = true;
        for(var i of data.ans){
            if(i) ans = false;
        }
        if(ans){
            return {error : "Question must have answer marked"};
        }
        // console.log(data);
        if(data.minScore && (data.score < data.minScore || data.minScore <= 0)){
            return {error : "Min score mush be smaller than score and positive"};
        }
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
        if(option.length == 0){
            return {error: "Question should have at least 1 option"};
        }

        if(score <= 0){
            return {error : "Score must be positive number"};
        }
        // console.log("soce", score);
        var ansOpt = true, invalidSc = false;
        for(var i = 0; i < ans.length; i++){
            if(ans[i]) ansOpt = false;
            if((ans[i] == false && data.points[i] > 0) || data.points[i] < 0 ||(ans[i] && data.points[i] == 0)) invalidSc = true;
        }
        if(invalidSc){
            return {error : "Invalid Score"};
        }
        if(ansOpt){
            return {error : "Question should have answer marked"};
        }

        var alloption = false;
        for(var i of option){
            if(i.length == 0) alloption = true;
        }

        if(alloption) {
            return {error:"Option Can't be empty"};
        }


        var props  = check.querySelectorAll(".properties div input");
        props.forEach((elem, ind)=>{
            if(ind == 0){
                data.time = elem.value;
            }
            else data.minScore = elem.value;
        })
        if(data.minScore && (data.score < data.minScore || data.minScore <= 0)){
            return {error : "Min score mush be smaller than score and positive"};
        }
        if(data.time && data.time <= 0) return {error : "Time must be greater than 0"};
        // console.log(data);
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
            // console.log(st, ed, Date.now());
            if(document.getElementById("startTime").value.length == 0 || document.getElementById("endTime").value.length == 0){
                return {error : "Invalid times"};
            }
            if(st > ed || ed < Date.now()){
                return {error:"Invalid time for start and end"};
            }
            time[0] = st.getTime(); time[1] = ed.getTime();
        }
        var shuffle = document.getElementById("suffleques").checked;
        var timeBound = false, decreasing = false;

        if(document.getElementById("timeBound").checked){
            timeBound = true;
            if(document.getElementById("decreasing").checked) decreasing = true;
        }

        title = child[1].children[2].value;
        description = child[2].children[2].value;
        // console.log(timeBound);
        var n = child.length;
        for (var i = 3; i < n - 1; i++) {
            var id = child[i].getAttribute("id");
            if(child[i].style.display == 'none') continue;
            if (child[i].getAttribute("type") === "text") {
                var data = textField(id);
                if(data.error) return data;
                var queelem = {
                    que : data.que,
                    score : data.score,
                    type : "text",
                    time : timeBound?parseInt(data.time):-1,
                };
                if(data.ans.length == 0){
                    return {error:"Text Field without answer"};
                }
                var anselem = {
                    ans : data.ans,
                    time : timeBound?parseInt(data.time):-1,
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
                    score : data.score,
                    type : "radio",
                    time : timeBound?parseInt(data.time):-1
                };
                var anselem = {
                    ans : data.ans,
                    points : data.points,
                    time : timeBound?parseInt(data.time):-1,
                    decreasing : decreasing,
                    minScore : decreasing?data.minScore:0,
                    queId : id,
                    wrong : 0,
                    right : 0,
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
                    score : data.score,
                    type : "check",
                    time : timeBound?parseInt(data.time):-1
                };
                var anselem = {
                    ans : data.ans,
                    points : data.points,
                    time : timeBound?parseInt(data.time):-1,
                    decreasing : decreasing,
                    minScore : decreasing?data.minScore:0,
                    queId : id,
                    wrong : 0,
                    right : 0,
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
            shuffle:shuffle,
            token : localStorage.getItem('token')
        };
        // console.log(data);
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
        // console.log(resp);
        stopLoader();
        if(resp.error){
            showAlert(resp.error);
            return;
        }

        showAlert(
            <>
                <div>Quiz has been successfully save!</div>
                <div> Quiz ID is {resp.fId}</div>
            </>
        );
        setNewForm([]);
        setDecreasing(false);
        setTimeBound(false);
        setalwaysAccpet(false);
        
        setAlertRed("/");
        return {success:"Form created"};
    };

    const addCookie = (key, value)=>{
        var cookie = document.cookie;
        // console.log("cookies ", cookie);
        cookie += `${key}=${value};httpOnly;`;
        // console.log(cookie);
        document.cookie = cookie;
    }

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
                authUser,
                addCookie
            }}
        >
            {props.children}
        </baseContext.Provider>
    );
};

export default BaseState;
