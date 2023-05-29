import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { api } from '../../services/api';
import { removeNotifications } from '../../redux/slices/notificationsSlice';

import closeIcon from '../../assets/icons/close.svg';
import Button from '../buttons/button/Button';

const StyledNotification = styled.div`
	position: absolute;
	top: 40px;
	right: 0;
	height: 100%;
	width: 400px;
	padding: 14px 16px;
	z-index: 10;
	background: ${props => props.theme.colors.primary0};
	box-shadow: 0px 8px 24px -8px rgba(147, 147, 163, 0.48), 0px 2px 8px -2px rgba(147, 147, 163, 0.24);
`;

const StyledNotificationHead = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const StyledNotificationTitle = styled.h2`
	font-family: 'Montserrat';
	font-weight: 600;
	font-size: 22px;
	line-height: 40px;
	color: ${props => props.theme.colors.neutral90};
`;

const StyledNotificationClose = styled.div`
	width: 20px;
	height: 20px;
	cursor: pointer;
`;

const StyledNotificationCloseIcon = styled.img`
	width: 100%;
	height: 100%;
`;

const StyledNotificationBody = styled.ul`
`;

const StyledNotificationBodyItem = styled.li`
	font-family: 'Montserrat';
	font-size: 16px;
	border-top: 1px solid #E8EAF2;
	padding: 15px 0 0;
	margin: 15px 0 0;
	text-align: ${props => props.empty ? 'center' : 'left'};
`;

const StyledRowButtons = styled.div`
	display: flex;
	gap: 5px;
	margin: 10px 0 0;
`

const Notification = ({ setClose }) => {
	const { notifications } = useSelector(state => state.notificationsSlice)

	const { setAcceptMember } = api();

	const dispatch = useDispatch();

	const handleNotificationClick = (link, id) => {
		setAcceptMember(link, { 'notification_id': id });
		dispatch(removeNotifications(id));
	}

	return (
		<StyledNotification>
			<StyledNotificationHead>
				<StyledNotificationTitle>
					Уведомления
				</StyledNotificationTitle>
				<StyledNotificationClose
					onClick={setClose}
				>
					<StyledNotificationCloseIcon
						src={closeIcon}
						alt="Закрыть"
					/>
				</StyledNotificationClose>
			</StyledNotificationHead>
			<StyledNotificationBody>
				{notifications.length === 0 ?
					<StyledNotificationBodyItem empty>
						Уведомлений нет
					</StyledNotificationBodyItem>
					:
					notifications.map((item) => {
						const [text, strButtons] = item.text.split(/\[(.*?)\]/);
						let buttons = null;
						if (strButtons) buttons = strButtons.split(';');

						return (
							<StyledNotificationBodyItem key={item.id}>
								{text}
								{buttons &&
									<StyledRowButtons>
										{buttons.map((jtem) => {
											const [variant, name, link] = jtem.split(',');
											return (
												<Button
													key={name}
													variant={variant}
													label={name}
													onClick={() => handleNotificationClick(`/notifications${link}`, item.id)}
												/>
											)
										})}
									</StyledRowButtons>
								}
							</StyledNotificationBodyItem>
						)
					})
				}
			</StyledNotificationBody>
		</StyledNotification>
	);
};

export default Notification;