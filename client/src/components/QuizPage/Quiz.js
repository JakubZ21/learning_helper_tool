import './Quiz.css';
import BackGround from '../UI/BackGround';
import Loading from '../LoadingPage/Loading';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Quiz = () => {
	let history = useHistory();

	const queryParams = new URLSearchParams(window.location.search);
	const API_ENDPOINT = 'http://localhost:5000/';
	const urlCateg = queryParams.get('cat_id');
	const url =
		'http://localhost:5000/questions/get10randomfromcat?category[]=' + urlCateg;

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

	const fetchQuestions = async (API_ENDPOINT) => {
		setLoading(true);
		const response = await axios(url).catch((err) => console.log(err));
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

	if (loading) {
		return (
			<div>
				<BackGround />
				<Loading />
			</div>
		);
	} else {
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
			</div>
		);
	}
};

export default Quiz;
