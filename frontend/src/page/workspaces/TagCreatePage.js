import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { api } from '../../services/api';
import { useValidation } from '../../services/validation';

import BaseLayout from '../../layout/BaseLayout';
import Input from '../../components/input/Input';
import Button from '../../components/buttons/button/Button';
import { StyledForm, StyledWrapperInput } from '../../styles/BaseStyleElements';

const TagCreatePage = () => {
	const navigate = useNavigate();
	const { workspaceId } = useParams();

	const [tagName, setTagName] = useState('');
	const [isCorrectTagName, setIsCorrectTagName] = useState(null);
	const [tagNameErrorMessage, setTagNameErrorMessage] = useState(null);

	const [tagColor, setTagColor] = useState('');
	const [isCorrectTagColor, setIsCorrectTagColor] = useState(null);
	const [tagColorErrorMessage, setTagColorErrorMessage] = useState(null);

	const { createTag } = api();
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

	const handleBlurTagName = () => {
		return handleBlur(
			tagName,
			validationNotEmpty,
			isCorrectTagName,
			setIsCorrectTagName,
			setTagNameErrorMessage,
		);
	}

	const handleBlurTagColor = () => {
		return handleBlur(
			tagColor,
			validationNotEmpty,
			isCorrectTagColor,
			setIsCorrectTagColor,
			setTagColorErrorMessage,
		);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		createTag({
			name: tagName,
			color: tagColor,
			workspace_id: workspaceId
		})
			.then(res => {
				navigate(`/workspaces/${workspaceId}/boards/${res.data.id}`)
			})
	}

	return (
		<BaseLayout title="Создайте тэг">
			<StyledForm onSubmit={handleSubmit}>
				<StyledWrapperInput>
					<Input
						label="Название тега"
						value={tagName}
						setValue={(value) => handleSetValue(setTagName, value)}
						success={isCorrectTagName === null ? false : isCorrectTagName}
						error={isCorrectTagName === null ? false : !isCorrectTagName}
						errorMessage={tagNameErrorMessage}
						onBlur={handleBlurTagName}
					/>
				</StyledWrapperInput>
				<StyledWrapperInput>
					<Input
						label="Цвет тега (HEX)"
						value={tagColor}
						setValue={(value) => handleSetValue(setTagColor, value)}
						success={isCorrectTagColor === null ? false : isCorrectTagColor}
						error={isCorrectTagColor === null ? false : !isCorrectTagColor}
						errorMessage={tagColorErrorMessage}
						onBlur={handleBlurTagColor}
					/>
				</StyledWrapperInput>
				<Button
					label="Создать"
					variant='primary'
					onClick={handleSubmit}
				/>
			</StyledForm>
		</BaseLayout>
	);
};

export default TagCreatePage;