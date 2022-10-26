import './QuizAnswear.css';

const QuizAnswear = () => {
	const answear = [
		{
			id: 'a',
			title: 'Historia',
		},
		{
			id: 'b',
			title:
				'The CSS box model is essentially a box that wraps around every HTML element. It consists ',
		},
		{ id: 'c', title: 'vfadadfasdfasdf' },
		{
			id: 'd',
			title:
				'The NavLink is used when you want to highlight a link as active. So, on every routing to a page, the link is highlighted according to the activeClassName ',
		},
	];

	return (
		<div>
			<div class='button hp'>A: {answear[0].title}</div>
			<div class='button hp'>B: {answear[1].title}</div>
			<div class='button hp'>A: {answear[2].title}</div>
			<div class='button hp'>B: {answear[3].title}</div>
		</div>
	);
};

export default QuizAnswear;
