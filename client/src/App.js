//import React, { useEffect, useState } from 'react';
import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Start from './components/startPage/Start';
import Categories from './components/categoriesPage/Categories';
import './index.css';
import Quiz from './components/QuizPage/Quiz';
import Login from './components/LoginPage/Login';
import Join from './components/JoinPage/Join';
import PanelUser from './components/PanelUser/User';
import { ToastContainer, toast } from 'react-toastify';
import Creator from './components/QuestionCreator/Creator';
import Highscore from './components/Highscore/Highscore';
import HighscoreDetails from './components/Highscore/HighscoreDetails';
import CreateGame from './components/CreateGame/CreateGame';

function App() {
	return (
		<div>
			<Switch>
				<Route path='/' exact>
					<Redirect to='/start' />
				</Route>
				<Route path='/start'>
					<Start />
				</Route>
				<Route path='/category' exact>
					<Categories />
				</Route>
				<Route path='/quiz'>
					<Quiz />
				</Route>
				<Route path='/login'>
					<Login />
				</Route>
				<Route path='/join'>
					<Join />
				</Route>
				<Route path='/user' exact>
					<PanelUser />
				</Route>
				<Route path='/question'>
					<Creator />
				</Route>
				<Route path='/highscore/:quiz_code'>
					<HighscoreDetails />
				</Route>
				<Route exact path='/highscore'>
					<Highscore />
				</Route>
				<Route path='/createGame'>
					<CreateGame />
				</Route>
			</Switch>

			<ToastContainer />
		</div>
	);
}

export default App;
