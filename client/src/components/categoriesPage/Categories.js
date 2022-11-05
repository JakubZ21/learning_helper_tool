import './Categories.css';
import BackGround from '../UI/BackGround';
import { Link, Route, useHistory } from 'react-router-dom';
import Quiz from '../QuizPage/Quiz';
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {
	let history = useHistory();
	const API_ENDPOINT = 'http://localhost:5000/';
	const url = 'http://localhost:5000/categories/getall';

	const [waiting, setWaiting] = useState(true);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [categories, setCategories] = useState([]);
	const [code, setCode] = useState("");
	const [buttons, setButtons] = useState([]);

	const fetchCategories = async (API_ENDPOINT) => {
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
			if (typeof data !== "undefined") {
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

		let putUrl = `http://localhost:5000/quiz/registernew?category[]=${id}`
		registerQuiz(putUrl)	
		// setCode('DVW48k')

	}

	const handleGoToQuiz = () => {
		history.push("/quiz/?quizcode=" + code)
	}



	const locButtons = [];
	//jesli cos sie zmieni w categories to uruchom ten kod ktory wrzuci buttony na stronke z kategoriami, TODO: Dodac loading icon gdy ich nie ma
	useEffect(() => {
		categories.forEach((cat) => {
			locButtons.push(
				<button className='btn-ctg' key={cat.id} onClick={() => handleClick(cat.id)}>{cat.category_name}</button>
			);
		});
		setButtons(locButtons);
	}, [categories]);

	if (code !== "") {
		return (
			<div>
				<BackGround />
				<div className='main-cat'>
					<Link className='text-link' to='/'>
						<button className='btn-close'>close</button>
					</Link>
					<label className='lbl-cat' htmlFor='chk' aria-hidden='true'>
						Twój Kod
					</label>
					<p className='code-display'>{code}</p>
					<button className='btn-ctg' onClick={handleGoToQuiz}>Przejdź do Quizu</button>
				</div>
			</div>
		)
	} else {
		return (
			<div>
				<BackGround />
				<div className='main-cat'>
					<Link className='text-link' to='/'>
						<button className='btn-close'>close</button>
					</Link>
					<label className='lbl-cat' htmlFor='chk' aria-hidden='true'>
						Kategorie
					</label>

					{buttons}
				</div>
			</div>
		);
	}
};

export default Categories;
