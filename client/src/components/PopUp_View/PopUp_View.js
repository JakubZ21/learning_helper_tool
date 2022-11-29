import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import './PopUp_View.css';

const PopUp_View = ({ open, onClose }) => {
	const [code, setCode] = useState('');
	const handleClick = (id) => {
		let putUrl = `http://localhost:5000/quiz/registernew?category[]=${id}`;
		registerQuiz(putUrl);
	};

	const registerQuiz = async (putUrl) => {
		const response = await axios.put(putUrl).catch((err) => console.log(err));
		if (response) {
			const data = response.data;
			if (typeof data !== 'undefined') {
				setCode(response.data.code);
			}
		}
	};

	if (!open) return null;
	return (
		<div onClick={onClose} className='overlay'>
			<div
				onClick={(e) => {
					e.stopPropagation();
				}}
				className='modalContainer'
			>
				<p className='closeBtn' onClick={onClose}>
					X
				</p>
				<label className='lbl-popUp' htmlFor='chk' aria-hidden='true'>
					Twój Kod
				</label>
				<p className='code-display '>{code}</p>
			</div>
		</div>
	);
};

export default PopUp_View;

// <div onClick={onClose} className='overlay'>
// 			<div
// 				onClick={(e) => {
// 					e.stopPropagation();
// 				}}
// 				className='modalContainer'
// 			>
// 				<img src={Logo} alt='/' />
// 				<div className='modalRight'>
// 					<p className='closeBtn' onClick={onClose}>
// 						X
// 					</p>
// 					<div className='content'>
// 						<p>Do you want a</p>
// 						<h1>$20 CREDIT</h1>
// 						<p>for your first tade?</p>
// 					</div>
// 					<div className='btnContainer'>
// 						<button className='btnPrimary'>
// 							<span className='bold'>YES</span>, I love NFT's
// 						</button>
// 						<button className='btnOutline'>
// 							<span className='bold'>NO</span>, thanks
// 						</button>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
