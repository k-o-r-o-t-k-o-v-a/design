import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { api } from '../../services/api';
import { useValidation } from '../../services/validation';

import BaseLayout from '../../layout/BaseLayout';
import Input from '../../components/input/Input';
import Select from '../../components/buttons/select/Select';
import Button from '../../components/buttons/button/Button';
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

const ScheduleApprovePage = () => {
	const { workspaceId } = useParams();

	const { schedules } = useSelector(state => state.calendarSlice);

	const [dateStart, setDateStart] = useState('');
	const [isCorrectDateStart, setIsCorrectDateStart] = useState(null);
	const [dateStartErrorMessage, setDateStartErrorMessage] = useState(null);

	const [selectedTimeStart, setSelectedTimeStart] = useState({ label: "Время начала", value: 0 });
	const [selectedTimeEnd, setSelectedTimeEnd] = useState({ label: "Время окончания", value: 0 });
	const [selectedAvailableSchedules, setSelectedAvailableSchedules] = useState({ label: "Доступные смены", value: 0 });

	const { approveSchedule } = api();
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

	const filteringItems = (schedules) => {
		const date = new Date();
		const timezoneOffset = date.getTimezoneOffset();
		const timezone = -timezoneOffset / 60;

		return schedules.filter(item => {
			if (dateStart !== '') {
				const dateSplit = dateStart.split('-');
				const date = new Date(item.date);

				if (!(
					date.getFullYear() == dateSplit[2] &&
					date.getMonth() == dateSplit[1] - 1 &&
					date.getDate() == dateSplit[0]
				))
					return false;
			}

			if (selectedTimeStart.value !== 0) {
				const dateStart = new Date(item.date);
				if (!(dateStart.getHours() == parseInt(selectedTimeStart.value)))
					return false;
			}

			if (selectedTimeEnd.value !== 0) {
				const dateEnd = new Date(item.date);
				dateEnd.setHours(parseInt(item.time_end.split(':')[0]) + timezone);
				dateEnd.setMinutes(0);

				if (!(dateEnd.getHours() == parseInt(selectedTimeEnd.value)))
					return false;
			}

			return true;

		})
	}

	const filteredItems = filteringItems(schedules)

	const renderSchedulesItems = (schedules) => {
		return schedules.map((item) => {
			return {
				label: `${item.user.username} (${item.user.last_name} ${item.user.first_name})`,
				value: item.id
			}
		})
	}

	const schedulesItems = renderSchedulesItems(filteredItems);

	const handleSubmit = (e) => {
		e.preventDefault();

		approveSchedule({
			workspace_id: workspaceId,
			schedule_id: selectedAvailableSchedules.value,
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
				<StyledWrapperSelect>
					<Select
						defaultValue={selectedAvailableSchedules}
						options={schedulesItems}
						onChange={setSelectedAvailableSchedules}
					/>
				</StyledWrapperSelect>
				<StyledWrapperBtn>
					<Button
						variant="primary"
						label="Утвердить"
						onClick={handleSubmit}
					/>
				</StyledWrapperBtn>
			</StyledForm>
		</BaseLayout>
	);
};

export default ScheduleApprovePage;