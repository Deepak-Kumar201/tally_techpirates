export default function getForm(formQue){
    var arr = [];
    var quesNO = 1;
    for(var i in formQue){
        var que = JSON.parse(formQue[i]);
        if(que.type == 'text'){
            arr.push(
                <div className="textshowform">
                    Question {quesNO++} : <div className="textshowformque">{que.que}</div>
                </div>
            )
        }else {
            arr.push(
                <>
                    <div className="textshowform">
                        Question {quesNO++}: <div className="textshowformque">{que.que}</div>
                    </div>
                    <div className="textshowformopt">
                        {
                            que.option.map((elem)=>{
                                return <div><input type={que.type=='radio'?"radio":"checkbox"} checked={false}/> <label>{elem}</label></div>
                            })
                        }
                    </div>
                </>
            )
        }
        arr.push(<hr style={{color:"white"}}/>);
    }
    arr.pop();
    return arr;
}