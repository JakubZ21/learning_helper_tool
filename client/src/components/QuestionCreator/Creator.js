import './Creator.css';
import Logo from './m3.png';
import { Link, useHistory } from 'react-router-dom';
import { useRef } from 'react';

const Creator = () => {
	const questionRef = useRef();
	const answer1Ref = useRef();
	const answer2Ref = useRef();
	const answer3Ref = useRef();
	const answer4Ref = useRef();
	const selectRef = useRef();

	const history = useHistory();

	const sendQuestion = (e) => {
		e.preventDefault();
		const enteredQuestion = questionRef.current.value;
		const enteredAnswer1 = answer1Ref.current.value;
		const enteredAnswer2 = answer2Ref.current.value;
		const enteredAnswer3 = answer3Ref.current.value;
		const enteredAnswer4 = answer4Ref.current.value;
		const chosenSelect = selectRef.current.value;

		let url = process.env.REACT_APP_SRV_URL + 'questions/addQuestion';
		fetch(url, {
			method: 'PUT',
			body: JSON.stringify({
				question_content: enteredQuestion,
				answer_1: enteredAnswer1,
				answer_2: enteredAnswer2,
				answer_3: enteredAnswer3,
				answer_correct: enteredAnswer4,
				category_id: chosenSelect,
				created_by: sessionStorage.getItem('id'),
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((res) => console.log(res.status))
			.then((data) => console.log(data))
			.catch((err) => console.log(err));

		///fetch, type post,userRefe()
		history.push('/user');
	};

	const handleX = () => {
		// console.log(sessionStorage.getItem("username"))
		sessionStorage.getItem('username') === null
			? history.push('/')
			: history.push('/user');
	};

	return (
		<div>
			<nav className='nav'>
				<ul className='container-username'>
					<li>{sessionStorage.getItem('username')}</li>
				</ul>
			</nav>
			<main className='container-main-creator'>
				<div className='container-creator-menu'>
					<button className='btn-close-create ' onClick={handleX}>
						close
					</button>

					{/* <div className='container-img'>
						<img src={Logo} alt='quiz-game'></img>
					</div> */}
					<div className='container-title'>
						{/* <img src={Logo} alt='quiz-game'></img> */}
					</div>
					<div className='container-creator-context'>
						<form onSubmit={sendQuestion} method='PUT'>
							<label htmlFor='question'>Pytanie </label>
							<textarea
								id='question'
								name='question_content'
								className='textarea-question'
								ref={questionRef}
							></textarea>
							<label htmlFor='question'>
								Odpowiedź <strong>1</strong>{' '}
							</label>
							<textarea
								id='answer1'
								name='answer_1'
								className='textarea-answer'
								ref={answer1Ref}
							></textarea>
							<label htmlFor='question'>
								Odpowiedź <strong>2</strong>{' '}
							</label>
							<textarea
								id='answer2'
								name='answer_2'
								className='textarea-answer'
								ref={answer2Ref}
							></textarea>
							<label htmlFor='question'>
								Odpowiedź <strong>3</strong>{' '}
							</label>
							<textarea
								id='answer3'
								name='answer_3'
								className='textarea-answer'
								ref={answer3Ref}
							></textarea>
							<label htmlFor='question'>
								Odpowiedź <strong>Poprawna</strong>{' '}
							</label>
							<textarea
								id='answer4'
								name='answer_correct'
								className='textarea-answer'
								ref={answer4Ref}
							></textarea>
							<label htmlFor='category'>Wybierz Kategorie:</label>
							<select id='category_id' name='category' ref={selectRef}>
								<option value='3'>Angielski</option>
								<option value='2'>Geografia</option>
								<option value='4'>Literatura</option>
								<option value='1'>Matematyka</option>
							</select>
							<button className='btn-textarea sub' type='submit'>
								Zatwierdź
							</button>
						</form>
					</div>
				</div>
			</main>
			<footer></footer>
		</div>
	);
};

export default Creator;
