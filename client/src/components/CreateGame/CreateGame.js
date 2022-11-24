import './CreateGame.css';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';

const CreateGame = () => {
	const selectCategoryRef = useRef();
	const selectNumberRef = useRef();

	const history = useHistory();

	const handleX = () => {
		// console.log(sessionStorage.getItem("username"))
		sessionStorage.getItem('username') === null
			? history.push('/')
			: history.push('/user');
	};

	return (
		<div>
			<nav className='nav'>
				<ul className='container-username'>
					<li>{sessionStorage.getItem('username')}</li>
				</ul>
			</nav>
			<main className='main-container-createGame'>
				<div className='container-menu'>
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
									<option value='3'>10</option>
									<option value='2'>12</option>
									<option value='4'>15</option>
									<option value='1'>18</option>
								</select>
							</div>

							<button className='btn-createGame-confirm' type='submit'>
								Zatwierdź
							</button>
						</form>
					</div>
				</div>
			</main>
			<footer></footer>
		</div>
	);
};

export default CreateGame;
