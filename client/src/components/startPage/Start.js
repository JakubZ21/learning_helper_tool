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
					<Link className='text-link' to='/category'>
						<button className='btn_main'>Szybka Gra</button>
					</Link>
					<Link className='text-link' to='/login'>
						<button className='btn_main'>Zaloguj się</button>
					</Link>
					<Link className='text-link' to='/join'>
						<button className='btn_main'>Dołącz</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Start;
