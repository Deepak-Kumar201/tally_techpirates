import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import baseContext from "../../../Context/baseContext";
import FillContext from "./FillContext";


const FillState = (props) => {
    const [title, settitle] = useState("");
    const [name, setname] = useState("")
    const [desc, setdesc] = useState("");
    const [fId, setfId] = useState("")
    const [queArr, setQueArr] = useState([]);
    const [newAns, setNewAns] = useState(null)
    const [boxColor, setBoxColor] = useState([]);
    const [dispQue, setdispQue] = useState({})
    const [curQueTimer, setCurQueTimer] = useState(-1);
    const [curQue, setCurQue] = useState(1e5);
    const [last, setLast] = useState(0);
    const [ans, setAns] = useState([]);
    const context = useContext(baseContext);
    const history = useHistory();

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }


    const getForm = async (id)=>{
        var uri = "http://localhost:5000/api/forms/getForm";
        var filled = localStorage.getItem("filled");
        if(!filled) filled = [];
        else filled = JSON.parse(filled);
        if(filled.indexOf(id) != -1){
            var m = "You have already attempted quiz";
            history.push('/status?m='+m)
            localStorage.removeItem("filling")
            return;
        }

        var data = {
            fId : id,
            // filled : localStorage.getItem("filled")
        }
        setfId(id);
        // console.log("data ", data);
        context.startLoader();
        var resp = await fetch(uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        resp = await resp.json();
        // console.log("response -> ", resp);
        context.stopLoader();
        if(resp.error){
            var m = resp.error;
            history.push('/status?m='+m)
            localStorage.removeItem("filling")
            return;
        }
        data = resp.data;
        settitle(resp.title);
        setdesc(resp.description);
        var x = context.user.name;
        if(!x)x = "";
        // console.log("username");

        while(x != null && x.trim().length == 0){
            x = window.prompt("Enter your Name");
        }
        if(x == null){
            var m = "You need to enter your name.";
            history.push('/status?m='+m)
            localStorage.removeItem("filling")
            return;
        }
        setname(x.trim());
        localStorage.setItem("filling", resp._id);
        const que = JSON.parse(JSON.parse(data));
        var arr = [];
        for(var i in que){
            var temp = JSON.parse(que[i]);
            temp.id = i;
            arr.push(temp);
        }
        if(resp.shuffle) arr = shuffle(arr)
        
        arr.forEach((elem, ind)=>{
            elem.ind = ind;
        })

        var clr = [], a = [];
        for(var i = 0; i < arr.length; i++){
            clr.push("rgb(0, 177, 18)");
            a.push(null);
        }
        setBoxColor(clr);
        setQueArr(arr);
        setAns(a);
        setCurQueTimer(arr[0].time);
        setCurQue(0);
        setLast(0);
    }

    window.onbeforeunload = async ()=>{
		var filling = localStorage.getItem("filling");
		var filled = localStorage.getItem("filled");
		if(!filling) return;
		
		if(!filled) filled = [];
		else filled = JSON.parse(filled);
		// console.log("object");
		filled.push(filling);
		localStorage.setItem("filled",JSON.stringify(filled));
		localStorage.removeItem("filling");
        await submit();
	}

    useEffect(()=>{
        if(curQueTimer == 0) getNextQue();
    }, [curQueTimer])

    const getNextQue = ()=>{
        // updating timer
        var temp = queArr;
        temp[curQue].time = curQueTimer;
        setQueArr(temp);

        //updating color
        var clr = boxColor;
        clr[curQue] = 'gray';
        setBoxColor(clr);

        //updating ansarr
        var arr = ans;
        arr[curQue] = newAns;
        setAns(arr);

        //getting next que with timer > 0
        for(var i = curQue + 1; i < temp.length +curQue + 1; i++){
            if(temp[i % temp.length].time !== 0) {
                // console.log(temp[i % temp.length]);
                setCurQue(i % temp.length);
                return;
            }
        }
        setCurQue(-1);
    }

    useEffect(()=>{
        // console.log(ans);
    }, [ans]);

    useEffect(()=>{
        if(curQue == -1){
            submit();
            return;
        }
        if(curQue < queArr.length){
            //updating timer
            var temp = queArr;
            temp[last].time = curQueTimer;
            setQueArr(temp);

            //updating answer
            var arr = ans;
            arr[last] = newAns;
            setAns(arr);

            //setting data            
            setLast(curQue);
            setNewAns(ans[curQue]);
            setCurQueTimer(queArr[curQue].time);
            setdispQue(queArr[curQue]);
        }
    }, [curQue])


    const submit = async()=>{
        var filled = {};
        for(var i = 0; i < queArr.length; i++){
            filled[queArr[i].id] = {};
            if(ans[i] !== null){
                filled[queArr[i].id].ans = ans[i];
                filled[queArr[i].id].time = queArr[i].time;
            }
            else {
                filled[queArr[i].id].ans = [];
            }
        }
        // console.log(filled);
        context.startLoader();
        var uri = "http://localhost:5000/api/forms/fill";
        var data = {
            name : name,
            answer : filled,
            fId : fId,
            filled : localStorage.getItem("filled")
        }

        var resp = await fetch(uri, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        resp = await resp.json();
        console.log(resp);
        context.stopLoader();

        if(resp.error){
            var m = resp.error;
            history.push('/status?m='+m)
            return;
        }
        var arr = localStorage.getItem("filled");
        if(!arr) arr = [];
        else arr = JSON.parse(arr);
        arr.push(fId);
        localStorage.setItem("filled", JSON.stringify(arr));
        var m = "Form Submitted Successfully and your score is "+resp.score + " and your Participant ID is " + resp.respNo;
        history.push("/status?m="+m);
    }


    return (
        <FillContext.Provider
            value={{
                getNextQue,getForm,title, settitle,desc, setdesc,queArr, setQueArr,dispQue, setdispQue, curQueTimer, setCurQueTimer,curQue, setCurQue,boxColor, setBoxColor, ans, setAns, newAns, setNewAns, submit, name, setname
            }}
        >
            {props.children}
        </FillContext.Provider>
    );
};

export default FillState;
