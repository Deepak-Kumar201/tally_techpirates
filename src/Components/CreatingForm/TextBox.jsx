import { useContext } from "react";
import baseContext from "../../Context/baseContext";

export default function TextBox(props) {
	const context = useContext(baseContext);
	const queID = props.queID;

	const deleteQue = () => {
		document.getElementById(`cont${queID}`).remove();
	}

	function autoResize(e) {
		var elem = e.target;
		elem.rows = elem.value.split('\n').length;
	}


	return (
		<div className="container" type="text" id={`cont${queID}`}>
			<textarea type="text" className="form-control" placeholder="Enter Statement"  rows="1" onInput={autoResize} style={{ resize: "none" }}></textarea>
			<hr />
			<div className="textAreaAnswer">
				<textarea type="text" className="form-control" placeholder="Enter Answer"  rows="1" onInput={autoResize} style={{ resize: "none" }}></textarea>
			</div>
			<div className="action">
				<button className="btn btn-danger c" onClick={deleteQue}>Delete</button>
			</div>
			<div className="properties">
				<div>
					<label>Score</label><input type="number" min="0" max="100" defaultValue={0}/>

				</div>
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