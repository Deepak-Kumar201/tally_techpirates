import { useContext, useState } from "react";
import baseContext from "../../Context/baseContext";

export default function Header() {
	const {alwaysAccpet, setalwaysAccpet, timeBound, setTimeBound, decreasing, setDecreasing} = useContext(baseContext);
	function autoResize(e) {
		var elem = document.getElementById("formDesc");
		elem.rows = elem.value.split('\n').length;
	}

	function shrinkText() {
		var elem = document.getElementById("formTitle");
		elem.value = elem.value.split('\n')[0];
	}

	return (
		<>
			<div className="container">
				<div className="formSetting">
					<div>
						<input type="checkbox" name="foreverAccpet" id="foreverAccpet" className="form-check-input" checked={alwaysAccpet} onChange={(e)=>{setalwaysAccpet(e.target.checked)}}/> <label htmlFor="foreverAccpet">On/Off Manually</label>
					</div>
					{
					alwaysAccpet == false?(
						<>
							<div className="dflex">
								<label htmlFor="#startTime">Start Time </label>
								<input type="datetime-local" name="" id="startTime" className="form-control"/>
							</div>
							<div className="dflex">
								<label htmlFor="#endTime">End Time </label>
								<input type="datetime-local" name="" id="endTime" className="form-control"/>
							</div>
						</>
					):
						<></>
					}
				</div>

				<div className="formSetting">
					<div><input type="checkbox" name="suffleques" id="suffleques" className="form-check-input"/><label htmlFor="suffleques">Shuffle Questions</label></div>
					<div><input type="checkbox" name="timeBound" id="timeBound" checked={timeBound} onChange={(e)=>{setTimeBound(e.target.checked)}} className="form-check-input"/><label htmlFor="timeBound">Time Bound Questions</label></div>
					<div>
					{
						timeBound == true?(
								<><input type="checkbox" id="decreasing" name="decreasing" checked={decreasing} onChange={(e)=>{setDecreasing(e.target.checked)}} className="form-check-input"/> <label htmlFor="decreasing">Variable Scoring based on Time</label></>
								):(
									<></>
									)
								}
					</div>
				</div>
			</div>
			<div className="title container" type="title" id="title">
				<h2>Title of your Quiz</h2><br />
				<textarea className="form-control" placeholder="Enter quiz Title" id="formTitle" rows="1"  onInput={shrinkText} style={{ resize: "none" }}></textarea>
			</div>
			<div className="header container" type="description" id="descr">
				<h3>Description</h3><br/>
				<textarea className="form-control" id="formDesc" placeholder="Enter Description" rows="1" onInput={autoResize} style={{ resize: "none" }}></textarea>
			</div>
			
		</>
	);
}