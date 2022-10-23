import '../startPage/Start.css';
function CategoriesItem() {
	const category = [
		{
			id: 'e1',
			title: 'History',
		},
		{ id: 'e2', title: 'Math' },
		{ id: 'e3', title: 'Music' },
	];
	return (
		<div>
			<h1>Wybierz kategorie</h1>
			<a href='./quiz.html'>
				<div class='button hp'>{category[0].title}</div>
				<div class='button hp'>{category[1].title}</div>
				<div class='button hp'>{category[2].title}</div>
			</a>
		</div>
	);
}

export default CategoriesItem;
