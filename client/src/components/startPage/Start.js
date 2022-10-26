import { Link } from 'react-router-dom';
import BackGround from '../UI/BackGround';
import './Start.css';
import Logo from './quiz.png';

function Start() {
	return (
		<div>
			<BackGround />
			<div className='main_view'>
				<div className='welcome'>
					<img src={Logo} alt='logo'></img>
				</div>
				<div className='btn'>
					<button className='btn_main'>Szybka Gra</button>
					<Link className='text-link' to='/quiz'>
						<button className='btn_main'>Zaloguj się</button>
					</Link>
					<button className='btn_main'>Dołącz</button>
				</div>
			</div>
		</div>
	);
}

export default Start;

/* <BackGround />
			<Card className='content'>
				<div className='title'>
					<h1>Witaj w grze</h1>
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
			</Card> */
