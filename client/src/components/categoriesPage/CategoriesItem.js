import { NavLink } from 'react-router-dom';
import '../startPage/Start.css';
function CategoriesItem() {
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
			<h1>Wybierz kategorie</h1>
			{/* <a href='./quiz.html'>
				<div class='button hp'>{category[0].title}</div>
				<div class='button hp'>{category[1].title}</div>
				<div class='button hp'>{category[2].title}</div>
			</a> */}
			<NavLink to='/category/:categoryId'>
				<div class='button hp'>{category[0].title}</div>
			</NavLink>
			<NavLink to='/category/:categoryId'>
				<div class='button hp'>{category[0].title}</div>
			</NavLink>
		</div>
	);
}

export default CategoriesItem;
