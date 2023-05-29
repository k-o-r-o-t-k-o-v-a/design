import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { api } from '../../services/api';
import { useValidation } from '../../services/validation';

import BaseLayout from '../../layout/BaseLayout';
import Button from '../../components/buttons/button/Button';
import Input from '../../components/input/Input';
import Select from '../../components/buttons/select/Select';
import { StyledForm } from '../../styles/BaseStyleElements';

const StyledWrapperSelect = styled.div`
	margin: 16px 0 0;

	:first-child {
		margin: 0;
	}
`;

const StyledWrapperBtn = styled.div`
	margin: 20px 0 0;
`;

const ScheduleCreatePage = () => {
	const { workspaceId } = useParams();

	const [dateStart, setDateStart] = useState('');
	const [isCorrectDateStart, setIsCorrectDateStart] = useState(null);
	const [dateStartErrorMessage, setDateStartErrorMessage] = useState(null);

	const [selectedTimeStart, setSelectedTimeStart] = useState({ label: "Время начала", value: 0 });
	const [selectedTimeEnd, setSelectedTimeEnd] = useState({ label: "Время окончания", value: 0 });

	const { createSchedule } = api();
	const { validationNotEmpty } = useValidation();

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

	const handleBlurDateStart = () => {
		return handleBlur(
			dateStart,
			validationNotEmpty,
			isCorrectDateStart,
			setIsCorrectDateStart,
			setDateStartErrorMessage,
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

	const handleSubmit = (e) => {
		e.preventDefault();

		const splitDate = dateStart.split('-');
		const dDate = new Date(splitDate[2], parseInt(splitDate[1]) - 1, splitDate[0]);

		const dTimeStart = new Date(splitDate[2], parseInt(splitDate[1]) - 1, splitDate[0]);
		dTimeStart.setHours(selectedTimeStart.value);

		const dTimeEnd = new Date(splitDate[2], parseInt(splitDate[1]) - 1, splitDate[0]);
		dTimeEnd.setHours(selectedTimeEnd.value);

		// console.log(1, dDate);
		// console.log(2, dTimeStart);
		// console.log(3, dTimeEnd);

		createSchedule({
			date: dDate,
			time_start: dTimeStart,
			time_end: dTimeEnd,
			workspace_id: workspaceId
		})
	}

	return (
		<BaseLayout title="Создать смену">
			<StyledForm onSubmit={handleSubmit}>
				<StyledWrapperSelect>
					<Input
						label="Дата"
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
					<Select
						defaultValue={selectedTimeEnd}
						options={timeValue}
						onChange={setSelectedTimeEnd}
					/>
				</StyledWrapperSelect>
				<StyledWrapperBtn>
					<Button
						variant="primary"
						label="Создать"
						onClick={handleSubmit}
					/>
				</StyledWrapperBtn>
			</StyledForm>
		</BaseLayout>
	);
};

export default ScheduleCreatePage;