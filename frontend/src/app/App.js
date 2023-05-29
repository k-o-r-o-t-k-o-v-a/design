import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { fetchUserData } from '../redux/slices/userSlice';
import { fetchColorsBaseById } from '../redux/slices/colorsSlice';

import UserPage from '../page/user/UserPage';
import RegisterPage from '../page/auth/RegisterPage';
import LoginPage from '../page/auth/LoginPage';
import WorkspacesPage from '../page/workspaces/WorkspacesPage';
import WorkspacesCreatePage from '../page/workspaces/WorkspacesCreatePage';
import WorkspacesItemPage from '../page/workspaces/WorkspacesItemPage';
import BoardsPage from '../page/boards/BoardsPage';
import BoardsCreatePage from '../page/boards/BoardsCreatePage';
import ColumnsCreatePage from '../page/boards/ColumnsCreatePage';
import TasksCreatePage from '../page/boards/TasksCreatePage';
import CalendarPage from '../page/calendar/CalendarPage';
import MembersPage from '../page/members/MembersPage';
import MembersInvitationPage from '../page/members/MembersInvitationPage';
import TagCreatePage from '../page/workspaces/TagCreatePage';
import ScheduleCreatePage from '../page/calendar/ScheduleCreatePage';
import ScheduleApprovePage from '../page/calendar/ScheduleApprovePage';
import ThemePage from '../page/theme/ThemePage';

const App = () => {
	const navigate = useNavigate();

	const { isAuth } = useSelector(state => state.userSlice);

	const dispatch = useDispatch();

	useEffect(() => {
		if (isAuth) {
			dispatch(fetchUserData())
				.then(res => {
					const workspaceId = res?.payload?.workspace;
					if (!workspaceId)
						navigate('/workspaces');
					// else
					// navigate(`/workspaces/${workspaceId}`);
				})
				.catch((err) => {
					localStorage.removeItem('token');
					// navigate('/auth/login');
				})
		} else {
			dispatch(fetchColorsBaseById(1));
			// navigate('/auth/login');
		}
	}, [isAuth])

	return (
		<>
			<Routes>
				{isAuth ?
					<>
						<Route
							path='/user'
							element={<UserPage />}
						/>
						<Route
							path='/theme'
							element={<ThemePage />}
						/>
						<Route
							path='/workspaces'
							element={<WorkspacesPage />}
						/>
						<Route
							path='/workspaces/create'
							element={<WorkspacesCreatePage />}
						/>
						<Route
							path='/workspaces/:workspaceId'
							element={<WorkspacesItemPage />}
						/>
						<Route
							path='/workspaces/:workspaceId/members'
							element={<MembersPage />}
						/>
						<Route
							path='/workspaces/:workspaceId/members/invitation'
							element={<MembersInvitationPage />}
						/>
						<Route
							path='/workspaces/:workspaceId/boards/create'
							element={<BoardsCreatePage />}
						/>
						<Route
							path='/workspaces/:workspaceId/calendar'
							element={<CalendarPage />}
						/>
						<Route
							path='/workspaces/:workspaceId/calendar/create'
							element={<ScheduleCreatePage />}
						/>
						<Route
							path='/workspaces/:workspaceId/calendar/approve'
							element={<ScheduleApprovePage />}
						/>
						<Route
							path='/workspaces/:workspaceId/boards/:boardId'
							element={<BoardsPage />}
						/>
						<Route
							path='/workspaces/:workspaceId/boards/:boardId/columns/create'
							element={<ColumnsCreatePage />}
						/>
						<Route
							path='/workspaces/:workspaceId/boards/:boardId/columns/:columnId/tasks/create'
							element={<TasksCreatePage />}
						/>
						<Route
							path='/workspaces/:workspaceId/tags/create'
							element={<TagCreatePage />}
						/>
					</> :
					<>
						<Route
							path='/auth/register'
							element={<RegisterPage />}
						/>
						<Route
							path='/auth/login'
							element={<LoginPage />}
						/>
						<Route
							path='*'
							element={<LoginPage />}
						/>
					</>
				}
			</Routes>
		</>
	);
};

export default App;