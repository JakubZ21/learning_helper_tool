import './Quiz.css';
import BackGround from '../UI/BackGround';
import Loading from '../LoadingPage/Loading';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
// import Timer from '../Timer/Timer';

const Quiz = () => {
	let history = useHistory();

	const queryParams = new URLSearchParams(window.location.search);
	const API_ENDPOINT = process.env.REACT_APP_SRV_URL;
	const urlCateg = queryParams.get('quizcode');
	console.log(urlCateg);
	const url =
	process.env.REACT_APP_SRV_URL+'questions/getqueswithcode?quiz_code=' + urlCateg;

	let url2 = process.env.REACT_APP_SRV_URL+'sendscore';

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
	const [user_id, setUserId] = useState(0);
	const [quizId, setQuizId] = useState(0);
	//nowy
	const [counter, setCounter] = useState(20);

	const fetchQuestions = async (API_ENDPOINT) => {
		const response = await axios.post(url).catch((err) => console.log(err));
		if (response) {
			const data = response.data;
			if (data.length > 0) {
				setQuestionsFetched(response.data);

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
		const getCode = await axios
			.get(process.env.REACT_APP_SRV_URL+'quiz/getQuizId?quiz_code=' + urlCateg)
			.catch((err) => console.log(err));
		if (getCode) {
			const data = getCode.data;
			if (data.length > 0) {
				setQuizId(getCode.data[0].id);

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
			answers.sort(() => Math.random() - 0.5);
			setCorrect(
				answers.findIndex(
					(element) => element === questionsFetched[index].answer_correct
				)
			);
			setAnswers(answers);
		}
	}, [questionsFetched[index], index]);

	//TIMER
	useEffect(() => {
		if (counter > 0) {
			setTimeout(() => setCounter(counter - 1), 1000);
		} else {
			setEndQuiz(true);
		}
	}, [counter]);

	const nextQuestion = () => {
		if (index >= questionsFetched.length - 1) {
			setEndQuiz(true);
			return 0;
		} else {
			console.log(index, 'NEXT QUESTION');
			setIndex(index + 1);
			return index;
		}
	};

	const checkAnswer = (e) => {
		if (e.target.classList.contains('answerCorrect')) {
			setCountCorrectAnswer(countCorrectAnswer + 1);
			console.log(`PUNKT ${countCorrectAnswer}`);
		}
		nextQuestion();
	};

	const handleBack = function () {
		sessionStorage.getItem('username') === null
			? history.push('/')
			: history.push('/user');
	};

	if (loading) {
		return (
			<div>
				<BackGround />
				<Loading />
			</div>
		);
	} else {
		if (endQuiz) {
			if (sessionStorage.getItem('id') != null) {
				fetch(url2, {
					method: 'PUT',
					body: JSON.stringify({
						//dodac inne potrzebne rzeczy do wyslania do db (np. login, numer quizu)
						score: countCorrectAnswer,
						takenby: parseInt(sessionStorage.getItem('id')),
						quiz_id: quizId,
						maxScore: questionsFetched.length,
					}),
					headers: {
						'Content-Type': 'application/json',
					},
				}).then((response) => response.json());
			}
			return (
				<div>
					<nav className='nav'></nav>
					<main className='main-container-container'>
						<div className='main-container-quiz1'>
							<div className='container-title'>Uzyskana liczba punktów:</div>
							<div className='container-score'>
								<strong>
									{countCorrectAnswer}/{questionsFetched.length}
								</strong>
							</div>

							<div className='container-text'>
								{(() => {
									if (countCorrectAnswer < 5) {
										return <h3 className='container-text-result'>Słabiutko</h3>;
									} else if (countCorrectAnswer < 5 && correctAnswer <= 7) {
										return (
											<h3 className='container-text-result'>Nie jest źle</h3>
										);
									} else {
										return (
											<h3 className='container-text-result'>
												Gratuluje wyniku
											</h3>
										);
									}
								})()}
							</div>
							<div className='container-quiz-btn'>
								<Link className='text-link' onClick={handleBack}>
									<button className='btn-join'>Powrót</button>
								</Link>
							</div>
						</div>
					</main>
				</div>
			);
		}

		return (
			<div>
				<nav className='nav'></nav>
				<main className='main-container-quiz2'>
					<div className='container'>
						<div className='justify-center flex-column'>
							<div className='container-score-question'>
								<h4>
									Poprawnych {countCorrectAnswer} /{questionsFetched.length}
								</h4>
								<h4>
									Pytanie {index} z {questionsFetched.length}
								</h4>
							</div>
							<h2 className='question'>{questionContent}</h2>

							{answersState.map((answer, index) => (
								<div className='choice-container'>
									<p className='choice-prefix'>{index + 1}</p>
									<p
										className={`choice-text ${
											answer.isCorrect && 'answerCorrect'
										}`}
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
				</main>
				<div className='quiz-timer'>
					<span>{counter}</span>
				</div>
				{/* <Timer maxRange={10} /> */}
			</div>
		);
	}
};

export default Quiz;
