import { useState } from 'react';
import Input from './Input';

export default {
	title: 'Input',
	component: Input,
	// tags: ['autodocs'],
};

const InputWidthHooks = ({ disabled, baseValue }) => {
	const [value, setValue] = useState(baseValue ? baseValue : '');
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState({
		title: null,
		text: null,
	});

	const validation = (value) => {
		console.log('validation', value, success)
		let isError = false;
		if (value.length < 5) {
			setErrorMessage('Символов должно быть больше ');
			isError = true;
		}

		if (isError) {
			console.log('validation error')
			setError(true);
			setSuccess(false);
		} else if (!success) {
			setError(false);
			setSuccess(true);
		}
	}

	const handleSetValue = (value) => {
		setError(false);
		setSuccess(false);
		setValue(value);
	}

	return <Input
		label="Label"
		value={value}
		setValue={handleSetValue}
		validation={validation}
		success={success}
		error={error}
		errorMessage={errorMessage}
		disabled={disabled}
	/>
}

export const Primary = {
	render: () => <InputWidthHooks />
};

export const Disabled = {
	render: () => <InputWidthHooks disabled={true} baseValue="Текст" />
}