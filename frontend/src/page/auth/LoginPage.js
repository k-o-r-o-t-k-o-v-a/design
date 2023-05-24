import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { setIsAuth } from '../../redux/slices/userSlice';
import { api } from '../../services/api';
import { useValidation } from '../../services/validation';

import Input from '../../components/input/Input';
import Button from '../../components/buttons/button/Button';

const StyledInputWrapper = styled.div`
	margin: 20px;
`

const LoginPage = () => {
    // let navigate = useNavigate();

    const dispatch = useDispatch()

    const [username, setUsername] = useState('');
    const [isCorrectUsername, setIsCorrectUsername] = useState(null);
    const [userNameErrorMessage, setUserNameErrorMessage] = useState(null);

    const [password, setPassword] = useState('');
    const [isCorrectPassword, setIsCorrectPassword] = useState(null);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);

    const { loginUser } = api();
    const { validationUsername, validationPassword } = useValidation();

    const handleSetValue = (setValue, value) => {
        // Todo:
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

        loginUser({ username, password })
            .then(res => {
                localStorage.setItem('token', res.token);
                dispatch(setIsAuth(true));
            })
            .catch(res => {
                console.log(`Error: ${res}`);
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <StyledInputWrapper>
                <Input
                    label="Имя пользователя"
                    value={username}
                    setValue={(value) => handleSetValue(setUsername, value)}
                    success={isCorrectUsername === null ? false : isCorrectUsername}
                    error={isCorrectUsername === null ? false : !isCorrectUsername}
                    errorMessage={userNameErrorMessage}
                    onBlur={handleBlurUsername}
                />
            </StyledInputWrapper>
            <StyledInputWrapper>
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
            </StyledInputWrapper>
            <Button
                label="Войти"
                variant='primary'
                onClick={handleSubmit}
            />
        </form>
    );
};

export default LoginPage;
