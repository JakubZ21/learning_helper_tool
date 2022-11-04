import './Login.css';
import BackGround from '../UI/BackGround';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import axios from 'axios';

const Login = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [isRegister, setIsRegister] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const usernameInputRefRegister = useRef();
	const emailInputRefRegister = useRef();
	const passwordInputRefRegister = useRef();

	const submitHandler = (event) => {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		let url = 'http://localhost:5000/user/login';
		setIsLoading(true);

		if (isLogin) {
			fetch(url, {
				method: 'POST',
				body: JSON.stringify({
					email: enteredEmail,
					password: enteredPassword,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((response) => response.json())
				.then((data) => {
					if (enteredEmail === data.email) {
						console.log('Correct email');
					} else {
						console.log('Incorrect email');
					}
					if (enteredPassword === data.password) {
						console.log('Correct password');
					} else {
						console.log('Incorrect password');
					}

					///przypisać zmienna
				});
		}
	};
	//Sprawdzić!!
	const submitHandlerRegister = (event) => {
		event.preventDefault();
		const enteredUsernameRegister = usernameInputRefRegister.current.value;
		const enteredEmailRegister = emailInputRefRegister.current.value;
		const enteredPasswordRegister = passwordInputRefRegister.current.value;

		let url = 'http://localhost:5000/user/register';
		setIsLoading(true);

		if (isRegister) {
			fetch(url, {
				method: 'PUT',
				body: JSON.stringify({
					username: enteredUsernameRegister,
					email: enteredEmailRegister,
					password: enteredPasswordRegister,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					// console.log(data.username);
					///przypisać zmienna
				});
		}
	};

	return (
		<div>
			<BackGround />
			<div className='main_login' onSubmit={submitHandlerRegister}>
				<input type='checkbox' id='chk' aria-hidden='true' />

				<div className='signup'>
					<form onSubmit={submitHandlerRegister}>
						<label className='lbl__main reg' htmlFor='chk' aria-hidden='true'>
							Rejestracja
						</label>
						<input
							className='input__data'
							type='text'
							name='name'
							placeholder='Imię'
							required=''
							ref={usernameInputRefRegister}
						/>

						<input
							className='input__data'
							type='email'
							name='email'
							placeholder='Email'
							required=''
							ref={emailInputRefRegister}
						/>

						<input
							className='input__data'
							type='password'
							name='password'
							placeholder='Hasło'
							required=''
							ref={passwordInputRefRegister}
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
								<label htmlFor='huey' className='lbl-user'>
									Użytkownik
								</label>
							</div>
							<div className='btn__radio'>
								<input type='radio' id='dewey' name='user' value='teacher' />
								<label htmlFor='dewey' className='lbl-user'>
									Nauczyciel
								</label>
							</div>
						</div>
						<button className='btn-log'>Zatwierdź</button>
					</form>

					<Link className='text-link' to='./'>
						{' '}
						<button className='btn-log'>Powrót</button>
					</Link>
				</div>

				<div className='login'>
					<form onSubmit={submitHandler}>
						<label className='lbl__main log' htmlFor='chk' aria-hidden='true'>
							Logowanie
						</label>
						<input
							className='input__data'
							type='email'
							name='email'
							placeholder='Email'
							required=''
							ref={emailInputRef}
						/>
						<input
							className='input__data'
							type='password'
							name='pswd'
							placeholder='Password'
							required=''
							ref={passwordInputRef}
						/>
						{/* {!isLoading && <button className='btn-log'>Login</button>}
						{isLoading && <p className='btn-log p'>Loading...</p>} */}
						<button type='submit' className='btn-log'>
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
