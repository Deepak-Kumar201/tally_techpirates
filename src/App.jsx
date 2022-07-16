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
import Card from "./Components/Card";
import YourForms from "./Components/YourForms";
import FillContainer from "./Components/FillingForm/FillContainer";
import FillState from "./Components/FillingForm/Context/FillState";
function App() {
	const context = useContext(baseContext);
	/* eslint-disable */
	window.onload = () => {
		context.stopLoader();
	}
	useEffect(()=>{
		if(localStorage.getItem('token'))context.authUser();
	}, [])

	return (
		<Router>
			<Alert />
			<Loader />
			<Switch>
				<Route exact path="/">
					{context.user._id?<FrontPage />:<HomePage/>}
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
			</Switch>
			{/* <FrontPage /> */}
			{/* <HomePage /> */}
			{/* <Card /> */}
			{/* <YourForms /> */}
		</Router>
	);
}

export default App;
