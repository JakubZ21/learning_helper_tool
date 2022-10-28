import './Quiz.css';
import BackGround from '../UI/BackGround';
import { useState } from 'react';

const Quiz = () => {
	const [index, setIndex] = useState(0);
	const [isActive, setIsActive] = useState(true);

	const handleClick = () => {
		setIsActive(false);
	};

	const questions = [
		{
			id: 1,
			question: 'W Której wsi rozgrywają się losy bohaterów serialu "Ranczo"?',

			answer: [
				{
					answerPrefix: 'A',
					answerText: 'Wilkowyje',
					answerIsTrue: true,
				},
				{
					answerPrefix: 'B',
					answerText: 'Nowa wieś',
					answerIsTrue: false,
				},
				{
					answerPrefix: 'C',
					answerText: 'Stara wieś',
					answerIsTrue: false,
				},
				{
					answerPrefix: 'D',
					answerText: 'Lipany',
					answerIsTrue: false,
				},
			],
		},
		{
			id: 2,
			question: 'Który piłkarz zdobył w tym roku złotą piłkę?',

			answer: [
				{
					answerPrefix: 'A',
					answerText: 'R.Lewandowski',
					answerIsTrue: false,
				},
				{
					answerPrefix: 'B',
					answerText: 'C.Ronaldo',
					answerIsTrue: false,
				},
				{
					answerPrefix: 'C',
					answerText: 'L.Messi',
					answerIsTrue: false,
				},
				{
					answerPrefix: 'D',
					answerText: 'K.Benzema',
					answerIsTrue: true,
				},
			],
		},
		{
			id: 3,
			question: 'Jak miał na imię Papkin w "Zemście?',

			answer: [
				{
					answerPrefix: 'A',
					answerText: 'Michał',
					answerIsTrue: false,
				},
				{
					answerPrefix: 'B',
					answerText: 'Piotr',
					answerIsTrue: false,
				},
				{
					answerPrefix: 'C',
					answerText: 'Józef',
					answerIsTrue: true,
				},
				{
					answerPrefix: 'D',
					answerText: 'Jan',
					answerIsTrue: false,
				},
			],
		},
	];

	const nextQuestion = () => {
		setIndex((oldIndex) => {
			const index = oldIndex + 1;
			if (index > questions.length - 1) {
				console.log('Koniec gry');
				return 0;
			} else {
				return index;
			}
		});
	};

	return (
		<div>
			<BackGround />
			<div className='container'>
				<div className='justify-center flex-column'>
					<h2 className='question'>{questions[index].question}</h2>

					{questions[index].answer.map((answer) => (
						//onClick -- index++
						<div className='choice-container'>
							<p className='choice-prefix'>{answer.answerPrefix}</p>
							<p
								className='choice-text'
								style={{
									backgroundColor: isActive ? 'salmon' : '',
									color: isActive ? 'white' : '',
								}}
								onClick={handleClick}
							>
								{answer.answerText}
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
