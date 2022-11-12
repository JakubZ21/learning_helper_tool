import './Creator.css';
import Logo from './m3.png';
import { Link } from 'react-router-dom';

const Creator = () => {
	return (
		<div>
			<nav className='nav'>
				<ul className='container-username'>
					<li>Username</li>
				</ul>
			</nav>
			<main>
				<div className='container-creator-menu'>
					<div className='container-img'>
						<img src={Logo} alt='quiz-game'></img>
					</div>
					<div className='container-creator-context'>
						<form action='' method=''>
							<label for='question'>Pytanie </label>
							<textarea
								id='question'
								name='question'
								class='textarea-question'
							></textarea>
							<label for='question'>
								Odpowiedź <strong>A</strong>{' '}
							</label>
							<textarea
								id='answer1'
								name='answer1'
								class='textarea-answer'
							></textarea>
							<label for='question'>
								Odpowiedź <strong>B</strong>{' '}
							</label>
							<textarea
								id='answer2'
								name='answer2'
								class='textarea-answer'
							></textarea>
							<label for='question'>
								Odpowiedź <strong>C</strong>{' '}
							</label>
							<textarea
								id='answer3'
								name='answer3'
								class='textarea-answer'
							></textarea>
							<label for='question'>
								Odpowiedź <strong>D</strong>{' '}
							</label>
							<textarea
								id='answer4'
								name='answer4'
								class='textarea-answer'
							></textarea>
						</form>
						<button class='btn-textarea'>
							<a href='#'></a> Zatwierdź
						</button>
						<Link className='text-link' to='/'>
							<button class='btn-textarea'> Wróć </button>
						</Link>
					</div>
				</div>
			</main>
			<footer></footer>
		</div>
	);
};

export default Creator;
