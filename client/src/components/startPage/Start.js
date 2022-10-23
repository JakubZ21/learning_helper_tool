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
				<a href='./categoryPage.html'>
					<div className='button hp'>Zagraj jako gość</div>
				</a>
				<a href='./login.html'>
					<div className='button hp'>Zaloguj</div>
				</a>
				<a href='./join.html'>
					<div className='button hp'>Dołącz</div>
				</a>
			</Card>
		</div>
	);
}

export default Start;
