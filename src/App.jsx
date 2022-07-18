// import './App.css';
import React, { useContext , useEffect}  from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Alert from "./Components/Alert";
import Loader from './Components/Loader';
import HomePage from "./Components/HomePage";
import baseContext from "./Context/baseContext";
import SignUp from './Components/SignUp';
import FrontPage from './Components/FrontPage';
import Creator from "./Components/CreatingForm/Creator";
import YourForms from "./Components/YourForms";

import FillContainer from "./Components/FillingForm/FillContainer";
import FillState from "./Components/FillingForm/Context/FillState";
import Form from "./Components/Formdetails/Form";
import Changepassword from "./Components/Changepassword";
import Formerror from "./Components/FillingForm/Formerror";
import audio from "./Audio/tick.mp3"
function App() {
	const context = useContext(baseContext);
	/* eslint-disable */
	window.onload = () => {
		context.stopLoader();
	}

	const onBackButtonEvent = ()=>{
		
	}

	useEffect(()=>{
		if(localStorage.getItem('token'))context.authUser();
	}, [])

	return (
		<Router>
			<audio src={audio} id="ticksound"/>
			<Alert />
			<Loader />
			<Switch>
				<Route exact path="/">
					{context.user._id?<FrontPage />:<HomePage/>}
				</Route>
				<Route exact path="/changepass">
					<Changepassword/>
				</Route>
				<Route exact path="/signup">
					<SignUp />
				</Route>
				<Route exact path="/create">
					<Creator />
				</Route>
				<Route exact path="/fill">
					<FillState>
						<FillContainer />
					</FillState>
				</Route>
				<Route exact path="/yourforms">
					<YourForms />
				</Route>
				<Route exact path="/details">
					<Form />
				</Route>
				<Route exact path="/status">
					<Formerror/>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
