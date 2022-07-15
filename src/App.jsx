// import './App.css';
import React, { useContext , useEffect}  from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Alert from "./Components/Alert";
import Loader from './Components/Loader';
import HomePage from "./Components/HomePage";
import baseContext from "./Context/baseContext";
import SignUp from './Components/SignUp';
import FrontPage from './Components/FrontPage';

function App() {
	const context = useContext(baseContext);
	/* eslint-disable */
	useEffect(() => {
		window.addEventListener('load', () => {
			context.stopLoader();
		})
	}, []);
	return (
		<Router>
			{/* <Alert />
			<Loader />
			<Switch>
				<Route exact path="/">
					<HomePage />
				</Route>
	
			</Switch> */}
			<SignUp />
			{/* <FrontPage /> */}
			{/* <HomePage /> */}
		</Router>
	);
}

export default App;
