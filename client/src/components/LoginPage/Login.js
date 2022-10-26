import './Login.css';
import BackGround from '../UI/BackGround';
import Card from '../UI/Card';
import { Link } from 'react-router-dom';

const Login = () => {
	return (
		<div>
			<BackGround />
			<Card className='content'>
				<div className='main'>
					<input type='checkbox' id='change-panel' aria-hidden='true' />

					<div className='signup'>
						<form>
							<label for='change-panel' aria-hidden='true'>
								Zarejestruj się
							</label>
							<input type='text' name='txt' placeholder='Login' required='' />
							<input
								type='email'
								name='email'
								placeholder='Email'
								required=''
							/>
							<input
								type='password'
								name='pswd'
								placeholder='Password'
								required=''
							/>
							<button>Zarejestruj</button>
						</form>
						<Link to='./'>
							{' '}
							<button>Powrót</button>
						</Link>
					</div>

					<div className='login'>
						<form>
							<label for='change-panel' aria-hidden='true'>
								Logowanie
							</label>
							<input
								type='email'
								name='email'
								placeholder='Email'
								required=''
							/>
							<input
								type='password'
								name='pswd'
								placeholder='Password'
								required=''
							/>
							<button>Login</button>
						</form>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default Login;
