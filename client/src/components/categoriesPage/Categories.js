import './Categories.css';
import BackGround from '../UI/BackGround';
import { Link } from 'react-router-dom';

const Categories = () => {
	const category = [
		{
			id: 'e1',
			title: 'Historia',
		},
		{ id: 'e2', title: 'Matematyka' },
		{ id: 'e3', title: 'Muzyka' },
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

				<button className='btn-ctg'>{category[0].title}</button>
				<button className='btn-ctg'>{category[1].title}</button>
				<button className='btn-ctg'>{category[2].title}</button>
			</div>
		</div>
	);
};

export default Categories;
