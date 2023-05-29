import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setIsAuth } from '../../redux/slices/userSlice';
import { api } from '../../services/api';
import { useValidation } from '../../services/validation';

import Error from '../../components/error/Error';
import Title from '../../components/title/Title';
import Input from '../../components/input/Input';
import Button from '../../components/buttons/button/Button';
import {
	StyledWrapperSection,
	StyledForm,
	StyledWrapperInput,
	StyledRowBtn,
	StyledErrorWrapper,
} from '../../styles/BaseStyleElements';

const LoginPage = () => {
	const navigate = useNavigate();

	const [error, setError] = useState({ status: false, message: 'Ошибка' })

	const [username, setUsername] = useState('');
	const [isCorrectUsername, setIsCorrectUsername] = useState(null);
	const [userNameErrorMessage, setUserNameErrorMessage] = useState(null);

	const [password, setPassword] = useState('');
	const [isCorrectPassword, setIsCorrectPassword] = useState(null);
	const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);

	const dispatch = useDispatch()

	const { loginUser } = api();
	const { validationUsername, validationPassword } = useValidation();

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

	const handleSubmit = (e) => {
		e.preventDefault();

		setError({ status: false });

		if (handleBlurUsername() !== true) return;
		if (handleBlurPassword() !== true) return;

		loginUser({ username, password })
			.then((res) => {
				if (res.status === 'success') {
					localStorage.setItem('token', res.token);
					dispatch(setIsAuth(true));
					navigate('/workspaces');
				} else {
					setError({
						status: true,
						message: res?.errors[0]?.message || 'Клиентская ошибка'
					})
				}
			})
			.catch(() => {
				setError({
					status: true,
					message: 'Ошибка сервера'
				})
			})
	}

	return (
		<StyledWrapperSection>
			<Title text="Вход" />
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
				<StyledRowBtn>
					<Button
						label="Войти"
						variant='primary'
						onClick={handleSubmit}
					/>
					<Button
						label="Регистрация"
						variant='secondary'
						onClick={() => navigate('/auth/register')}
					/>
				</StyledRowBtn>
			</StyledForm>
		</StyledWrapperSection>
	);
};

export default LoginPage;