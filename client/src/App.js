//import React, { useEffect, useState } from 'react';
import React, { useState, useMemo } from 'react';
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
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

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
				{/* Nowe  -chronic  */}
				<Route path='/user' exact component={PanelUser}>
					<PanelUser />
				</Route>

				{/* <PrivateRoute path='/user' exact component={PanelUser}>
					<PanelUser />
				</PrivateRoute> */}
				{/* <Route
					path='/user'
					element={
						<PrivateRoute>
							<PanelUser />
						</PrivateRoute>
					}
				/> */}
				{/* Nowe  */}
				<Route path='/question'>
					<Creator />
				</Route>
			</Switch>

			<ToastContainer />
		</div>
	);
}

export default App;
