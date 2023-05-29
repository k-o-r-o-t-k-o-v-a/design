import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { setIsAuth } from '../../redux/slices/userSlice';
import { api } from '../../services/api';
import { useValidation } from '../../services/validation';

import BaseLayout from '../../layout/BaseLayout';
import Input from '../../components/input/Input';
import Button from '../../components/buttons/button/Button';
import { StyledErrorWrapper, StyledForm, StyledWrapperInput } from '../../styles/BaseStyleElements';
import Error from '../../components/error/Error';

const StyledCustomWrapperBtn = styled.div`
	display: flex;
	justify-content: end;
	margin: 20px 0 0;
`;

const UserPage = () => {
	let navigate = useNavigate();

	const { user } = useSelector(state => state.userSlice);

	const [error, setError] = useState(false);

	const [username, setUsername] = useState('');
	const [isCorrectUsername, setIsCorrectUsername] = useState(null);
	const [userNameErrorMessage, setUserNameErrorMessage] = useState(null);

	const [password, setPassword] = useState('');
	const [isCorrectPassword, setIsCorrectPassword] = useState(null);
	const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);

	const [firstName, setFirstName] = useState('');
	const [isCorrectFirstName, setIsCorrectFirstName] = useState(null);
	const [firstNameErrorMessage, setFirstNameErrorMessage] = useState(null);

	const [lastName, setLastName] = useState('');
	const [isCorrectLastName, setIsCorrectLastName] = useState(null);
	const [lastNameErrorMessage, setLastNameErrorMessage] = useState(null);

	const [phone, setPhone] = useState('');
	const [isCorrectPhone, setIsCorrectPhone] = useState(null);
	const [phoneErrorMessage, setPhoneErrorMessage] = useState(null);

	const [email, setEmail] = useState('');
	const [isCorrectEmail, setIsCorrectEmail] = useState(null);
	const [emailErrorMessage, setEmailErrorMessage] = useState(null);

	const dispatch = useDispatch();

	useEffect(() => {
		setUsername(user?.username || '');
		setPassword('');
		setFirstName(user?.first_name || '');
		setLastName(user?.last_name || '');
		setPhone(user?.phone || '');
		setEmail(user?.email || '')
	}, [user])

	const { updateUser } = api();
	const {
		validationNotEmpty,
		validationUsername,
		validationPassword,
		validationPhone,
		validationEmail
	} = useValidation();

	const handleSetValue = (setValue, value) => {
		setValue(value);
	}

	const handleBlur = (value, validation, correct, setCorrect, setErrorMessage) => {
		const isValid = validation(value);
		if (isValid !== true) {
			setCorrect(false);
			setErrorMessage({ title: isValid });
		} else if (correct === false) {
			setCorrect(true);
		}
		return isValid;
	}

	const handleBlurUsername = () => {
		return handleBlur(
			username,
			validationUsername,
			isCorrectUsername,
			setIsCorrectUsername,
			setUserNameErrorMessage,
		);
	}

	const handleBlurPassword = () => {
		return handleBlur(
			password,
			validationPassword,
			isCorrectPassword,
			setIsCorrectPassword,
			setPasswordErrorMessage,
		);
	}

	const handleBlurFirstName = () => {
		return handleBlur(
			firstName,
			(value) => validationNotEmpty(value, 'имя'),
			isCorrectFirstName,
			setIsCorrectFirstName,
			setFirstNameErrorMessage,
		);
	}

	const handleBlurLastName = () => {
		return handleBlur(
			lastName,
			(value) => validationNotEmpty(value, 'фамилию'),
			isCorrectLastName,
			setIsCorrectLastName,
			setLastNameErrorMessage,
		);
	}

	const handleBlurPhone = () => {
		return handleBlur(
			phone,
			validationPhone,
			isCorrectPhone,
			setIsCorrectPhone,
			setPhoneErrorMessage,
		);
	}

	const handleBlurEmail = () => {
		return handleBlur(
			email,
			validationEmail,
			isCorrectEmail,
			setIsCorrectEmail,
			setEmailErrorMessage,
		);
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		setError({ status: false })

		if (handleBlurUsername() !== true) return;
		if (handleBlurFirstName() !== true) return;
		if (handleBlurLastName() !== true) return;
		if (handleBlurPhone() !== true) return;
		if (handleBlurEmail() !== true) return;

		updateUser({
			username,
			password,
			first_name: firstName,
			last_name: lastName,
			phone,
			email,
		})
			.then(res => {
				if (res.status === 'success') {
					navigate('/auth/login');
				} else {
					setError({
						status: true,
						message: res?.errors[0]?.message || 'Клиентская ошибка'
					})
				}
			}).catch(() => {
				setError({
					status: true,
					message: 'Ошибка сервера'
				})
			})
	}

	const handleExit = () => {
		localStorage.removeItem('token')
		dispatch(setIsAuth(false))
		navigate('/auth/login');
	}

	return (
		<BaseLayout title="Аккаунт">
			<StyledCustomWrapperBtn>
				<Button
					label="Выйти"
					variant='secondary'
					onClick={handleExit}
				/>
			</StyledCustomWrapperBtn>
			<StyledForm onSubmit={handleSubmit}>
				{error.status &&
					<StyledErrorWrapper>
						<Error text={error.message} />
					</StyledErrorWrapper>
				}
				<StyledWrapperInput>
					<Input
						label="Имя пользователя"
						value={username}
						setValue={(value) => handleSetValue(setUsername, value)}
						success={isCorrectUsername === null ? false : isCorrectUsername}
						error={isCorrectUsername === null ? false : !isCorrectUsername}
						errorMessage={userNameErrorMessage}
						onBlur={handleBlurUsername}
					/>
				</StyledWrapperInput>
				<StyledWrapperInput>
					<Input
						label="Пароль"
						type="password"
						value={password}
						setValue={(value) => handleSetValue(setPassword, value)}
						success={isCorrectPassword === null ? false : isCorrectPassword}
						error={isCorrectPassword === null ? false : !isCorrectPassword}
						errorMessage={passwordErrorMessage}
						onBlur={handleBlurPassword}
					/>
				</StyledWrapperInput>
				<StyledWrapperInput>
					<Input
						label="Имя"
						value={firstName}
						setValue={(value) => handleSetValue(setFirstName, value)}
						success={isCorrectFirstName === null ? false : isCorrectFirstName}
						error={isCorrectFirstName === null ? false : !isCorrectFirstName}
						errorMessage={firstNameErrorMessage}
						onBlur={handleBlurFirstName}
					/>
				</StyledWrapperInput>
				<StyledWrapperInput>
					<Input
						label="Фамилия"
						value={lastName}
						setValue={(value) => handleSetValue(setLastName, value)}
						success={isCorrectLastName === null ? false : isCorrectLastName}
						error={isCorrectLastName === null ? false : !isCorrectLastName}
						errorMessage={lastNameErrorMessage}
						onBlur={handleBlurLastName}
					/>
				</StyledWrapperInput>
				<StyledWrapperInput>
					<Input
						label="Телефон"
						type="tel"
						value={phone}
						setValue={(value) => handleSetValue(setPhone, value)}
						success={isCorrectPhone === null ? false : isCorrectPhone}
						error={isCorrectPhone === null ? false : !isCorrectPhone}
						errorMessage={phoneErrorMessage}
						onBlur={handleBlurPhone}
					/>
				</StyledWrapperInput>
				<StyledWrapperInput>
					<Input
						label="Почта"
						type="email"
						value={email}
						setValue={(value) => handleSetValue(setEmail, value)}
						success={isCorrectEmail === null ? false : isCorrectEmail}
						error={isCorrectEmail === null ? false : !isCorrectEmail}
						errorMessage={emailErrorMessage}
						onBlur={handleBlurEmail}
					/>
				</StyledWrapperInput>
				<Button
					label="Сохранить"
					variant='primary'
					onClick={handleSubmit}
				/>
			</StyledForm>
		</BaseLayout >
	);
};

export default UserPage;