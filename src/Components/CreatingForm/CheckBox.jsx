import { useContext, useEffect, useState } from "react";
import baseContext from "../../Context/baseContext";

export default function CheckBox(props) {
	const context = useContext(baseContext)
	const [opt, setOptions] = useState([]);

	const queID = props.queID;
	var optionNo = 0;

	const deleteOpt = (e) => {
		e.target.parentNode.remove();
	}

	const addElem = () => {

		optionNo = (new Date()).getTime();

		setOptions(opt.concat([<div className="optionCont" id={`optCont${optionNo}`} key={`optCont${optionNo}`}>
			<input className="form-check-input" type="checkbox" name={`${queID}`} id={`check${optionNo}`} style={{ margin: "auto 10px auto 0px" }} />
			<input className="option" type="text" id={optionNo} placeholder="Option" style={{marginRight:"10px"}}/>
			<input type="number" min="0" max="100" placeholder="Score" className="checkScore" defaultValue={0}/>
			<i className="far fa-trash-alt" onClick={deleteOpt}></i>
			</div>
		]));


	}

	const deleteQue = () => {
		document.getElementById(`cont${queID}`).childNodes.forEach((elem)=>elem.remove());
		document.getElementById(`cont${queID}`).style.display="none";
	}
/* eslint-disable */
	useEffect(() => {
		addElem();
	}, [])
	/* eslint-enable */
	
	function autoResize(e) {
		var elem = e.target;
		elem.rows = elem.value.split('\n').length;
	}


	return (
		<div className="container" type="check" id={`cont${queID}`}>
			<textarea className="form-control" placeholder="Enter Statement" rows="1" onInput={autoResize} style={{ resize: "none" }}></textarea>
			<hr />
			{opt}
			<div className="action">
				<button className="btn btn-primary f" onClick={addElem}>Add Option </button>
				<button className="btn btn-danger c" onClick={deleteQue}>Delete</button>
				
			</div>
			<div className="properties">
				{
					context.timeBound == true?
					(
						<div>
							<label>Time</label><input type="number" min="0" max="100" defaultValue={0}/>
						</div>
					):(<></>)
				}
				{
					context.timeBound == true && context.decreasing?
					(
						<div>
							<label>Min Score</label><input type="number" min="0" max="100" defaultValue={0}/>
						</div>
					):(<></>)
				}
			</div>
		</div>

	)



}