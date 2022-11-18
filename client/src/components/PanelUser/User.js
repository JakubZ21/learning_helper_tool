import './User.css';
import Logo from './m1.png';
import { useEffect } from 'react';
import { useState } from 'react';

const PanelUser = () => {
	return (
		<>
			<nav className='nav'>
				<ul className='container-username'>
					<li>Username</li>
				</ul>
			</nav>
			<main className='main-container-panelUser'>
				<div className='container-menu'>
					<div className='container-img'>
						<img src={Logo} alt='quiz-game'></img>
					</div>
					<div className='container-context'>
						<button className='btn-game first'>Start</button>
						<button className='btn-game second'>
							<a href='./pytania.html'>Dodaj pytanie</a>
						</button>
						<button className='btn-game third'>
							<a href='ranking.html'>ranking</a>
						</button>
						<button className='btn-game fourth'>Wyloguj się</button>
					</div>
				</div>
			</main>
			<footer></footer>
		</>
	);
};

export default PanelUser;
