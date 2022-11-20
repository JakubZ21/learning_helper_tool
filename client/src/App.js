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
import ProtectedRoute from './components/ProtectedRoute';
import useAuth from './components/useAuth';

function App() {
	const [isAuth, login, logout] = useAuth(false);

	return (
		<div>
			{isAuth ? (
				<>
					<div className='ui message brown'>You are logged in...</div>
					<button className='ui button blue' onClick={logout}>
						Log out
					</button>
				</>
			) : (
				<>
					<div className='ui message brown'>You are logged out...</div>
					<button className='ui button blue' onClick={login}>
						Log in
					</button>
				</>
			)}
			<Switch>
				<Route path='/' exact component={Start} />
				{/* <Redirect to='/start' />
				</Route> */}
				<Route path='/start' component={Start} />
				{/* <Start />
				</Route> */}
				<Route path='/category' exact component={Categories} />
				{/* <Categories />
				</Route> */}
				<Route path='/quiz' component={Quiz} />
				{/* <Quiz />
				</Route> */}
				<Route path='/login' component={Login} />
				{/* <Login />
				</Route> */}
				<Route path='/join' component={Join} />
				{/* <Join />
				</Route> */}
				{/* Nowe  -chronic  */}
				<ProtectedRoute path='/user' component={PanelUser} auth={isAuth} />
				{/* <PanelUser />
				</Route> */}

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
				<ProtectedRoute path='/question' component={Creator} auth={isAuth} />
				{/* <Route path='/question' component={Creator} /> */}
				{/* <Creator />
				</Route> */}
			</Switch>

			<ToastContainer />
		</div>
	);
}

export default App;
