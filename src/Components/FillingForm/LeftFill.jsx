import React, { useContext, useEffect, useState } from "react";
import FillContext from "./Context/FillContext";

export default function LeftFill() {
    const context = useContext(FillContext);
    const [data, setData] = useState(<></>);

    const getText = (que)=>{
        return <textarea style={{width:"90%",height:"50vh", padding:"20px",resize:"none",border:"none",borderRadius:"10px"}} onChange={(e)=>{context.setNewAns([e.target.value])}} placeholder="Write Your Answer" defaultValue={context.ans[que.ind]==null?"":context.ans[que.ind][0]} key={que.id}></textarea>
    }

    const updateCheckAns = (id)=>{
        var elems = document.getElementsByName(id);
        var ans = [];
        for(var i of elems){
            ans.push(i.checked);
        }
        context.setNewAns(ans);
    }

    const getRadio = (que)=>{
        var temp = [];
        if(!que.option)return<></>;
        que.option.forEach((i, ind)=>{
            temp.push(
                <div className="form-check my-2" key={que.id + i}>
                    <input
                        className="form-check-input"
                        type="radio"
                        id={"option" + ind}
                        name={que.id}
                        defaultChecked={context.ans[que.ind] == null?false:context.ans[que.ind][ind]}
                        onChange = {()=>{updateCheckAns(que.id)}}
                    />
                    <label
                        className="form-check-label"
                        htmlFor={"option"+ind}
                    >
                        {i}
                    </label>
                </div>
            )
        })  
        return temp;
    };

    const getCheck = (que)=>{
        var temp = [];
        if(!que.option)return<></>;
        que.option.forEach((i, ind)=>{
            temp.push(
                <div className="form-check my-2" key={que.id + i}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={"option" + ind}
                        name={que.id}
                        defaultChecked={context.ans[que.ind]?context.ans[que.ind][ind]:false}
                        onChange = {()=>{updateCheckAns(que.id)}}
                    />
                    <label
                        className="form-check-label"
                        htmlFor={"option"+ind}
                    >
                        {i}
                    </label>
                </div>
            )
        })  
        console.log(temp);
        return temp;
    };

    useEffect(()=>{
        var que = context.dispQue;
        if(que.type === 'text'){
            setData(getText(que));
        }else if(que.type === 'radio'){
            setData(getRadio(que));
        }else{
            setData(getCheck(que));
        }

        
    }, [context.dispQue])

    useEffect(()=>{
        setInterval(()=>{
            var timer = document.querySelector(".filltimer");
            if(!timer)return;
            timer = parseInt(timer.innerHTML);
            if(timer <= 10){
                document.getElementById("ticksound").play();
            }
            context.setCurQueTimer(timer - 1);
        }, 1000)
    }, [])

    return (
        <div>
            <div className="questionHeading">
                {
                    context.curQueTimer > 0 ?<div className="filltimer" style={{color:context.curQueTimer<=10?"white":"black", backgroundColor:context.curQueTimer<=10?"red":"smokewhite"}}>{context.curQueTimer}</div>:<></>
                }
                <div style={{color:"white"}}>Que No {context.curQue + 1}</div>
            </div>
            <div className="questionStatement">
                <div>{context.dispQue.que}</div>
                <div className="fillscore" style={{textAlign:"right"}}>Marks - {context.dispQue.score}</div>
                <div className="fillquesans">
                    {data}
                </div>
            </div>
            <button className="fillnextbtn" onClick={(e)=>{e.preventDefault(); context.getNextQue()}}>Submit and Next</button>
        </div>

    );
}
