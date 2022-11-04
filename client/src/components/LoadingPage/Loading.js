import './Loading.css';
import BackGround from '../UI/BackGround';
import React from 'react';

const Loading = () => {
	return (
		<div>
			<BackGround />
			<div className='main-container'>
				<div className='container-spinner'>
					<div className='loading'></div>
				</div>
			</div>
		</div>
	);
};

export default Loading;
