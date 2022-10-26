import { Link } from 'react-router-dom';
import Card from '../UI/Card';
import BackGround from '../UI/BackGround';
import './Start.css';

function Start() {
	return (
		<div>
			<BackGround />
			<Card className='content'>
				<div className='title'>
					<h1>Witaj w grze. Wybierz Zagraj,aby przejść dalej</h1>
				</div>
				<Link to='/category'>
					<div className='button hp'>Zagraj jako gość</div>
				</Link>
				<Link to='/quiz'>
					<div className='button hp'>Zaloguj</div>
				</Link>
				<Link to='./login'>
					<div className='button hp'>Dołącz</div>
				</Link>
			</Card>
		</div>
	);
}

export default Start;
