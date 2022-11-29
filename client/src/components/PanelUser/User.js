import './User.css';
import Logo from './m1.png';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const PanelUser = () => {
	
	const history = useHistory();
	const handleLogout = function () {
		sessionStorage.clear();
		history.push('/');
	};
	if (sessionStorage.getItem('user_type') === 'TEACHER_USER') {
		return (
			<>
				<nav className='nav'>
					<ul className='container-username'>
						<li>{sessionStorage.getItem('username')}</li>
					</ul>
				</nav>
				<main className='main-container-panelUser'>
					<div className='container-menu'>
						<div className='container-img'>
							<img src={Logo} alt='quiz-game'></img>
						</div>
						<div className='container-context'>
							<Link className='text-link' to='/category'>
								<button className='btn-game first'>Szybka Gra</button>
							</Link>
							<Link className='text-link' to='/question'>
								<button className='btn-game second'>Dodaj Pytanie</button>
							</Link>
							<Link className='text-link' to='/createGame'>
								<button className='btn-game third'>Stwórz grę</button>
							</Link>
							<button className='btn-game fourth' onClick={handleLogout}>
								Wyloguj się
							</button>
						</div>
					</div>
				</main>
				<footer></footer>
			</>
		);
	} else {
		return (
			<>
				<nav className='nav'>
					<ul className='container-username'>
						<li>{sessionStorage.getItem('username')}</li>
					</ul>
				</nav>
				<main className='main-container-panelUser'>
					<div className='container-menu'>
						<div className='container-img'>
							<img src={Logo} alt='quiz-game'></img>
						</div>
						<div className='container-context'>
							<Link className='text-link' to='/category'>
								<button className='btn-game first'>Szybka Gra</button>
							</Link>
							<Link className='text-link' to='/highscore'>
								<button className='btn-game second'>Wynik</button>
							</Link>
							<Link className='text-link' to='/join'>
								<button className='btn-game third'>Dołącz</button>
							</Link>
							<button className='btn-game fourth' onClick={handleLogout}>
								Wyloguj się
							</button>
						</div>
					</div>
				</main>
				<footer></footer>
			</>
		);
	}
};
export default PanelUser;
