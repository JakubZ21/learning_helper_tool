import './Login.css';
import BackGround from '../UI/BackGround';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import axios from 'axios';

const Login = () => {
	// const initialValues = { name: '', email: '', password: '' };
	// const [registerValue, setRegisterValue] = useState(initialValues);
	// const [registerError, setRegisterError] = useState({});
	// const [isSubmit, setIsSubmit] = useState(false);

	// const handleChange = (e) => {
	// 	const { name, value } = e.target;
	// 	setRegisterValue({ ...registerValue, [name]: value });
	// };

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	setRegisterError(validationData(registerValue));
	// 	setIsSubmit(true);
	// };

	// useEffect(() => {
	// 	console.log(registerError);
	// 	if (Object.keys(registerError).length === 0 && isSubmit) {
	// 		console.log(registerValue);
	// 	}
	// }, [registerError]);

	// const validationData = (values) => {
	// 	const errors = {};
	// 	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
	// 	if (!values.name) {
	// 		errors.name = 'Name is required';
	// 	}
	// 	if (!values.email) {
	// 		errors.email = 'Email is required';
	// 	} else if (!regex.test(values.email)) {
	// 		errors.email = 'This is not a valid email format';
	// 	}
	// 	if (!values.password) {
	// 		errors.password = 'Password is required';
	// 	} else if (values.password.length < 4) {
	// 		errors.password = 'Password must be more than 4 characters';
	// 	} else if (values.password.length > 10) {
	// 		errors.password = 'Password cannot exceed more than 10 characters';
	// 	}
	// 	return errors;
	// };

	const [isLogin, setIsLogin] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const emailInputRef = useRef();
	const passwordInputRef = useRef();

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
						console.log('Works');
					}
					if (enteredPassword === data.password) {
						console.log('works222');
					} else {
						console.log('Does not work');
					}

					///przypisać zmienna
				});

			// }).then((res) => {
			// 	// setIsLogin(false);
			// 	// if (res.ok) {
			// 	// 	console.log('Zalogowany/');
			// 	// 	return res.json().then((data) => console.log(data.password));
			// 	// } else {
			// 	// 	return res.json().then((data) => {
			// 	// 		let errorMessage = 'Failed!';
			// 	// 		alert(errorMessage);
			// 	// 		throw new Error(errorMessage);
			// 	// 	});
			// 	// }
			// });
		}
	};

	return (
		<div>
			<BackGround />
			{/* {Object.keys(registerError).length === 0 && isSubmit ? (
				<div className='ui message success'>Signed in successfully</div>
			) : (
				<pre>{JSON.stringify(registerValue, undefined, 2)}</pre>
			)} */}
			<div className='main_login'>
				<input type='checkbox' id='chk' aria-hidden='true' />

				<div className='signup'>
					<form /*onSubmit={handleSubmit}*/>
						<label className='lbl__main reg' htmlFor='chk' aria-hidden='true'>
							Rejestracja
						</label>
						<input
							className='input__data'
							type='text'
							name='name'
							placeholder='Imię'
							// value={registerValue.name}
							// onChange={handleChange}
							required=''
						/>
						{/* <p className='error-msg'>{registerError.name}</p> */}
						<input
							className='input__data'
							type='email'
							name='email'
							// value={registerValue.email}
							// onChange={handleChange}
							placeholder='Email'
							required=''
						/>
						{/* <p className='error-msg'>{registerError.email}</p> */}
						<input
							className='input__data'
							type='password'
							name='password'
							// value={registerValue.password}
							// onChange={handleChange}
							placeholder='Hasło'
							required=''
						/>
						{/* <p className='error-msg'>{registerError.username}</p> */}
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
