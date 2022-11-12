import './Loading.css';
import BackGround from '../UI/BackGround';
import React from 'react';

const Loading = () => {
	return (
		<div>
			<nav> </nav>
			<main>
				<div className='container-spinner'>
					<div className='loading'></div>
				</div>
			</main>
		</div>
	);
};

export default Loading;
