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
function App() {
	const context = useContext(baseContext);
	/* eslint-disable */
	window.onload = () => {
		context.stopLoader();
	}
	useEffect(()=>{
		if(localStorage.getItem('token'))context.authUser();
		context.addCookie("name2","deepak");
	}, [])

	return (
		<Router>
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
			</Switch>
			{/* <FrontPage /> */}
			{/* <HomePage /> */}
			{/* <Card /> */}
			{/* <YourForms /> */}
			{/* <Form /> */}
			{/* <ScoreCard /> */}
			{/* <ShowForm /> */}
			{/* <QuesStatic /> */}
		</Router>
	);
}

export default App;
