import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addWorkspaces } from '../../redux/slices/workspacesSlice';
import { api } from '../../services/api';
import { useValidation } from '../../services/validation';

import Input from '../../components/input/Input';
import Button from '../../components/buttons/button/Button';
import BaseLayout from '../../layout/BaseLayout';
import { StyledErrorWrapper, StyledForm, StyledWrapperInput } from '../../styles/BaseStyleElements';
import Error from '../../components/error/Error';


const WorkspacesCreatePage = () => {
	const navigate = useNavigate();

	const [error, setError] = useState({ status: false, message: '' })

	const [workspaceName, setWorkspaceName] = useState('');
	const [isCorrectWorkspaceName, setIsCorrectWorkspaceName] = useState(null);
	const [workspaceNameErrorMessage, setWorkspaceNameErrorMessage] = useState(null);

	const dispatch = useDispatch();

	const { createWorkspace } = api();
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

	const handleBlurWorkspaceName = () => {
		return handleBlur(
			workspaceName,
			validationNotEmpty,
			isCorrectWorkspaceName,
			setIsCorrectWorkspaceName,
			setWorkspaceNameErrorMessage,
		);
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		setError({ status: false })

		createWorkspace({ name: workspaceName })
			.then((res) => {
				if (res.status === 'success') {
					dispatch(addWorkspaces(res.data));
					navigate(`/workspaces/${res.data.id}`)
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
		<BaseLayout title="Создайте рабочее пространство">
			<StyledForm onSubmit={handleSubmit}>
				{error.status &&
					<StyledErrorWrapper>
						<Error text={error.message} />
					</StyledErrorWrapper>
				}
				<StyledWrapperInput>
					<Input
						label="Название рабочего пространства"
						value={workspaceName}
						setValue={(value) => handleSetValue(setWorkspaceName, value)}
						success={isCorrectWorkspaceName === null ? false : isCorrectWorkspaceName}
						error={isCorrectWorkspaceName === null ? false : !isCorrectWorkspaceName}
						errorMessage={workspaceNameErrorMessage}
						onBlur={handleBlurWorkspaceName}
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

export default WorkspacesCreatePage;