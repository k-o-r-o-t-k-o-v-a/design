import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { delWorkspace, upWorkspace } from '../../redux/slices/workspacesSlice';
import { api } from '../../services/api';
import { useValidation } from '../../services/validation';

import Title from '../../components/title/Title';
import Error from '../../components/error/Error';
import BaseLayout from '../../layout/BaseLayout';
import Input from '../../components/input/Input';
import Button from '../../components/buttons/button/Button';
import Table from '../../components/table/Table';
import { StyledErrorWrapper, StyledForm, StyledWrapperInput } from '../../styles/BaseStyleElements';

import settingsIcon from './../../assets/icons/settings.svg'

const StyledCustomWrapperBtn = styled.div`
	display: flex;
	justify-content: end;
	margin: 20px 0 0;
`;

const StyledRowBtn = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 12px;
`;

const StyledSection = styled.section`
	margin: 32px 0 0;
`;

const StyledTable = styled.div`
	margin: 32px 0 0;
`;

const tableFields = [
	{ fieldName: 'name', text: 'Название' },
	{ fieldName: 'color', text: 'Цвет' },
	{ fieldName: 'button', img: { icon: settingsIcon, alt: 'Действия' } }
];

const WorkspacesItemPage = () => {
	const navigate = useNavigate();
	const { workspaceId } = useParams();

	const { workspace, tags } = useSelector(state => state.workspacesSlice);

	const [error, setError] = useState({ status: false, message: 'Ошибка' })

	const [workspaceName, setWorkspaceName] = useState('');
	const [isCorrectWorkspaceName, setIsCorrectWorkspaceName] = useState(null);
	const [workspaceNameErrorMessage, setWorkspaceNameErrorMessage] = useState(null);

	const dispatch = useDispatch();

	const { updateWorkspace, deleteWorkspace } = api();
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

		updateWorkspace(workspaceId, { name: workspaceName })
			.then((res) => {
				if (res.status === 'success') {
					dispatch(upWorkspace({ id: workspaceId, name: workspaceName }));
					setWorkspaceName('')
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

	const handleDelete = (e) => {
		e.preventDefault();

		setError({ status: false });

		deleteWorkspace(workspaceId)
			.then((res) => {
				if (res.status === 'success') {
					dispatch(delWorkspace(workspaceId));
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

	const formattingTagsData = (data) => {
		return data.map(item => {
			return {
				...item,
				button:
					<StyledRowBtn>
						<Button
							label="Удалить"
							variant="secondary"
						/>
					</StyledRowBtn>
			}
		});
	}

	const formattedTagsData = formattingTagsData(tags);

	return (
		<BaseLayout title={workspace?.name}>
			{error.status &&
				<StyledErrorWrapper top>
					<Error text={error.message} />
				</StyledErrorWrapper>
			}
			<StyledCustomWrapperBtn>
				<Button
					label="Удалить"
					variant='secondary'
					onClick={handleDelete}
				/>
			</StyledCustomWrapperBtn>
			<StyledForm onSubmit={handleSubmit}>
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
					label="Обновить"
					variant='primary'
					onClick={handleSubmit}
				/>
			</StyledForm>
			<StyledSection>
				<Title text="Теги рабочего пространства" />
				<StyledCustomWrapperBtn>
					<Button
						label="Создать"
						variant='primary'
						onClick={() => navigate(`/workspaces/${workspaceId}/tags/create`)}
					/>
				</StyledCustomWrapperBtn>
				<StyledTable>
					<Table
						fields={tableFields}
						data={formattedTagsData}
					/>
				</StyledTable>
			</StyledSection>
		</BaseLayout >
	);
};

export default WorkspacesItemPage;