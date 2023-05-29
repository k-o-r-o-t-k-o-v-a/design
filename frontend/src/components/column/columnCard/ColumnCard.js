import styled from "styled-components";

import taskIcon from '../../../assets/icons/task.svg';

const StyledColumnCard = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 12px;
	padding: 12px;
	border: 1px solid ${props => props.theme.colors.primary50};
	background: ${props => props.theme.colors.neutral10};
	border-radius: 8px;
	cursor: pointer;
`;

const StyledTaskId = styled.span`
	display: flex;
	align-items: center;
	gap: 4px;
`;

const StyledTaskIdIcon = styled.img`
	width: 16px;
	height: 16px;
`;

const StyledTaskIdText = styled.span`
	font-family: 'Montserrat';
	font-weight: 400;
	font-size: 12px;
	line-height: 16px;
	color: ${props => props.theme.colors.primary90};
`;

const StyledTaskName = styled.div`
	font-family: 'Montserrat';
	font-weight: 400;
	font-size: 14px;
	line-height: 16px;
	color: ${props => props.theme.colors.primary90};
`;

const StyledTaskUsers = styled.div`
	display: flex;
	margin: 0 2.5px;
`;

const StyledTaskUsersItem = styled.div`
	background: #E6F1FF;
	width: 24px;
	height: 24px;
	border: 2px solid #FFFFFF;
	border-radius: 50%;
	text-align: center;
	padding: 2px 0;
	margin: 0 -2.5px;
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 700;
	font-size: 10px;
	line-height: 16px;
	color: #0C67E6;
`;

const StyledTaskTags = styled.div`
	display: flex;
	gap: 2px;
`;

const StyledTaskTag = styled.span`
	font-family: 'Montserrat';
	font-weight: 400;
	font-size: 12px;
	line-height: 16px;
	padding: 0 8px 1px;
	border-radius: 8px;
	color: ${props => props.theme.colors.primary90};
	background: ${props => props.color};
`

const ColumnCard = ({
	task,
}) => {
	// 	return (
	// 		<StyledColumnCard>
	// 			<StyledTaskId>
	// 				<StyledTaskIdIcon src={taskIcon} alt="Id" />
	// 				<StyledTaskIdText>#0256</StyledTaskIdText>
	// 			</StyledTaskId>
	// 			<StyledTaskName>
	// 				{task.name}
	// 				Уведомления. Приходит ошибочное описание другой задачи
	// 			</StyledTaskName>
	// 			<StyledTaskUsers>
	// 				<StyledTaskUsersItem>M</StyledTaskUsersItem>
	// 			</StyledTaskUsers>
	// 			<StyledTaskTags>
	// 				<StyledTaskTag>
	// 					Code
	// 				</StyledTaskTag>
	// 				<StyledTaskTag danger>
	// 					Danger
	// 				</StyledTaskTag>
	// 			</StyledTaskTags>
	// 		</StyledColumnCard>
	// 	)
	// } else if (task.name == 'Базовые цвета') {
	// 	return (
	// 		<StyledColumnCard>
	// 			<StyledTaskId>
	// 				<StyledTaskIdIcon src={taskIcon} alt="Id" />
	// 				<StyledTaskIdText>#0256</StyledTaskIdText>
	// 			</StyledTaskId>
	// 			<StyledTaskName>

	// 				Модуль Сервис
	// 			</StyledTaskName>
	// 			<StyledTaskUsers>
	// 				<StyledTaskUsersItem>K</StyledTaskUsersItem>
	// 			</StyledTaskUsers>
	// 			<StyledTaskTags>
	// 				<StyledTaskTag>
	// 					Code
	// 				</StyledTaskTag>
	// 				<StyledTaskTag testing>
	// 					Testing
	// 				</StyledTaskTag>
	// 			</StyledTaskTags>
	// 		</StyledColumnCard>
	// 	)
	// } else {
	return (
		<StyledColumnCard>
			<StyledTaskId>
				<StyledTaskIdIcon src={taskIcon} alt="Id" />
				<StyledTaskIdText>#0256</StyledTaskIdText>
			</StyledTaskId>
			<StyledTaskName>
				{task.name}
			</StyledTaskName>
			{task?.user?.username &&
				<StyledTaskUsers>
					<StyledTaskUsersItem>{task.user.username.slice(0, 1).toUpperCase()}</StyledTaskUsersItem>
				</StyledTaskUsers>
			}
			{task?.tag?.name &&
				<StyledTaskTags>
					<StyledTaskTag color={task.tag.color}>
						{task.tag.name}
					</StyledTaskTag>
				</StyledTaskTags>
			}
		</StyledColumnCard >
	)
	// }
};

export default ColumnCard;
