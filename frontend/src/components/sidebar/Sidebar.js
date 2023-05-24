import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Nav from '../nav/Nav';

import folderSvg from './../../assets/icons/folder.svg';
import userSvg from './../../assets/icons/user.svg';
import calendarSvg from './../../assets/icons/calendar.svg';
import tableSvg from './../../assets/icons/table.svg';
import addSvg from './../../assets/icons/add.svg';
import { useParams } from 'react-router-dom';

const StyledSidebar = styled.div`
	flex: 0 0 240px;
	width: 240px;
	height: 100vh;
	background: ${props => props.theme.colors.neutral10};
`;

const Sidebar = () => {
    const { workspaceId } = useParams();

    const { workspaces } = useSelector(state => state.workspacesSlice);
    const { boards } = useSelector(state => state.boardsSlice)

    const navLinks = [
        {
            name: 'Рабочие пространства',
            icon: folderSvg,
            additionalLink: {
                icon: addSvg,
                path: '/workspaces/create',
            },
            nested: workspaces.map(({ id, name }) => ({ name, path: `/workspaces/${id}` })),
        },
        {
            name: 'Участники',
            path: '/participants',
            icon: userSvg,
        },
        {
            name: 'Календарь',
            path: '/calendar',
            icon: calendarSvg,
        },
        {
            name: 'Доски',
            icon: tableSvg,
            additionalLink: {
                icon: addSvg,
                path: `/workspaces/${workspaceId}/board/create`
            },
            nested: boards?.length ? boards.map(({ id, name }) => ({ name, path: `/workspaces/${workspaceId}/board/${id}` })) : null
        }
    ];

    return (
        <StyledSidebar>
            <Nav navLinks={navLinks} />
        </StyledSidebar>
    );
};

export default Sidebar;
