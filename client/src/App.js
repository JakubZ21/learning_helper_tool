//import React, { useEffect, useState } from 'react';
import Start from './components/startPage/Start';
import Categories from './components/categoriesPage/Categories';
import './index.css';

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
			<Categories />
		</div>
	);
}

export default App;
