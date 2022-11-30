import './Highscore.css';
import Logo from './m2.png';
import { Link, Route, useHistory, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HighscoreDetails = () => {
	let history = useHistory();
	const handleX = () => {
		// console.log(sessionStorage.getItem("username"))
		sessionStorage.getItem('username') === null
			? history.push('/')
			: history.push('/highscore');
	};

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState([]);
	const [fetchedList, setFetchedList] = useState([]);
	const [code, setCode] = useState('')
	const param = useParams().quiz_code

	const url = process.env.REACT_APP_SRV_URL + `ranking/getresults?code=${code}`;


	const fetchAttempts = async () => {
		setLoading(true);
		const response = await axios(url).catch((err) => console.log(err));
		if (response) {
			const data = response.data;
			if (data.length > 0) {
				setData(response.data);
				console.log(data);
				setLoading(false);
			} else {
				console.log(response)
			}
		} else {
		}
	};

	let list = []


	useEffect(() => {
		let index = 1
		data.forEach((attempt) => {
			list.push(
				<tr>
					<td>{index}</td>
					<td>{attempt.quiz_id}</td>
					<td>{attempt.username}</td>
					<td>{attempt.score} / {attempt.max_score} </td>
					<td>{new Date(attempt.taken_when).toLocaleString()}</td>
				</tr>);
			index++;
		});
		setFetchedList(list)
	}, [data]);
	
	
	useEffect(() => {
		setCode(param)
	}, []);

	useEffect(()=>
	{
		fetchAttempts(url);
	}, [code])
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
};

export default HighscoreDetails;
