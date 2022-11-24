import { Link } from 'react-router-dom';
import BackGround from '../UI/BackGround';
import './Start.css';
import Logo from './quiz.png';

function Start() {
	return (
		<div>
			<nav className='nav'>
				{/* <ul class='container-username'>
					<li>Username</li>
				</ul> */}
			</nav>
			<main className='container-main-start'>
				<div className='main_view'>
					<div className='container-img'>
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
						{/* <Link className='text-link' to='/question'>
							<button className='btn_main'>Próbny</button>
						</Link> */}
					</div>
				</div>
			</main>
		</div>
	);
}

export default Start;
