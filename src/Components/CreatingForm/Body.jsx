import { useContext } from "react";
import baseContext from "../../Context/baseContext";
import NewQue from "./NewQue";

export default function Body(props) {
	const context = useContext(baseContext);

	const showNewQue = () => {
		context.setnewQue(true);
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