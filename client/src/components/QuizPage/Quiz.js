import './Quiz.css';
import BackGround from '../UI/BackGround';

const Quiz = () => {
	const questions = [
		{
			id: 1,
			question: 'dagfasjkgfnajkdfasdf',

			answer: [
				{
					answerPrefix: 'AAAAA',
					answerText: 'Choice1',
					answerIsTrue: true,
				},
				{
					answerPrefix: 'BBBB',
					answerText: 'Choice2',
					answerIsTrue: false,
				},
				{
					answerPrefix: 'CCCCC',
					answerText: 'Choice3',
					answerIsTrue: false,
				},
				{
					answerPrefix: 'DDDDD',
					answerText: 'Choice4',
					answerIsTrue: false,
				},
			],
		},
		{
			id: 2,
			question:
				'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.',

			answer: [
				{
					answerPrefix: 'AAAAA',
					answerText: 'Choice1',
					answerIsTrue: false,
				},
				{
					answerPrefix: 'BBBB',
					answerText: 'Choice2',
					answerIsTrue: true,
				},
				{
					answerPrefix: 'CCCCC',
					answerText: 'Choice3',
					answerIsTrue: false,
				},
				{
					answerPrefix: 'DDDDD',
					answerText: 'Choice4',
					answerIsTrue: false,
				},
			],
		},
	];

	return (
		<div>
			<BackGround />
			<div className='container'>
				<div className='justify-center flex-column'>
					<h2 className='question'>{questions[0].question}</h2>

					{questions[0].answer.map((answer) => (
						//onClick -- index++
						<div className='choice-container'>
							<p className='choice-prefix'>{answer.answerPrefix}</p>
							<p className='choice-text'>{answer.answerText}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Quiz;
