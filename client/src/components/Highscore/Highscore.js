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
	const [data, setData] = useState([]);
	const [fetchedList, setFetchedList] = useState([]);

	const url =
		process.env.REACT_APP_SRV_URL +
		`ranking/getmine?user_id=${sessionStorage.getItem('id')}`;
	const url2 =
		process.env.REACT_APP_SRV_URL +
		`ranking/getquizes?user_id=${sessionStorage.getItem('id')}`;

	const fetchAttempts = async (urlParam) => {
		setLoading(true);
		const response = await axios(urlParam).catch((err) => console.log(err));
		if (response) {
			const data = response.data;
			if (data.length > 0) {
				setData(response.data);
				console.log(data);
				setLoading(false);
			} else {
			}
		} else {
		}
	};

	let list = [];

	useEffect(() => {
		let index = 1;

		if (sessionStorage.getItem('user_type') === 'TEACHER_USER') {
			data.forEach((attempt) => {
				list.push(
					<tr>
						<td>{index}</td>
						<td>
							<a href={'/highscore/?quiz_code=' + attempt.quiz_code}>
								{attempt.quiz_code}
							</a>
						</td>
						<td>{attempt.question_count}</td>
						<td>{attempt.quiz_mode} </td>
						<td>{new Date(attempt.created_when).toLocaleString()}</td>
					</tr>
				);
				console.log(index);
				console.log(data);
				console.log(fetchedList);
				index++;
			});
			setFetchedList(list);
		} else {
			data.forEach((attempt) => {
				list.push(
					<tr>
						<td>{index}</td>
						<td>{attempt.quiz_id}</td>
						<td>{attempt.username}</td>
						<td>
							{attempt.score} / {attempt.max_score}{' '}
						</td>
						<td>{new Date(attempt.taken_when).toLocaleString()}</td>
					</tr>
				);
				console.log(index);
				console.log(data);
				console.log(fetchedList);
				index++;
			});
			setFetchedList(list);
		}
	}, [data]);

	useEffect(() => {
		sessionStorage.getItem('user_type') !== 'TEACHER_USER'
			? fetchAttempts(url)
			: fetchAttempts(url2);
	}, []);

	if (sessionStorage.getItem('user_type') === 'TEACHER_USER') {
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
						<div id='scrolltab'>
							<table id='ranking'>
								<tr>
									<th>Lp.</th>
									<th>Kod Quizu</th>
									<th>Liczba pytań</th>
									<th>Tryb quizu</th>
									<th>Data utworzenia</th>
								</tr>
								{fetchedList}
							</table>
						</div>
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
	} else {
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
						<div id='scrolltab'>
							<table id='ranking'>
								<tr>
									<th>Lp.</th>
									<th>Kod Quizu</th>
									<th>Nazwa użytkownika</th>
									<th>Punkty</th>
									<th>Data wykonania</th>
								</tr>
								{fetchedList}
							</table>
						</div>
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
	}
};

export default Highscore;
