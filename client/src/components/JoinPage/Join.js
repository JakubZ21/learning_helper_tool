import './Join.css';
import BackGround from '../UI/BackGround';
import { Link } from 'react-router-dom';

const Join = () => {
	return (
		<div>
			<BackGround />
			<div class='main-join'>
				<form>
					<label for='chk' aria-hidden='true'></label>
					<input
						className='input-join'
						type='text'
						name='txt'
						placeholder='Podaj KOD PIN'
						required=''
					/>

					<button className='btn-join'>Zatwierdź</button>
				</form>
				<Link className='text-link' to='/'>
					<button className='btn-join'>Powrót</button>
				</Link>
			</div>
		</div>
	);
};

export default Join;
