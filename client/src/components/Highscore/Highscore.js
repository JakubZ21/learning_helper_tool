import './Highscore.css';
import Logo from './m2.png';
import { Link, Route, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Highscore = () => {
	let history = useHistory();
	const handleX = () => {
		// console.log(sessionStorage.getItem("username"))
		sessionStorage.getItem('username') === null
			? history.push('/')
			: history.push('/user');
	};

	const [loading, setLoading] = useState(false);
	const [attempts, setAttempts] = useState([]);
	const [attemptList, setAttList] = useState([]);
	const url = process.env.REACT_APP_SRV_URL + `ranking/getmine?user_id=${sessionStorage.getItem('id')}`;
	const fetchAttempts = async () => {
		setLoading(true);
		const response = await axios(url).catch((err) => console.log(err));
		if (response) {
			const data = response.data;
			if (data.length > 0) {
				setAttempts(response.data);
				setLoading(false);
			} else {
			}
		} else {
		}
	};
	useEffect(() => {
		console.log("XD")
		fetchAttempts();
	}, []);
	let list = []
	useEffect(() => {
		let index = 1

		
		attempts.forEach((attempt) => {
			list.push(
				<tr>
					<td>{index}</td>
					<td>{attempt.quiz_id}</td>
					<td>{attempt.username}</td>
					<td>{attempt.score} / {attempt.max_score} </td>
					<td>{new Date(attempt.taken_when).toLocaleDateString()}</td>
				</tr>);
			console.log(index)
			console.log(attempts)
			console.log(attemptList)
			index++;
		});
		setAttList(list)
	}, [attempts]);

	return (
		<div>
			{' '}
			<nav className='nav'>
				<ul className='container-username'>
					<li>{sessionStorage.getItem('username')}</li>
				</ul>
			</nav>
			<main>
				<div className='container-ranking-menu'>
					<div className='container-ranking-img'>
						<img src={Logo} alt='logo'></img>
					</div>

					<table id='ranking'>
						<tr>
							<th>Lp.</th>
							<th>Kod Quizu</th>
							<th>Nazwa użytkownika</th>
							<th>Punkty</th>
							<th>Data wykonania</th>
						</tr>
						{attemptList}
					</table>
					{/* <div class='container-ranking'>
						<div className='container-ranking-title'>
							<div className='ranking place'>Miejsce</div>
							<div className='ranking name'>Nazwa użytkownika</div>
							<div className='ranking score'>Punkty</div>
						</div>
						<div className='container-ranking-highscore'>
							<div className='highscore place'>1</div>
							<div className='highscore name'>Bartek</div>
							<div className='highscore score'>8</div>
							<div className='highscore place'>2</div>
							<div className='highscore name'>Krzysztof</div>
							<div className='highscore score'>5</div>
							<div className='highscore place'>3</div>
							<div className='highscore name'>Patryk</div>
							<div className='highscore score'>3</div>
							<div className='highscore place'>4</div>
							<div className='highscore name'>Ola</div>
							<div className='highscore score'>2</div>
						</div>
					</div> */}
				</div>
				<div className='container-ranking-btn'>
					<button className='btn-ranking' onClick={handleX}>
						Wróć
					</button>
				</div>
			</main>
			<footer></footer>
		</div>
	);
};

export default Highscore;
