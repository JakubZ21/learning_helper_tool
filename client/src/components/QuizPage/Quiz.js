import './Quiz.css';
import BackGround from '../UI/BackGround';

const Quiz = () => {
	return (
		<div>
			<BackGround />
			<div className='container'>
				<div className='justify-center flex-column'>
					<h2 className='question'>What is the answear to this questions</h2>
					<div className='choice-container'>
						<p className='choice-prefix'>A</p>
						<p className='choice-text'>Choice 1</p>
					</div>
					<div className='choice-container'>
						<p className='choice-prefix'>B</p>
						<p className='choice-text'>Choice 2</p>
					</div>
					<div className='choice-container'>
						<p className='choice-prefix'>C</p>
						<p className='choice-text'>Choice 3</p>
					</div>
					<div className='choice-container'>
						<p className='choice-prefix'>D</p>
						<p className='choice-text'>Choice 4</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Quiz;
