import { Link } from 'react-router-dom';

import './MainNavigation.css';

const MainNavigation = () => {
	return (
		<header className='header-container'>
			<img class='header-logo' src='quiz.png' alt='logo' />
			<nav></nav>
			<a className='cta' href='#'>
				<button className='btn-header'>Contact</button>
			</a>
		</header>
	);
};

export default MainNavigation;
