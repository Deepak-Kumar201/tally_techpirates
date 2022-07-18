import { useContext } from "react";
import baseContext from "../../Context/baseContext";
import NewQue from "./NewQue";

export default function Body(props) {
	const context = useContext(baseContext);

	const showNewQue = () => {
		// console.log(window.scrollY+"px");
		context.setnewQue(true);
		document.getElementById("select").style.top = window.scrollY+"px";
	}

	return (
		<>
			{context.newForm}
			{/*<div className="container">*/}
				<div className="img"  onClick={showNewQue}>Add Question</div>
			{/*</div>*/}
			<NewQue/>
		</>
	)

}