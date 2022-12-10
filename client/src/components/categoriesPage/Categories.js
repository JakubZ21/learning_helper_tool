import './Categories.css';
import BackGround from '../UI/BackGround';
import { Link, Route, useHistory } from 'react-router-dom';
import Quiz from '../QuizPage/Quiz';
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Loading from '../LoadingPage/Loading';
import MainNavigation from '../Navigation/MainNavigation';
import Logo from '../logos/kategorie.png';

const Categories = () => {
	let history = useHistory();
	const API_ENDPOINT = process.env.REACT_APP_SRV_URL;
	const url = process.env.REACT_APP_SRV_URL + 'categories/getall';

	const [waiting, setWaiting] = useState(true);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [categories, setCategories] = useState([]);
	const [code, setCode] = useState('');
	const [buttons, setButtons] = useState([]);

	const fetchCategories = async (API_ENDPOINT) => {
		setLoading(true);
		const response = await axios(url).catch((err) => console.log(err));
		if (response) {
			const data = response.data;
			if (data.length > 0) {
				setCategories(response.data);
				setLoading(false);
				setWaiting(false);
				setError(false);
			} else {
				setWaiting(true);
				setError(true);
			}
		} else {
			setWaiting(true);
		}
	};
	useEffect(() => {
		fetchCategories();
	}, []);

	const registerQuiz = async (putUrl) => {
		const response = await axios.put(putUrl).catch((err) => console.log(err));
		if (response) {
			const data = response.data;
			if (typeof data !== 'undefined') {
				setCode(response.data.code);
				setLoading(false);
				setWaiting(false);
				setError(false);
			} else {
				setWaiting(true);
				setError(true);
			}
		} else {
			setWaiting(true);
		}
	};

	const handleClick = (id) => {
		let putUrl =
			process.env.REACT_APP_SRV_URL + `quiz/registernew?category[]=${id}&created_by${sessionStorage.getItem("id")}`;
		registerQuiz(putUrl);
	};

	const handleGoToQuiz = () => {
		history.push('/quiz/?quizcode=' + code);
	};

	const locButtons = [];
	//jesli cos sie zmieni w categories to uruchom ten kod ktory wrzuci buttony na stronke z kategoriami, TODO: Dodac loading icon gdy ich nie ma
	useEffect(() => {
		categories.forEach((cat) => {
			locButtons.push(
				<button
					className='btn-ctg'
					key={cat.id}
					onClick={() => handleClick(cat.id)}
				>
					{cat.category_name}
				</button>
			);
		});
		setButtons(locButtons);
	}, [categories]);

	const handleX = () => {
		// console.log(sessionStorage.getItem("username"))
		sessionStorage.getItem('username') === null
			? history.push('/')
			: history.push('/user');
	};

	if (loading) {
		return (
			<div>
				<BackGround />
				<Loading />
			</div>
		);
	} else if (code !== '') {
		return (
			<div>
				<nav class='nav'></nav>
				<main className='container-main'>
					<div className='main-join'>
						<button className='btn-close' onClick={handleX}>
							close
						</button>
						<label className='lbl-cat' htmlFor='chk' aria-hidden='true'>
							Twój Kod
						</label>
						<p className='code-display '>{code}</p>
						<button className='btn-ctg' onClick={handleGoToQuiz}>
							Przejdź do Quizu
						</button>
					</div>
				</main>
			</div>
		);
	} else {
		return (
			<div>
				<nav class='nav'></nav>
				<main className='container-main'>
					<div className='main-cat'>
						<button className='btn-close' onClick={handleX}>
							close
						</button>
						<div className='container-category-img'>
							<img src={Logo} alt='logo'></img>
						</div>
						<div className='btn'>{buttons}</div>
					</div>
				</main>
			</div>
		);
	}
};
export default Categories;
