import './Login.css';
import MainNavigation from '../Navigation/MainNavigation';
import { Link, history, useHistory } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../useAuth';

const Login = () => {
	const [name, setName] = useState('');
	const [isAuth, setIsAuth, login, logout] = useAuth(true);

	const [isLogin, setIsLogin] = useState(true);
	const [isRegister, setIsRegister] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [accountType, setAccountType] = useState(false);

	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const usernameInputRefRegister = useRef();
	const emailInputRefRegister = useRef();
	const passwordInputRefRegister = useRef();

	const history = useHistory();

	///------------------
	///Walidacja rejestracji
	const initVal = { name: '', email: '', password: '' };
	const [formVal, setFormVal] = useState(initVal);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormVal({ ...formVal, [name]: value });
	};

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmit) {
		}
	}, [formErrors]);

	const validate = (values) => {
		const errors = {};
		const regex = /^[a-z0-9]+(.[a-z0-9])*@[a-z0-9]+\.[a-z]{2,3}$/;
		if (!values.name) {
			errors.name = 'Proszę wpisać imię';
		} else if (values.name.length <= 2) {
			errors.name = 'Imię musi posiadać co najmniej 2 znaki';
		}
		if (!values.email) {
			errors.email = 'Proszę wpisać email';
		} else if (!regex.test(values.email)) {
			errors.email = 'Niepoprawny format email';
		}

		if (!values.password) {
			errors.password = 'Proszę wpisać hasło';
		} else if (values.password.length < 4) {
			errors.password = 'Hasło musi zawierać conajmniej niż 4 znaki';
		}

		return errors;
	};

	const submitHandler = (event) => {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;
		const status = '';

		console.log(enteredEmail, enteredPassword);
		let url = 'http://localhost:5000/user/login';
		setIsLoading(true);

		if (isLogin) {
			fetch(url, {
				method: 'POST',
				body: JSON.stringify({
					email: enteredEmail,
					password: enteredPassword,
					status: status,
					statusCode: 0,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((response) => response.json())
				.then((data) => {
					prepareToast(data.status, data.statusCode);
					if (data.statusCode === 2) {
						login();
						history.push('/user');
					} else {
					}
				});
		}
	};

	const prepareToast = function (status, statusCode) {
		const options = {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		};
		switch (statusCode) {
			case 1:
				toast.info(status, options);
				break;
			case 2:
				toast.success(status, options);
				break;
			case 3:
				toast.error(status, options);
				break;
			case 31:
				toast.error(status, options);
				break;
		}
	};

	//Sprawdzić!!
	const submitHandlerRegister = (event) => {
		event.preventDefault();
		const enteredUsernameRegister = usernameInputRefRegister.current.value;
		const enteredEmailRegister = emailInputRefRegister.current.value;
		const enteredPasswordRegister = passwordInputRefRegister.current.value;
		const status = '';

		setFormErrors(validate(formVal));
		setIsSubmit(true);

		let url = 'http://localhost:5000/user/register';
		setIsLoading(true);

		if (isRegister) {
			fetch(url, {
				method: 'PUT',
				body: JSON.stringify({
					username: enteredUsernameRegister,
					email: enteredEmailRegister,
					password: enteredPasswordRegister,
					userType: accountType,
					status: status,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((response) => response.json())
				.then((data) => {
					prepareToast(data.status, data.statusCode);
				});
		}
	};

	return (
		<div>
			<nav className='nav'></nav>
			<main className='main-container-login'>
				<div className='main_login'>
					<input type='checkbox' id='chk' aria-hidden='true' />

					<div className='signup'>
						<form onSubmit={submitHandlerRegister}>
							<label className='lbl__main reg' htmlFor='chk' aria-hidden='true'>
								Rejestracja
							</label>
							<input
								// className='input__data'
								className={`input__data ${formErrors.name ? 'warn' : ''}`}
								type='text'
								name='name'
								placeholder='Imię'
								required=''
								ref={usernameInputRefRegister}
								value={formVal.name}
								onChange={handleChange}
							/>
							<p className='form-error'>{formErrors.name}</p>

							<input
								className={`input__data ${formErrors.email ? 'warn' : ''}`}
								type='email'
								name='email'
								placeholder='Email'
								required=''
								ref={emailInputRefRegister}
								value={formVal.email}
								onChange={handleChange}
							/>
							<p className='form-error'>{formErrors.email}</p>
							<input
								className={`input__data ${formErrors.password ? 'warn' : ''}`}
								type='password'
								name='password'
								placeholder='Hasło'
								required=''
								ref={passwordInputRefRegister}
								value={formVal.password}
								onChange={handleChange}
							/>
							<p className='form-error'>{formErrors.password}</p>
							<div className='container_radio'>
								<div className='btn__radio'>
									<label htmlFor='huey' className='lbl-user'>
										<input
											type='radio'
											id='huey'
											name='accountType'
											value='REGULAR_USER'
											//checked={true} //problemy sa gdy domyslnie sie zaznacza jedna z wartosci

											onChange={(e) => setAccountType(e.target.value)}
										/>
										Użytkownik
									</label>
								</div>
								<div className='btn__radio'>
									<label htmlFor='dewey' className='lbl-user'>
										<input
											type='radio'
											id='dewey'
											name='accountType'
											value='TEACHER_USER'
											onChange={(e) => setAccountType(e.target.value)}
										/>
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
								onChange={(e) => setName(e.target.value)}
								value={name}
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
			</main>
		</div>
	);
};

export default Login;
