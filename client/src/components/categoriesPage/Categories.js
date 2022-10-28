import './Categories.css';
import BackGround from '../UI/BackGround';
import { Link, Route } from 'react-router-dom';
import Quiz from '../QuizPage/Quiz';

const Categories = () => {
	const category = [
		{
			id: '1',
			title: 'Historia',
		},
		{ id: '2', title: 'Matematyka' },
		{ id: '3', title: 'Muzyka' },
	];
	return (
		<div>
			<BackGround />
			<div class='main-cat'>
				<Link className='text-link' to='/'>
					<button className='btn-close'>close</button>
				</Link>
				<label className='lbl-cat' htmlFor='chk' aria-hidden='true'>
					Kategorie
				</label>
				<Link className='text-link' to={`/quiz/${category[0].id}`}>
					<button className='btn-ctg'>{category[0].title}</button>
				</Link>

				<Link className='text-link' to={`/quiz/${category[1].id}`}>
					<button className='btn-ctg'>{category[1].title}</button>
				</Link>
				<Link className='text-link' to={`/quiz/${category[2].id}`}>
					<button className='btn-ctg'>{category[2].title}</button>
				</Link>
			</div>
		</div>
	);
};

export default Categories;
