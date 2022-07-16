import { useContext } from "react";
import baseContext from "../../Context/baseContext";
import Body from "./Body";
import Header from "./Header";
import "./Styles/Creator.css";
import { useHistory } from "react-router-dom";

export default function Creator() {
	const context = useContext(baseContext);
	var histroy = useHistory();

	const deleteForm = () => {
		context.setNewForm([]);
		document.getElementById("formDesc").value = "";
		document.getElementById("formTitle").value = "";
		histroy.push("/");
	}


	const saveForm = async () => {

		if (document.getElementById("formTitle").value.trim() === "") {
			context.showAlert("Title Cannot Be Empty");
			return;
		}

		if (document.getElementById("formDesc").value.trim() === " ") {
			context.showAlert("Description Cannot Be Empty");
			return;
		}
		console.log("object");
		var res = await context.save();
		if(res.error) {
			context.showAlert(res.error);
		}
	}

	if (context.user === null) {
		histroy.push("/");
		return(<></>)
	}

	return (
		<>
			<div id="parser">
				<Header />
				<Body />
			</div>
			<div className="act">
				<button className="btn btn-danger" onClick={deleteForm}>Cancel</button>
				<button className="btn btn-primary" onClick={saveForm}>Save</button>
			</div>
		</>
	)
}