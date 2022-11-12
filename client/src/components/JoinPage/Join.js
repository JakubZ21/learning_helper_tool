import './Join.css';
import BackGround from '../UI/BackGround';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

const Join = () => {
	const [quizCode, setQuizCode] = useState('');
	let history = useHistory();
	// useEffect(()=>{
	// 	console.log(quizCode)
	// },quizCode)
	// useEffect(() => {
	// 	// fetchQuestions();
	// 	console.log("effect")
	// }, quizCodeInputRef);

	const handleChange = (passed) => {
		setQuizCode(passed.target.value);
		// setQuizCode()
	};

	const submitHandle = (event) => {
		history.push('/quiz/?quizcode=' + quizCode);
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
						placeholder='Podaj KOD PIN'
						required=''
						onChange={handleChange}
					/>

					<button onClick={submitHandle} className='btn-join'>
						Zatwierdź
					</button>
					{/* </form> */}
					<Link className='text-link' to='/'>
						<button className='btn-join'>Powrót</button>
					</Link>
				</div>
			</main>
		</div>
	);
};

export default Join;
