import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { api } from '../../services/api';
import { useValidation } from '../../services/validation';

import Input from '../../components/input/Input';
import Button from '../../components/buttons/button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import BaseLayout from '../../layout/BaseLayout';

const StyledFrom = styled.form`
	margin: 24px 0 0;
`;

const StyledInputWrapper = styled.div`
	margin: 20px;
`;

const ColumnsCreatePage = () => {
	const navigate = useNavigate();
	const { workspaceId, boardId } = useParams();

	// const { workspace } = useSelector(state => state.workspacesSlice);
	// const { board } = useSelector(state => state.boardsSlice);

	const [columnName, setColumnName] = useState('');
	const [isCorrectColumnName, setIsCorrectColumnName] = useState(null);
	const [columnNameErrorMessage, setColumnNameErrorMessage] = useState(null);

	const { createColumn } = api();
	const { validationNotEmpty } = useValidation();

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

	const handleBlurColumnName = () => {
		return handleBlur(
			columnName,
			validationNotEmpty,
			isCorrectColumnName,
			setIsCorrectColumnName,
			setColumnNameErrorMessage,
		);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		createColumn({ name: columnName, boardId })
			.then(res => {
				navigate(`/workspaces/${workspaceId}/boards/${boardId}`)
			})
	}

	return (
		<BaseLayout title="Создайте столбец">
			<StyledFrom onSubmit={handleSubmit}>
				<StyledInputWrapper>
					<Input
						label="Название столбца"
						value={columnName}
						setValue={(value) => handleSetValue(setColumnName, value)}
						success={isCorrectColumnName === null ? false : isCorrectColumnName}
						error={isCorrectColumnName === null ? false : !isCorrectColumnName}
						errorMessage={columnNameErrorMessage}
						onBlur={handleBlurColumnName}
					/>
				</StyledInputWrapper>
				<Button
					label="Создать"
					variant='primary'
					onClick={handleSubmit}
				/>
			</StyledFrom>
		</BaseLayout>
	);
};

export default ColumnsCreatePage;