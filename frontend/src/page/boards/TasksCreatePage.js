import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { api } from '../../services/api';
import { useValidation } from '../../services/validation';
import { _formattingDate } from '../../services/formatting';

import { StyledForm, StyledWrapperInput } from '../../styles/BaseStyleElements';
import BaseLayout from '../../layout/BaseLayout';
import Input from '../../components/input/Input';
import Select from '../../components/buttons/select/Select';
import Button from '../../components/buttons/button/Button';
import Accordion from '../../components/accordion/Accordion';
import TextEditor from '../../components/textEditor/TextEditor';

import addIcon from './../../assets/icons/add.svg';

const StyledCustomWrapperRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 32px 0 0;
`

const StyledCustomWrapperRowRigth = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

const StyledCustomDate = styled.div`
`

const StyledRowSelect = styled.div`
	display: flex;
	align-items: center;
	align-items: flex-start;
	gap: 16px;
	margin: 32px 0 0;
`;

const StyledRowSelectItem = styled.div`
	flex: 1 1 33%;
`;

const StyledMain = styled.div`
	display: flex;
	gap: 16px;
	justify-content: space-between;
	margin: 16px 0 0;
`;

const StyledMainLeft = styled.div`
	flex: 1 0 32.2%;
`;

const StyledMainRigth = styled.div`
	flex: 1 0 66%; 
`;

const StyledWrapperSelect = styled.div`
	margin: 16px 0 0;

	:first-child {
		margin: 0;
	}
`;

const StyledWrapperSelectRowBtn = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;

	> *:first-child {
		flex: 1 1 auto;
	}
`;

