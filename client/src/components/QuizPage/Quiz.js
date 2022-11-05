import './Quiz.css';
import BackGround from '../UI/BackGround';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const Quiz = () => {
	let history = useHistory();

	const queryParams = new URLSearchParams(window.location.search);
	const API_ENDPOINT = 'http://localhost:5000/';
	const urlCateg = queryParams.get('quizcode');
	console.log(urlCateg)
	const url =
		'http://localhost:5000/questions/getqueswithcode?quiz_code=' + urlCateg;

	const [waiting, setWaiting] = useState(true);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [questionsFetched, setQuestionsFetched] = useState([]);
	const [correctAnswer, setCorrect] = useState();
	const [answersState, setAnswers] = useState([]);
	const [index, setIndex] = useState(0);
	const [countCorrectAnswer, setCountCorrectAnswer] = useState(0);
	const [questionContent, setContent] = useState('');
	const [endQuiz, setEndQuiz] = useState(false);

	let zmienna = 0; //do usuniecia
	const fetchQuestions = async (API_ENDPOINT) => {
		const response = await axios.post(url).catch((err) => console.log(err));
		if (response) {
			const data = response.data;
			if (data.length > 0) {
				console.log(zmienna, 'ZMIENNA');
				zmienna += 1; //do usunięcia
				setQuestionsFetched(response.data);
				console.log(questionsFetched);

				setLoading(false);
				setWaiting(false);
				setError(false);
			} else {
				setWaiting(true);
				setError(true);
			}
		} else {
			setWaiting(true);
		}
	};

	useEffect(() => {
		fetchQuestions();
	}, []);


	useEffect(() => {
		if (typeof questionsFetched[index] !== 'undefined') {
			setContent(questionsFetched[index].question_content);
			let answers = [];
			const answer1 = {
				answer: questionsFetched[index].answer_1,
				isCorrect: false,
			};
			const answer2 = {
				answer: questionsFetched[index].answer_2,
				isCorrect: false,
			};
			const answer3 = {
				answer: questionsFetched[index].answer_3,
				isCorrect: false,
			};
			const answer4 = {
				answer: questionsFetched[index].answer_correct,
				isCorrect: true,
			};
			answers.push(answer1);
			answers.push(answer2);
			answers.push(answer3);
			answers.push(answer4);
			console.log(answers);

			// answers.push(questionsFetched[index].answer_1);
			// answers.push(questionsFetched[index].answer_2);
			// answers.push(questionsFetched[index].answer_3);
			// answers.push(questionsFetched[index].answer_correct);
			answers.sort(() => Math.random() - 0.5);
			setCorrect(
				answers.findIndex(
					(element) => element === questionsFetched[index].answer_correct
				)
			);
			setAnswers(answers);
			// console.log(answers)
		}
	}, [questionsFetched[index], index]);

	const nextQuestion = () => {
		if (index >= questionsFetched.length - 1) {
			console.log(index, 'NEXT QUESTION-KONIEC GRY');
			console.log('Koniec gry');
			setEndQuiz(true);
			// history.push('/');
			return 0;
		} else {
			console.log(index, 'NEXT QUESTION');
			setIndex(index + 1);
			return index;
		}
		// });
	};

	const checkAnswer = (e) => {
		if (e.target.classList.contains('answerCorrect')) {
			setCountCorrectAnswer(countCorrectAnswer + 1);
			console.log(`PUNKT ${countCorrectAnswer}`);
		}
		nextQuestion();
	};

	if (endQuiz) {
		return (
			<div>
				<BackGround />
				<div className='main-container'>
					<div className='container-title'>Uzyskana liczba punktów:</div>
					<div className='container-score'>
						<strong>
							{countCorrectAnswer}/{questionsFetched.length}
						</strong>
					</div>
					<Link className='text-link' to='/'>
						<button className='btn-join'>Powrót</button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div>
			<BackGround />
			<div className='container'>
				<div className='justify-center flex-column'>
					<h3>
						Poprawnych {countCorrectAnswer} /{questionsFetched.length}
					</h3>
					<h3>
						Pytanie {index} z {questionsFetched.length}
					</h3>
					<h2 className='question'>{questionContent}</h2>

					{answersState.map((answer, index) => (
						<div className='choice-container'>
							<p className='choice-prefix'>{index + 1}</p>
							<p
								className={`choice-text ${answer.isCorrect && 'answerCorrect'}`}
								onClick={checkAnswer}
							>
								{answer.answer}
							</p>
						</div>
					))}
					<button onClick={nextQuestion} className='btn-next'>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default Quiz;
