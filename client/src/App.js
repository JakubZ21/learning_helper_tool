//import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Start from './components/startPage/Start';
import Categories from './components/categoriesPage/Categories';
import './index.css';
import Quiz from './components/QuizPage/Quiz';
import Login from './components/LoginPage/Login';

//////
// function App() {

//   const [backendData, setBackendData] = useState([{}])

//   useEffect(() => {
//     fetch("/api").then(response => response.json()
//       ).then(data =>{
//         setBackendData(data)
//       })
//   }, [])

//   return (
//     <div>
//       {(typeof backendData.users === 'undefined') ? (
//         <p>Loading...</p>
//       ): (
//         backendData.users.map((user,i) =>
//         (<p key = {i}>
//          {user}
//         </p>))
//       )
//       }
//     </div>
//   )
// }
////////

///FE  - WS ///
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
			</Switch>
		</div>
	);
}

export default App;
