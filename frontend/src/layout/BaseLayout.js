import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { fetchWorkspace } from '../redux/slices/workspacesSlice';
import { fetchBoardData } from '../redux/slices/boardsSlice';

import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import Title from '../components/title/Title';


const StyledPageWrapper = styled.div`
	display: flex;
	height: calc(100vh - 40px);
`;

const StyledMain = styled.main`
	overflow-y: scroll;
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
	padding: 52px 32px 32px;
`;

const BaseLayout = ({ title, children }) => {
	const { workspaceId, boardId } = useParams();

	const dispatch = useDispatch();

	useEffect(() => {
		if (workspaceId) {
			dispatch(fetchWorkspace(workspaceId))
		}
	}, [workspaceId])

	useEffect(() => {
		if (boardId) {
			dispatch(fetchBoardData(boardId))
		}
	}, [boardId])

	return (
		<>
			<Header />
			<StyledPageWrapper>
				<Sidebar />
				<StyledMain>
					<Title text={title} />
					{children}
				</StyledMain>
			</StyledPageWrapper>
		</>
	);
};

export default BaseLayout;