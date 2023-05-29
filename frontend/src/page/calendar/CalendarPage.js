import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ruLocale from "@fullcalendar/core/locales/ru";
import styled from 'styled-components';

import BaseLayout from '../../layout/BaseLayout';
import Button from '../../components/buttons/button/Button';

const StyledCustomWrapperBtn = styled.div`
	margin: 32px 0 0 auto;
`;

const StyledFullCalendarWrapper = styled.div`
	margin: 32px 0;
	> div > div > div:nth-child(2) {
		display: flex;
		align-items: center;
	}
`;

const CalendarPage = () => {
	const navigate = useNavigate();
	const { workspaceId } = useParams();

	// const { user } = useSelector(state =>)
	const { memberRole } = useSelector(state => state.workspacesSlice);
	const { palette } = useSelector(state => state.colorsSlice);
	const { calendar } = useSelector(state => state.calendarSlice);

	const _formaittindCalendar = (arr) => {
		const date = new Date();
		const timezoneOffset = date.getTimezoneOffset();
		const timezone = -timezoneOffset / 60;

		return arr.map((item) => {
			// const timeStart = item.time_start.split(':')[0];
			const timeEnd = item.time_end.split(':')[0];

			const dateStart = new Date(item.date);

			const dateEnd = new Date(item.date);
			dateEnd.setHours(parseInt(timeEnd) + timezone);
			dateEnd.setMinutes(0);

			const title = item.status === 'disable' ? 'Утверждённая cмена' : 'Cмена';
			const color = item.status === 'disable' ? palette?.primary50 : palette?.primary40;

			const resArr = [{
				id: item.id,
				title: `${title}: ${item.user.username} (${item.user.first_name} ${item.user.last_name})`,
				start: dateStart,
				end: dateEnd,
				color,
			}];

			if (item.status === 'disable') {
				resArr.push(
					...item.user.tasks
						.filter(task => {
							if (dateStart > new Date(task.date_end))
								return false;
							if (dateEnd < new Date(task.date_start))
								return false;
							return true;
						})
						.map((task, i) => {
							let taskDateStart = new Date(task.date_start)
							if (taskDateStart < dateStart) {
								taskDateStart = dateStart;
							}

							let taskDateEnd = new Date(task.date_end)
							if (taskDateEnd > dateEnd) {
								taskDateEnd = new Date(dateEnd);
								taskDateEnd.setHours(taskDateEnd.getHours() - 1)
								taskDateEnd.setMinutes(59);
							}

							return {
								parentId: item.id,
								title: `Задача: ${task.name})`,
								start: taskDateStart,
								end: taskDateEnd,
								color: i % 2 === 0 ? palette?.succsess50 : palette?.primary50,
							}
						})
				)
			}

			return resArr;
		}).flat();
	}

	const formaittedCalendar = _formaittindCalendar(calendar);
	console.log('calendar', formaittedCalendar);

	return (
		<BaseLayout title="Календарь">
			<StyledCustomWrapperBtn>
				{memberRole === 'admin' ?
					<Button
						variant='primary'
						label="Утвердить смену"
						onClick={() => navigate(`/workspaces/${workspaceId}/calendar/approve`)}
					/> :
					<Button
						variant='primary'
						label="Добавить смену"
						onClick={() => navigate(`/workspaces/${workspaceId}/calendar/create`)}
					/>
				}
			</StyledCustomWrapperBtn>
			<StyledFullCalendarWrapper>
				<FullCalendar
					plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
					initialView="timeGridDay"
					slotLabelFormat={{
						hour12: false,
						hour: "2-digit",
						minute: "2-digit",
						omitZeroMinute: false,
						meridiem: "short",
					}}
					titleFormat={{
						year: 'numeric',
						month: 'numeric',
						day: 'numeric'
					}}
					nowIndicator={true}
					editable={false}
					eventDurationEditable={false}
					selectable={true}
					slotDuration="01:00"
					slotLabelInterval="01:00"
					slotMinTime="00:00"
					slotMaxTime="24:00"
					height="auto"
					allDaySlot={false}
					headerToolbar={{
						left: "today",
						center: "prev title next",
						right: "dayGridMonth,timeGridWeek,timeGridDay",
					}}
					locale={ruLocale}
					resources={[]}
					events={[
						// {
						// 	title: 'Смена: Mozzarella',
						// 	start: '2023-05-16T10:00:00',
						// 	end: '2023-05-16T22:01:00',
						// 	id: 'event',
						// 	color: palette?.primary50
						// },
						// {
						// 	title: 'Задача: Создать рабочее пространство',
						// 	start: '2023-05-16T10:00:00',
						// 	end: '2023-05-16T22:00:00',
						// 	parentId: 'event',
						// 	color: palette?.succsess50
						// },
						// {
						// 	title: 'Задача: Создать модель пользователя',
						// 	start: '2023-05-16T12:30:00',
						// 	end: '2023-05-16T16:00:00',
						// 	parentId: 'event',
						// 	color: palette?.primary50
						// }
						...formaittedCalendar
					]}
				/>
			</StyledFullCalendarWrapper>
		</BaseLayout>
	);
};

export default CalendarPage;