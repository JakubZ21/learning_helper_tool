import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Quiz from '../QuizPage/Quiz';

const Timer = ({ maxRange }) => {
	const [counter, setCounter] = useState(maxRange);
	const [endQuiz, setEndQuiz] = useState(false);

	// useEffect(() => {
	// 	if (counter > 0) {
	// 		setTimeout(() => setCounter(counter - 1), 1000);
	// 	} else {
	// 		setEndQuiz(true);
	// 	}
	// }, [counter]);
	return (
		<div>
			<spna>{counter}</spna>
		</div>
	);
};

export default Timer;
