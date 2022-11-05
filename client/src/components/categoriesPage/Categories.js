import './Categories.css';
import BackGround from '../UI/BackGround';
import { Link, Route } from 'react-router-dom';
import Quiz from '../QuizPage/Quiz';
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Loading from '../LoadingPage/Loading';
import MainNavigation from '../Navigation/MainNavigation';

const Categories = () => {
	const API_ENDPOINT = 'http://localhost:5000/';
	const url = 'http://localhost:5000/categories/getall';

	const [waiting, setWaiting] = useState(true);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [categories, setCategories] = useState([]);
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

	const locButtons = [];
	//jesli cos sie zmieni w categories to uruchom ten kod ktory wrzuci buttony na stronke z kategoriami, TODO: Dodac loading icon gdy ich nie ma
	useEffect(() => {
		categories.forEach((cat) => {
			locButtons.push(
				<Link
					className='text-link'
					to={`/quiz/?cat_id=${cat.id}`}
					key={`${cat.id}`}
				>
					<button className='btn-ctg'>{cat.category_name}</button>
				</Link>
			);
		});
		setButtons(locButtons);
	}, [categories]);

	//WS!!!!!!!!!
	if (loading) {
		return (
			<div>
				<BackGround />
				<Loading />
			</div>
		);
	} else {
		return (
			<div>
				{/* <MainNavigation /> */}
				<BackGround />
				<div className='main-cat'>
					<Link className='text-link' to='/'>
						<button className='btn-close'>close</button>
					</Link>
					<label className='lbl-cat' htmlFor='chk' aria-hidden='true'>
						Kategorie
					</label>

					{buttons}
				</div>{' '}
			</div>
		);
	}
};
export default Categories;
