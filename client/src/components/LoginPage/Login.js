import './Login.css';
import BackGround from '../UI/BackGround';

import { Link } from 'react-router-dom';

const Login = () => {
	return (
		<div>
			<BackGround />
			<div class='main'>
				<input type='checkbox' id='chk' aria-hidden='true' />

				<div class='signup'>
					<form>
						<label className='lbl__main reg' for='chk' aria-hidden='true'>
							Rejestracja
						</label>
						<input
							className='input__data'
							type='text'
							name='txt'
							placeholder='Imię'
							required=''
						/>
						<input
							className='input__data'
							type='email'
							name='email'
							placeholder='Email'
							required=''
						/>
						<input
							className='input__data'
							type='password'
							name='pswd'
							placeholder='Hasło'
							required=''
						/>
						<div className='container_radio'>
							<div className='btn__radio'>
								<input
									type='radio'
									id='huey'
									name='user'
									value='user'
									checked
								/>
								<label for='huey'>Użytkownik</label>
							</div>
							<div className='btn__radio'>
								<input type='radio' id='dewey' name='user' value='teacher' />
								<label for='dewey'>Nauczyciel</label>
							</div>
						</div>
						<button>Zatwierdź</button>
					</form>
				</div>

				<div class='login'>
					<form>
						<label className='lbl__main log' for='chk' aria-hidden='true'>
							Logowanie
						</label>
						<input
							className='input__data'
							type='email'
							name='email'
							placeholder='Email'
							required=''
						/>
						<input
							className='input__data'
							type='password'
							name='pswd'
							placeholder='Password'
							required=''
						/>
						<button>Login</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;

{
	/* <Link to='./'>
{' '}
<button>Powrót</button>
</Link> */
}
