import { useState } from 'react';
import styled from 'styled-components';

import { api } from '../../services/api';
import { useValidation } from '../../services/validation';

import { addTheme, fetchColorsBaseById, remTheme } from '../../redux/slices/colorsSlice';

import BaseLayout from '../../layout/BaseLayout';
import Input from '../../components/input/Input';
import Select from '../../components/buttons/select/Select';
import Button from '../../components/buttons/button/Button';
import Title from '../../components/title/Title';
import { useDispatch, useSelector } from 'react-redux';
import { StyledErrorWrapper } from '../../styles/BaseStyleElements';
import Error from '../../components/error/Error';

const StyledFrom = styled.form`
	margin: 32px 0 0;
`;

const StyledElementWrapper = styled.div`
	margin: 20px 0 0;
`;

const StyledBlock = styled.div`
	margin: 32px 0 0;
`;

const ThemePage = () => {
	const { theme, themes } = useSelector(state => state.colorsSlice);

	const [error, setError] = useState({ status: false, message: 'Ошибка' });

	const [selectedThemeInst, setSelectedThemeInst] = useState({ label: "Темы", value: 0 });
	const [selectedThemeDel, setSelectedThemeDel] = useState({ label: "Темы", value: 0 });

	const [themeName, setThemeName] = useState('');
	const [isCorrectThemeName, setIsCorrectThemeName] = useState(null);
	const [themeNameErrorMessage, setThemeNameErrorMessage] = useState(null);

	const [primaryColor, setPrimaryColor] = useState('');
	const [isCorrectPrimaryColor, setIsCorrectPrimaryColor] = useState(null);
	const [primaryColorErrorMessage, setPrimaryColorErrorMessage] = useState(null);

	const [secondaryColor, setSecondaryColor] = useState('');
	const [isCorrectSecondaryColor, setIsCorrectSecondaryColor] = useState(null);
	const [secondaryColorErrorMessage, setSecondaryColorErrorMessage] = useState(null);

	const [infoColor, setInfoColor] = useState('');
	const [isCorrectInfoColor, setIsCorrectInfoColor] = useState(null);
	const [infoColorErrorMessage, setInfoColorErrorMessage] = useState(null);

	const [dangerColor, setDangerColor] = useState('');
	const [isCorrectDangerColor, setIsCorrectDangerColor] = useState(null);
	const [dangerColorErrorMessage, setDangerColorErrorMessage] = useState(null);

	const [warningColor, setWarningColor] = useState('');
	const [isCorrectWarningColor, setIsCorrectWarningColor] = useState(null);
	const [warningColorErrorMessage, setWarningColorErrorMessage] = useState(null);

	const [successColor, setSuccessColor] = useState('');
	const [isCorrectSuccessColor, setIsCorrectSuccessColor] = useState(null);
	const [successColorErrorMessage, setSuccessColorErrorMessage] = useState(null);

	const [neutralColor, setNeutralColor] = useState('');
	const [isCorrectNeutralColor, setIsCorrectNeutralColor] = useState(null);
	const [neutralColorErrorMessage, setNeutralColorErrorMessage] = useState(null);

	const dispatch = useDispatch();

	const {
		createTheme,
		deleteTheme,
		installTheme,
	} = api();
	const { validationNotEmpty } = useValidation();

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

	const handleBlurThemeName = () => {
		return handleBlur(
			themeName,
			validationNotEmpty,
			isCorrectThemeName,
			setIsCorrectThemeName,
			setThemeNameErrorMessage,
		);
	}

	const handleBlurPrimaryColor = () => {
		return handleBlur(
			primaryColor,
			validationNotEmpty,
			isCorrectPrimaryColor,
			setIsCorrectPrimaryColor,
			setPrimaryColorErrorMessage,
		);
	}

	const handleBlurSecondaryColor = () => {
		return handleBlur(
			secondaryColor,
			validationNotEmpty,
			isCorrectSecondaryColor,
			setIsCorrectSecondaryColor,
			setSecondaryColorErrorMessage,
		);
	}

	const handleBlurInfoColor = () => {
		return handleBlur(
			infoColor,
			validationNotEmpty,
			isCorrectInfoColor,
			setIsCorrectInfoColor,
			setInfoColorErrorMessage,
		);
	}

	const handleBlurDangerColor = () => {
		return handleBlur(
			dangerColor,
			validationNotEmpty,
			isCorrectDangerColor,
			setIsCorrectDangerColor,
			setDangerColorErrorMessage,
		);
	}

	const handleBlurWarningColor = () => {
		return handleBlur(
			warningColor,
			validationNotEmpty,
			isCorrectWarningColor,
			setIsCorrectWarningColor,
			setWarningColorErrorMessage,
		);
	}

	const handleBlurSuccessColor = () => {
		return handleBlur(
			successColor,
			validationNotEmpty,
			isCorrectSuccessColor,
			setIsCorrectSuccessColor,
			setSuccessColorErrorMessage,
		);
	}

	const handleBlurNeutralColor = () => {
		return handleBlur(
			neutralColor,
			validationNotEmpty,
			isCorrectNeutralColor,
			setIsCorrectNeutralColor,
			setNeutralColorErrorMessage,
		);
	}

	const themeItems = themes.map((item) => ({
		label: item.name,
		value: item.id
	}));

	const handleSubmitCreateTheme = (e) => {
		e.preventDefault();

		setError({ status: false })

		createTheme({
			name: themeName,
			primary: primaryColor,
			secondary: secondaryColor,
			info: infoColor,
			danger: dangerColor,
			warning: warningColor,
			succsess: successColor,
			neutral: neutralColor
		})
			.then((res) => {
				if (res.status === 'success') {
					dispatch(addTheme({ id: res.data.id, name: themeName }));

					setThemeName('');
					setPrimaryColor('');
					setSecondaryColor('');
					setInfoColor('');
					setDangerColor('');
					setWarningColor('');
					setSuccessColor('');
					setNeutralColor('');
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
			});
	}

	const handleSubmitInstallTheme = (e) => {
		e.preventDefault();

		if (selectedThemeInst.value == 0)
			return;

		console.log(11)

		installTheme(selectedThemeInst.value)
			.then(res => {
				if (res.status === 'success') {
					console.log(selectedThemeInst.value)
					dispatch(fetchColorsBaseById(selectedThemeInst.value))

					setSelectedThemeInst({ label: "Темы", value: 0 })
				}
			})
	}

	const handleSubmitDeleteTheme = (e) => {
		e.preventDefault();

		if (selectedThemeDel.value == 0)
			return;

		console.log(selectedThemeDel)
		deleteTheme(selectedThemeDel.value)
			.then(res => {
				if (res.status === 'success') {
					dispatch(remTheme(selectedThemeDel.value))
					if (selectedThemeInst.value == selectedThemeDel.value)
						setSelectedThemeInst({ label: "Темы", value: 0 })
					setSelectedThemeDel({ label: "Темы", value: 0 });
				}
			})
	}

	return (
		<BaseLayout title="Темы">
			<StyledElementWrapper>
				<Input
					label="Текущая тема"
					value={theme?.name}
					disabled
				/>
			</StyledElementWrapper>
			<StyledBlock>
				<Title text="Установите тему" />
				<StyledElementWrapper>
					<Select
						defaultValue={selectedThemeInst}
						options={[{ label: 'Базовая', value: 1 }, ...themeItems]}
						onChange={setSelectedThemeInst}
					/>
				</StyledElementWrapper>
				<StyledElementWrapper>
					<Button
						label="Установить"
						variant='primary'
						onClick={handleSubmitInstallTheme}
					/>
				</StyledElementWrapper>
			</StyledBlock>
			<StyledBlock>
				<Title text="Удалите тему" />
				<StyledElementWrapper>
					<Select
						defaultValue={selectedThemeDel}
						options={themeItems}
						onChange={setSelectedThemeDel}
					/>
				</StyledElementWrapper>
				<StyledElementWrapper>
					<Button
						label="Удалить"
						variant='primary'
						onClick={handleSubmitDeleteTheme}
					/>
				</StyledElementWrapper>
				<StyledBlock>
				</StyledBlock>
				<Title text="Создайте тему" />
				{error.status &&
					<StyledErrorWrapper top>
						<Error text={error.message} />
					</StyledErrorWrapper>
				}
				<StyledFrom onSubmit={handleSubmitCreateTheme}>
					<StyledElementWrapper>
						<Input
							label="Название темы"
							value={themeName}
							setValue={(value) => handleSetValue(setThemeName, value)}
							success={isCorrectThemeName === null ? false : isCorrectThemeName}
							error={isCorrectThemeName === null ? false : !isCorrectThemeName}
							errorMessage={themeNameErrorMessage}
							onBlur={handleBlurThemeName}
						/>
					</StyledElementWrapper>
					<StyledElementWrapper>
						<Input
							label="Цвет primary"
							value={primaryColor}
							setValue={(value) => handleSetValue(setPrimaryColor, value)}
							success={isCorrectPrimaryColor === null ? false : isCorrectPrimaryColor}
							error={isCorrectPrimaryColor === null ? false : !isCorrectPrimaryColor}
							errorMessage={primaryColorErrorMessage}
							onBlur={handleBlurPrimaryColor}
						/>
					</StyledElementWrapper>
					<StyledElementWrapper>
						<Input
							label="Цвет secondary"
							value={secondaryColor}
							setValue={(value) => handleSetValue(setSecondaryColor, value)}
							success={isCorrectSecondaryColor === null ? false : isCorrectSecondaryColor}
							error={isCorrectSecondaryColor === null ? false : !isCorrectSecondaryColor}
							errorMessage={secondaryColorErrorMessage}
							onBlur={handleBlurSecondaryColor}
						/>
					</StyledElementWrapper>
					<StyledElementWrapper>
						<Input
							label="Цвет info"
							value={infoColor}
							setValue={(value) => handleSetValue(setInfoColor, value)}
							success={isCorrectInfoColor === null ? false : isCorrectInfoColor}
							error={isCorrectInfoColor === null ? false : !isCorrectInfoColor}
							errorMessage={infoColorErrorMessage}
							onBlur={handleBlurInfoColor}
						/>
					</StyledElementWrapper>
					<StyledElementWrapper>
						<Input
							label="Цвет danger"
							value={dangerColor}
							setValue={(value) => handleSetValue(setDangerColor, value)}
							success={isCorrectDangerColor === null ? false : isCorrectDangerColor}
							error={isCorrectDangerColor === null ? false : !isCorrectDangerColor}
							errorMessage={dangerColorErrorMessage}
							onBlur={handleBlurDangerColor}
						/>
					</StyledElementWrapper>
					<StyledElementWrapper>
						<Input
							label="Цвет warning"
							value={warningColor}
							setValue={(value) => handleSetValue(setWarningColor, value)}
							success={isCorrectWarningColor === null ? false : isCorrectWarningColor}
							error={isCorrectWarningColor === null ? false : !isCorrectWarningColor}
							errorMessage={warningColorErrorMessage}
							onBlur={handleBlurWarningColor}
						/>
					</StyledElementWrapper>
					<StyledElementWrapper>
						<Input
							label="Цвет success"
							value={successColor}
							setValue={(value) => handleSetValue(setSuccessColor, value)}
							success={isCorrectSuccessColor === null ? false : isCorrectSuccessColor}
							error={isCorrectSuccessColor === null ? false : !isCorrectSuccessColor}
							errorMessage={successColorErrorMessage}
							onBlur={handleBlurSuccessColor}
						/>
					</StyledElementWrapper>
					<StyledElementWrapper>
						<Input
							label="Цвет neutral"
							value={neutralColor}
							setValue={(value) => handleSetValue(setNeutralColor, value)}
							success={isCorrectNeutralColor === null ? false : isCorrectNeutralColor}
							error={isCorrectNeutralColor === null ? false : !isCorrectNeutralColor}
							errorMessage={neutralColorErrorMessage}
							onBlur={handleBlurNeutralColor}
						/>
					</StyledElementWrapper>
					<StyledElementWrapper>
						<Button
							label="Создать"
							variant='primary'
							onClick={handleSubmitCreateTheme}
						/>
					</StyledElementWrapper>
				</StyledFrom>
			</StyledBlock>
		</BaseLayout>
	);
};

export default ThemePage;