import './Creator.css';
import Logo from './m3.png';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const Creator = () => {
	const questionRef = useRef();
	const answer1Ref = useRef();
	const answer2Ref = useRef();
	const answer3Ref = useRef();
	const answer4Ref = useRef();
	const selectRef = useRef();

	const sendQuestion = (e) => {
		e.preventDefault();
		const enteredQuestion = questionRef.current.value;
		const enteredAnswer1 = answer1Ref.current.value;
		const enteredAnswer2 = answer2Ref.current.value;
		const enteredAnswer3 = answer3Ref.current.value;
		const enteredAnswer4 = answer4Ref.current.value;
		const chosenSelect = selectRef.current.value;

		let url = 'http://localhost:5000/questions/addQuestion';
		fetch(url, {
			method: 'PUT',
			body: JSON.stringify({
				question_content: enteredQuestion,
				answer_1: enteredAnswer1,
				answer_2: enteredAnswer2,
				answer_3: enteredAnswer3,
				answer_correct: enteredAnswer4,
				category_id: chosenSelect,
				created_by: 4,
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
	};

	return (
		<div>
			<nav className='nav'>
				<ul className='container-username'>
					<li>Username</li>
				</ul>
			</nav>
			<main className='container-main-creator'>
				<div className='container-creator-menu'>
					<Link className='text-link' to='/'>
						<button className='btn-close question'>close</button>
					</Link>
					{/* <div className='container-img'>
						<img src={Logo} alt='quiz-game'></img>
					</div> */}
					<div className='container-title'>
						<h1>Stwórz Pytanie</h1>
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
								Odpowiedź <strong>A</strong>{' '}
							</label>
							<textarea
								id='answer1'
								name='answer_1'
								className='textarea-answer'
								ref={answer1Ref}
							></textarea>
							<label htmlFor='question'>
								Odpowiedź <strong>B</strong>{' '}
							</label>
							<textarea
								id='answer2'
								name='answer_2'
								className='textarea-answer'
								ref={answer2Ref}
							></textarea>
							<label htmlFor='question'>
								Odpowiedź <strong>C</strong>{' '}
							</label>
							<textarea
								id='answer3'
								name='answer_3'
								className='textarea-answer'
								ref={answer3Ref}
							></textarea>
							<label htmlFor='question'>
								Odpowiedź <strong>D</strong>{' '}
							</label>
							<textarea
								id='answer4'
								name='answer_correct'
								className='textarea-answer'
								ref={answer4Ref}
							></textarea>
							<label htmlFor='category'>Wybierz Kategorie:</label>
							<select id='category_id' name='category' ref={selectRef}>
								<option value='Angielski'>Angielski</option>
								<option value='Geografia'>Geografia</option>
								<option value='Literatura'>Literatura</option>
								<option value='Matematyka'>Matematyka</option>
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
