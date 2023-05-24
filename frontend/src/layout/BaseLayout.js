import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { fetchWorkspace } from '../redux/slices/workspacesSlice';
import { fetchBoards } from '../redux/slices/boardsSlice';

import Sidebar from '../components/sidebar/Sidebar';
import Title from '../components/title/Title';

const StyledPageWrapper = styled.div`
	display: flex;
`;

const StyledMain = styled.main`
	flex: 1 1 auto;
	padding: 52px 32px 12px;
`;

const BaseLayout = ({ title, children }) => {
    const { workspaceId, boardId } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        if (workspaceId) {
            dispatch(fetchWorkspace(workspaceId));
        }
    }, [workspaceId])

    useEffect(() => {
        if (boardId) {
            dispatch(fetchWorkspace(boardId));
        }
    }, [boardId])

    return (

        <StyledPageWrapper>
            <Sidebar />
            <StyledMain>
                <Title text={title} />
                {children}
            </StyledMain>
        </StyledPageWrapper>
    );
};

export default BaseLayout;
