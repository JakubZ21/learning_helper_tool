import './Highscore.css';
import Logo from './m2.png';
import { Link, Route, useHistory } from 'react-router-dom';

const Highscore = () => {
	let history = useHistory();
	const handleX = () => {
		// console.log(sessionStorage.getItem("username"))
		sessionStorage.getItem('username') === null
			? history.push('/')
			: history.push('/user');
	};
	return (
		<div>
			{' '}
			<nav className='nav'>
				<ul className='container-username'>
					<li>{sessionStorage.getItem('username')}</li>
				</ul>
			</nav>
			<main>
				<div className='container-ranking-menu'>
					<div className='container-ranking-img'>
						<img src={Logo} alt='logo'></img>
					</div>
					<div class='container-ranking'>
						<div className='container-ranking-title'>
							<div className='ranking place'>Miejsce</div>
							<div className='ranking name'>Nazwa użytkownika</div>
							<div className='ranking score'>Punkty</div>
						</div>
						<div className='container-ranking-highscore'>
							<div className='highscore place'>1</div>
							<div className='highscore name'>Bartek</div>
							<div className='highscore score'>8</div>
							<div className='highscore place'>2</div>
							<div className='highscore name'>Krzysztof</div>
							<div className='highscore score'>5</div>
							<div className='highscore place'>3</div>
							<div className='highscore name'>Patryk</div>
							<div className='highscore score'>3</div>
							<div className='highscore place'>4</div>
							<div className='highscore name'>Ola</div>
							<div className='highscore score'>2</div>
						</div>
					</div>
				</div>
				<div className='container-ranking-btn'>
					<button className='btn-ranking' onClick={handleX}>
						Wróć
					</button>
				</div>
			</main>
			<footer></footer>
		</div>
	);
};

export default Highscore;
