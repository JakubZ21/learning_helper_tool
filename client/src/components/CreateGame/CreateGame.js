import './CreateGame.css';
import { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import PopUp_View from '../PopUp_View/PopUp_View';

const CreateGame = () => {
	const [openModal, setOpenModal] = useState(false);

	const selectCategoryRef = useRef();
	const selectNumberRef = useRef();
	const selectTimeRef = useRef();

	const [waiting, setWaiting] = useState(true);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [code, setCode] = useState('');
	// const [categVal, setCategVal] = useState("");
	// const [timeVal, setTimeVal] = useState("");
	// const [numberVal, setNumberVal] = useState("");

	useEffect(() => {
		setCode(code);
	}, [code]);

	const history = useHistory();

	const handleX = () => {
		// console.log(sessionStorage.getItem("username"))
		sessionStorage.getItem('username') === null
			? history.push('/')
			: history.push('/user');
	};

	const registerQuiz = async (putUrl) => {
		const response = await axios.put(putUrl).catch((err) => console.log(err));
		if (response) {
			const data = response.data;
			if (typeof data !== 'undefined') {
				setCode(response.data.code);
				setLoading(false);
			} else {
			}
		} else {
		}
	};

	const handleClick = () => {
		let putUrl =
			process.env.REACT_APP_SRV_URL +
			`quiz/registernew?category[]=${
				selectCategoryRef.current.value
			}&gameType=${selectTimeRef.current.value}s&numQuest=${
				selectNumberRef.current.value
			}&created_by=${sessionStorage.getItem('id')}`;
		console.log(putUrl);
		registerQuiz(putUrl);
	};

	return (
		<div>
			<nav className='nav'>
				<ul className='container-username'>
					<li>{sessionStorage.getItem('username')}</li>
				</ul>
			</nav>
			<main className='main-container-createGame'>
				<div className='container-menu-create_game'>
					<button className='btn-createGame-close' onClick={handleX}>
						close
					</button>
					<div className='container-img-createGame'>
						{/* <img src={Logo} alt='quiz-game'></img> */}

						<h1>Stwórz Grę</h1>
					</div>
					<div className='container-context-createGame'>
						<form id='createGame-form'>
							<label htmlFor='createGame-question-category'>
								Kategoria Pytań
							</label>
							<div className='createGame-box'>
								<select
									id='game-category-id'
									name='game_Category'
									ref={selectCategoryRef}
								>
									<option value='3'>Angielski</option>
									<option value='2'>Geografia</option>
									<option value='4'>Literatura</option>
									<option value='1'>Matematyka</option>
								</select>
							</div>
							<label htmlFor='createGame-question-quantity'>Ilość Pytań</label>
							<div className='createGame-box'>
								<select
									id='game-quantity-id'
									name='game_Quantity'
									ref={selectNumberRef}
								>
									<option value='10'>10</option>
									<option value='12'>12</option>
									<option value='15'>15</option>
									<option value='18'>18</option>
								</select>
							</div>
							<label htmlFor='createGame-question-time'>Czas</label>
							<div className='createGame-box'>
								<select id='game-time-id' name='game_Time' ref={selectTimeRef}>
									<option value='10'>10</option>
									<option value='12'>12</option>
									<option value='15'>15</option>
									<option value='18'>18</option>
								</select>
							</div>
						</form>
						<button className='btn-createGame-confirm' onClick={handleClick}>
							Zatwierdź
						</button>
						<PopUp_View
							open={openModal}
							onClose={() => setOpenModal(false)}
							displayCode={code}
						/>
					</div>
				</div>
			</main>
			<footer></footer>
		</div>
	);
};

export default CreateGame;
