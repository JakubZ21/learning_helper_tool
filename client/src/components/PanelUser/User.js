import './User.css';
import Logo from './m1.png';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const PanelUser = () => {
	console.log(sessionStorage.getItem('XD'));

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
							{/* <button className='btn-game second'>
								<a href='ranking.html'>ranking</a>
							</button> */}
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

							{/* <button className='btn-game second'>
								<a href='ranking.html'>ranking</a>
							</button> */}
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
