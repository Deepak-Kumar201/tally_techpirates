import React, { useContext, useEffect, useState } from "react";
import baseContext from "../../../Context/baseContext";
import FillContext from "./FillContext";


const FillState = (props) => {
    const [title, settitle] = useState("");
    const [desc, setdesc] = useState("");
    const [queArr, setQueArr] = useState([]);
    const [newAns, setNewAns] = useState(null)
    const [boxColor, setBoxColor] = useState([]);
    const [dispQue, setdispQue] = useState({})
    const [curQueTimer, setCurQueTimer] = useState(-1);
    const [curQue, setCurQue] = useState(1e5);
    const [last, setLast] = useState(0);
    const [ans, setAns] = useState([]);
    const context = useContext(baseContext);

    const getForm = async (id)=>{
        var uri = "http://localhost:5000/api/forms/getForm";
        var data = {
            fId : id
        }
        console.log(data);

        context.startLoader();
        var resp = await fetch(uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        resp = await resp.json();
        console.log(resp);
        context.stopLoader();
        console.log(resp);
        if(resp.error){
            context.showAlert(resp.error);
            return;
        }
        data = resp.data;
        settitle(resp.title);
        setdesc(resp.description);
        
        const que = JSON.parse(JSON.parse(data));
        console.log(que);
        var arr = [];
        for(var i in que){
            var temp = JSON.parse(que[i]);
            temp.id = i;
            arr.push(temp);
        }
        var clr = [], a = [];
        for(var i = 0; i < arr.length; i++){
            clr.push("rgb(0, 177, 18)");
            a.push(null);
        }
        setBoxColor(clr);
        setQueArr(arr);
        setAns(a);
        setCurQue(0);
    }

    useEffect(()=>{
        setInterval(()=>{
            setCurQueTimer(curQueTimer - 1);
            if(curQueTimer == 0){
                getNextQue();
            }
        }, 1000)
    }, [])


    const getNextQue = ()=>{
        var temp = queArr;
        temp[curQue].time = 0;
        setQueArr(temp);
        temp = boxColor;
        temp[curQue] = 'gray';
        setBoxColor(temp);
        for(var i = curQue + 1; i < temp.length +curQue + 1; i++){
            console.log(i);
            if(temp[i % temp.length].time != 0) {
                setCurQue(i % temp.length);
                return;
            }
        }
        setCurQue(-1);
    }

    useEffect(()=>{
        if(curQue == -1){
            submit();
            return;
        }
        console.log(curQue);
        if(curQue < queArr.length){
            var arr = ans;
            arr[last] = newAns;
            setAns(arr);
            setLast(curQue);
            setNewAns(ans[curQue]);
            setCurQueTimer(queArr[curQue].time);
            setdispQue(queArr[curQue]);
        }
    }, [curQue])

    useEffect(()=>{
        console.log(dispQue);
    }, [dispQue])

    // useEffect(()=>{
    //     console.log(curQueTimer);
    // }, [curQueTimer])

    const submit = ()=>{
        var filled = {};
        for(var i = 0; i < queArr.length; i++){
            if(ans[i] !== null)filled[queArr[i].id] = ans[i];
            else filled[queArr[i].id] = [];
        }
        
        
    }


    return (
        <FillContext.Provider
            value={{
                getNextQue,getForm,title, settitle,desc, setdesc,queArr, setQueArr,dispQue, setdispQue, curQueTimer, setCurQueTimer,curQue, setCurQue,boxColor, setBoxColor, ans, setAns, newAns, setNewAns, submit
            }}
        >
            {props.children}
        </FillContext.Provider>
    );
};

export default FillState;
