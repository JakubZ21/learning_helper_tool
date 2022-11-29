import React, { useEffect } from 'react';
import './PopUp_View.css';

const PopUp_View = ({ open, onClose, displayCode }) => {
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
				<p className='code-display '>{displayCode}</p>
			</div>
		</div>
	);
};

export default PopUp_View;