const TasksCreatePage = () => {
	const navigate = useNavigate();
	const { workspaceId, boardId, columnId } = useParams();

	const { tags } = useSelector(state => state.workspacesSlice);
	const { members } = useSelector(state => state.membersSlice);

	const [taskName, setTaskName] = useState('');
	const [isCorrectTaskName, setIsCorrectTaskName] = useState(null);
	const [taskNameErrorMessage, setTaskNameErrorMessage] = useState(null);

	const [dateStart, setDateStart] = useState('');
	const [isCorrectDateStart, setIsCorrectDateStart] = useState(null);
	const [dateStartErrorMessage, setDateStartErrorMessage] = useState(null);

	const [dateEnd, setDateEnd] = useState('');
	const [isCorrectDateEnd, setIsCorrectDateEnd] = useState(null);
	const [dateEndErrorMessage, setDateEndErrorMessage] = useState(null);

	const [selectedStatus, setSelectedStatus] = useState({ label: "Статус задачи", value: 0 });
	const [selectedMember, setSelectedMember] = useState({ label: "Ответственный", value: 0 });
	const [selectedTag, setSelectedTag] = useState({ label: 'Тег', value: 0 });
	const [selectedTimeStart, setSelectedTimeStart] = useState({ label: "Время начала", value: 0 });
	const [selectedTimeEnd, setSelectedTimeEnd] = useState({ label: "Время окончания", value: 0 });

	const { createTask } = api();
	const { validationNotEmpty } = useValidation();

	// const dispatch = useDispatch();

	const handleSetValue = (setValue, value) => {
		setValue(value);
	}

	const handleSetValueDate = (setValue, value) => {
		const inputArray = value.replace(/\D/g, "").split('');

		let res = '';
		for (let i = 0; i < inputArray.length; i++) {
			if (i === 8)
				break;
			const char = inputArray[i];
			if (i === 2 || i === 4)
				res += `-${char}`
			else
				res += char;
		}

		setValue(res);
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

	const handleBlurTaskName = () => {
		return handleBlur(
			taskName,
			validationNotEmpty,
			isCorrectTaskName,
			setIsCorrectTaskName,
			setTaskNameErrorMessage,
		);
	}

	const handleBlurDateStart = () => {
		return handleBlur(
			dateStart,
			validationNotEmpty,
			isCorrectDateStart,
			setIsCorrectDateStart,
			setDateStartErrorMessage,
		);
	}

	const handleBlurDateEnd = () => {
		return handleBlur(
			dateEnd,
			validationNotEmpty,
			isCorrectDateEnd,
			setIsCorrectDateEnd,
			setDateEndErrorMessage,
		);
	}

	const timeValue = [
		{ label: '00:00', value: '0' },
		{ label: '01:00', value: '1' },
		{ label: '02:00', value: '2' },
		{ label: '03:00', value: '3' },
		{ label: '04:00', value: '4' },
		{ label: '05:00', value: '5' },
		{ label: '06:00', value: '6' },
		{ label: '07:00', value: '7' },
		{ label: '08:00', value: '8' },
		{ label: '09:00', value: '9:' },
		{ label: '10:00', value: '10' },
		{ label: '11:00', value: '11' },
		{ label: '12:00', value: '12' },
		{ label: '13:00', value: '13' },
		{ label: '14:00', value: '14' },
		{ label: '15:00', value: '15' },
		{ label: '16:00', value: '16' },
		{ label: '17:00', value: '17' },
		{ label: '18:00', value: '18' },
		{ label: '19:00', value: '19' },
		{ label: '20:00', value: '20' },
		{ label: '21:00', value: '21', },
		{ label: '22:00', value: '22', },
		{ label: '23:00', value: '23', },
		{ label: '24:00', value: '24', },
	];

	const options1 = [
		{ label: 'Новая', value: 'started' },
		{ label: 'В работе', value: 'process' },
		{ label: 'Завершена', value: 'сompleted' },
	];

	const memberUser = members.map((item) => ({
		label: `${item.username} (${item.last_name} ${item.first_name})`,
		value: item.id
	}));

	const tagsItems = tags.map((item) => ({
		label: item.name,
		value: item.id
	}));

	const date = _formattingDate(new Date());

	const handleSubmit = (e) => {
		e.preventDefault();

		const dateStartArr = dateStart.split('-');
		const dateStartDate = new Date(dateStartArr[2], dateStartArr[1] - 1, dateStartArr[0]);
		dateStartDate.setHours(selectedTimeStart.value);

		const dateEndArr = dateStart.split('-');
		const dateEndDate = new Date(dateEndArr[2], dateEndArr[1] - 1, dateEndArr[0]);
		dateEndDate.setHours(selectedTimeEnd.value);

		createTask({
			name: taskName,
			status: selectedStatus.value || null,
			tag: selectedTag.value || null,
			member: selectedMember.value || null,

			date_start: dateStartDate,
			time_start: dateStartDate,
			date_end: dateEndDate,
			time_end: dateEndDate,

			columnId,
		}).then(res => {
			navigate(`/workspaces/${workspaceId}/boards/${boardId}`)
		})
	}

	return (
		<BaseLayout title="Создайте задачу">
			<StyledCustomWrapperRow>
				<StyledCustomDate>
					Дата создания {date}
				</StyledCustomDate>
				<StyledCustomWrapperRowRigth>
					<Button
						label="Отменить"
						variant='secondary'
						onClick={handleSubmit}
					/>
					<Button
						label="Создать"
						variant='primary'
						onClick={handleSubmit}
					/>
				</StyledCustomWrapperRowRigth>
			</StyledCustomWrapperRow>
			<StyledRowSelect>
				<StyledRowSelectItem>
					<Input
						label="Название доски"
						value="Backend"
						disabled
					/>
				</StyledRowSelectItem>
				<StyledRowSelectItem>
					<Input
						label="Название задачи"
						value={taskName}
						setValue={(value) => handleSetValue(setTaskName, value)}
						success={isCorrectTaskName === null ? false : isCorrectTaskName}
						error={isCorrectTaskName === null ? false : !isCorrectTaskName}
						errorMessage={taskNameErrorMessage}
						onBlur={handleBlurTaskName}
					/>
				</StyledRowSelectItem>
				<StyledRowSelectItem>
					<Select
						defaultValue={selectedStatus}
						options={options1}
						onChange={setSelectedStatus}
					/>
				</StyledRowSelectItem>
			</StyledRowSelect>
			<StyledMain>
				<StyledMainLeft>
					<Accordion name="Параметры задачи">
						<StyledWrapperSelectRowBtn>
							<Select
								defaultValue={selectedTag}
								options={tagsItems}
								onChange={setSelectedTag}
							/>
							<Button
								variant="secondary"
								icon={addIcon}
								onClick={() => navigate('/workspaces/37/tags/create')}
							/>
						</StyledWrapperSelectRowBtn>
					</Accordion>
					<Accordion name="Участники">
						<Select
							defaultValue={selectedMember}
							options={memberUser}
							onChange={setSelectedMember}
						/>
					</Accordion>
					<Accordion name="Планирование">
						<StyledWrapperSelect>
							<Input
								label="Дата начала"
								value={dateStart}
								setValue={(value) => handleSetValueDate(setDateStart, value)}
								success={isCorrectDateStart === null ? false : isCorrectDateStart}
								error={isCorrectDateStart === null ? false : !isCorrectDateStart}
								errorMessage={dateStartErrorMessage}
								onBlur={handleBlurDateStart}
							/>
						</StyledWrapperSelect>
						<StyledWrapperSelect>
							<Select
								defaultValue={selectedTimeStart}
								options={timeValue}
								onChange={setSelectedTimeStart}
							/>
						</StyledWrapperSelect>
						<StyledWrapperSelect>
							<Input
								label="Дата окончания"
								value={dateEnd}
								setValue={(value) => handleSetValueDate(setDateEnd, value)}
								success={isCorrectDateEnd === null ? false : isCorrectDateEnd}
								error={isCorrectDateEnd === null ? false : !isCorrectDateEnd}
								errorMessage={dateEndErrorMessage}
								onBlur={handleBlurDateEnd}
							/>
						</StyledWrapperSelect>
						<StyledWrapperSelect>
							<Select
								defaultValue={selectedTimeEnd}
								options={timeValue}
								onChange={setSelectedTimeEnd}
							/>
						</StyledWrapperSelect>
					</Accordion>
				</StyledMainLeft>
				<StyledMainRigth>
					<Accordion name="Описание">
						<TextEditor />
					</Accordion>
				</StyledMainRigth>
			</StyledMain>
		</BaseLayout>
	);
};

export default TasksCreatePage;