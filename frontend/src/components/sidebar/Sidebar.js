import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Nav from '../nav/Nav';

import folderSvg from '../../assets/icons/folder.svg';
import userSvg from '../../assets/icons/user.svg';
import calendarSvg from '../../assets/icons/calendar.svg';
import tableSvg from '../../assets/icons/table.svg';
import addSvg from '../../assets/icons/add.svg';

const StyledSidebar = styled.div`
	flex: 0 0 240px;
	width: 240px;
	height: 100vh;
	background: ${props => props.theme.colors.neutral10};
`;

const Sidebar = () => {
	const { workspaceId, boardId } = useParams();

	const { workspace, workspaces } = useSelector(state => state.workspacesSlice);
	const { board, boards } = useSelector(state => state.boardsSlice)

	const navForWorkSpace = workspace?.id ? [{
		name: 'Участники',
		path: `/workspaces/${workspace.id}/members`,
		icon: userSvg,
	},
	{
		name: 'Календарь',
		path: `/workspaces/${workspace.id}/calendar`,
		icon: calendarSvg,
	},
	{
		name: 'Доски',
		icon: tableSvg,
		additionalLink: {
			icon: addSvg,
			path: `/workspaces/${workspace.id}/boards/create`
		},
		nested: boards?.length ? boards.map(({ id, name }) => ({ name, path: `/workspaces/${workspace.id}/boards/${id}`, active: id == boardId })) : null
	}] : [];

	const navLinks = [
		{
			name: 'Рабочие пространства',
			icon: folderSvg,
			additionalLink: {
				icon: addSvg,
				path: '/workspaces/create',
			},
			nested: workspaces.map(({ id, name }) => ({ name, path: `/workspaces/${id}`, active: id === workspace?.id })),
		},
		...navForWorkSpace
	];

	return (
		<StyledSidebar>
			<Nav navLinks={navLinks} />
		</StyledSidebar>
	);
};

export default Sidebar;