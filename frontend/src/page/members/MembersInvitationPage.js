import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { api } from '../../services/api';
import { useValidation } from '../../services/validation';

import BaseLayout from '../../layout/BaseLayout';
import Input from '../../components/input/Input';
import Button from '../../components/buttons/button/Button';
import { StyledForm, StyledWrapperInput } from '../../styles/BaseStyleElements';

const MembersInvitationPage = () => {
	const { workspaceId } = useParams()
	const navigate = useNavigate();

	const [workspaceName, setWorkspaceName] = useState('');
	const [isCorrectWorkspaceName, setIsCorrectWorkspaceName] = useState(null);
	const [workspaceNameErrorMessage, setWorkspaceNameErrorMessage] = useState(null);

	const dispatch = useDispatch();

	const { inviteUser } = api();
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
		inviteUser({ workspace_id: workspaceId, username: workspaceName })
			.then(() => {
				navigate(`/workspaces/${workspaceId}/members`)
			});
	}


	return (
		<BaseLayout title="Пригласите участника">
			<StyledForm onSubmit={handleSubmit}>
				<StyledWrapperInput>
					<Input
						label="Имя пользователя участника"
						value={workspaceName}
						setValue={(value) => handleSetValue(setWorkspaceName, value)}
						success={isCorrectWorkspaceName === null ? false : isCorrectWorkspaceName}
						error={isCorrectWorkspaceName === null ? false : !isCorrectWorkspaceName}
						errorMessage={workspaceNameErrorMessage}
						onBlur={handleBlurWorkspaceName}
					/>
				</StyledWrapperInput>
				<Button
					label="Пригласить"
					variant='primary'
					onClick={handleSubmit}
				/>
			</StyledForm>
		</BaseLayout>
	);
};

export default MembersInvitationPage;