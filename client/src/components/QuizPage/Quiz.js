import './Quiz.css';
import BackGround from '../UI/BackGround';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Quiz = () => {
	const [index, setIndex] = useState(0);
	const [counter, setCounter] = useState(0);

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

	const [questionContent, setContent] = useState('');

	const fetchQuestions = async (API_ENDPOINT) => {
		const response = await axios(url).catch((err) => console.log(err));
		if (response) {
			const data = response.data;
			if (data.length > 0) {
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
			answers.push(questionsFetched[index].answer_1);
			answers.push(questionsFetched[index].answer_2);
			answers.push(questionsFetched[index].answer_3);
			answers.push(questionsFetched[index].answer_correct);
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
		setIndex((oldIndex) => {
			const index = oldIndex + 1;
			if (index > questionsFetched.length - 1) {
				console.log('Koniec gry');
				history.push('/');
				return 0;
			} else {
				return index;
			}
		});
	};
	//DO POPRAWY!!!!
	const checkAnswer = (value) => {
		if (value) {
			setCorrect((oldState) => oldState + 1);
		}
		nextQuestion();
	};

	return (
		<div>
			<BackGround />
			<div className='container'>
				<div className='justify-center flex-column'>
					<h2 className='question'>{questionContent}</h2>

					{answersState.map((answer, index) => (
						<div className='choice-container'>
							<p className='choice-prefix'>{index + 1}</p>
							<p className='choice-text' onClick={checkAnswer}>
								{answer}
							</p>
						</div>
					))}
					<button onClick={nextQuestion} className='btn-next'>
						Next
					</button>
				</div>
			</div>
		</div>

		// Statycznie
		// <div>
		// 	<BackGround />
		// 	<div className='container'>
		// 		<div className='justify-center flex-column'>
		// 			<h2 className='question'>{questions[index].question}</h2>

		// 			{questions[index].answer.map((answer) => (
		// 				//onClick -- index++
		// 				<div className='choice-container'>
		// 					<p className='choice-prefix'>{answer.answerPrefix}</p>
		// 					<p
		// 						className='choice-text'
		// 						style={{
		// 							backgroundColor: isActive ? 'salmon' : '',
		// 							color: isActive ? 'white' : '',
		// 						}}
		// 						onClick={handleClick}
		// 					>
		// 						{answer.answerText}
		// 					</p>
		// 				</div>
		// 			))}
		// 			<button onClick={nextQuestion} className='btn-next'>
		// 				Next
		// 			</button>
		// 		</div>
		// 	</div>
		// </div>
	);
};

export default Quiz;

///Dane Statyczne
// const questions = [
// 	{
// 		id: 1,
// 		question: 'W Której wsi rozgrywają się losy bohaterów serialu "Ranczo"?',

// 		answer: [
// 			{
// 				answerPrefix: 'A',
// 				answerText: 'Wilkowyje',
// 				answerIsTrue: true,
// 			},
// 			{
// 				answerPrefix: 'B',
// 				answerText: 'Nowa wieś',
// 				answerIsTrue: false,
// 			},
// 			{
// 				answerPrefix: 'C',
// 				answerText: 'Stara wieś',
// 				answerIsTrue: false,
// 			},
// 			{
// 				answerPrefix: 'D',
// 				answerText: 'Lipany',
// 				answerIsTrue: false,
// 			},
// 		],
// 	},
// 	{
// 		id: 2,
// 		question: 'Który piłkarz zdobył w tym roku złotą piłkę?',

// 		answer: [
// 			{
// 				answerPrefix: 'A',
// 				answerText: 'R.Lewandowski',
// 				answerIsTrue: false,
// 			},
// 			{
// 				answerPrefix: 'B',
// 				answerText: 'C.Ronaldo',
// 				answerIsTrue: false,
// 			},
// 			{
// 				answerPrefix: 'C',
// 				answerText: 'L.Messi',
// 				answerIsTrue: false,
// 			},
// 			{
// 				answerPrefix: 'D',
// 				answerText: 'K.Benzema',
// 				answerIsTrue: true,
// 			},
// 		],
// 	},
// 	{
// 		id: 3,
// 		question: 'Jak miał na imię Papkin w "Zemście?',

// 		answer: [
// 			{
// 				answerPrefix: 'A',
// 				answerText: 'Michał',
// 				answerIsTrue: false,
// 			},
// 			{
// 				answerPrefix: 'B',
// 				answerText: 'Piotr',
// 				answerIsTrue: false,
// 			},
// 			{
// 				answerPrefix: 'C',
// 				answerText: 'Józef',
// 				answerIsTrue: true,
// 			},
// 			{
// 				answerPrefix: 'D',
// 				answerText: 'Jan',
// 				answerIsTrue: false,
// 			},
// 		],
// 	},
// ];
