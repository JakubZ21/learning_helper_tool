import './Join.css';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

const Join = () => {
	const [quizCode, setQuizCode] = useState('');
	let history = useHistory();

	const handleChange = (passed) => {
		setQuizCode(passed.target.value);
		// setQuizCode()
	};

	const submitHandle = (event) => {
		history.push('/quiz/?quizcode=' + quizCode);
	};

	const handleX = () => {
		// console.log(sessionStorage.getItem("username"))
		sessionStorage.getItem('username') === null
			? history.push('/')
			: history.push('/user');
	};
	return (
		<div>
			<nav class='nav'></nav>
			<main className='container-main'>
				<div className='main-join'>
					{/* <form> */}
					<label htmlFor='chk' aria-hidden='true'></label>
					<input
						className='input-join'
						type='text'
						name='txt'
						placeholder='Podaj kod'
						required=''
						onChange={handleChange}
					/>
					<div className='container-join-btns'>
						<button onClick={submitHandle} className='btn-join'>
							Zatwierdź
						</button>
						{/* </form> */}
						<button className='btn-join' onClick={handleX}>
							Powrót
						</button>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Join;
