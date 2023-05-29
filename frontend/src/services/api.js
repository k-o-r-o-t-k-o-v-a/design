export const api = () => {
	const _baseUrl = process.env.API_BASE_URL || 'http://localhost:8000';

	const request = async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
		try {
			const response = await fetch(`${_baseUrl}${url}`, { method, body, headers });

			// if (!response.ok) {
			// 	const errorData = await response.json();
			// 	throw new Error(`Could not fetch ${url}, status: ${response.status}, ${errorData.message}`);
			// }

			const data = await response.json();

			return data;
		} catch (e) {
			throw e;
		}
	};

	const _getHeaderWidthToken = () => {
		const token = localStorage.getItem('token');
		return {
			'Content-Type': 'application/json',
			'authorization': `Bearer ${token}`
		}
	}

	const getColorsBaseById = async (id) => {
		return await request(`/base-colors/${id}`);
	}

	const createUser = async (data) => {
		return await request('/auth/register', 'POST', JSON.stringify(data));
	}

	const loginUser = async (data) => {
		return await request('/auth/login', 'POST', JSON.stringify(data));
	}

	const getUserData = async () => {
		return await request(
			'/user/data',
			'GET',
			null,
			_getHeaderWidthToken(),
		)
	}

	const createWorkspace = async (data) => {
		return await request(
			'/workspaces',
			'POST',
			JSON.stringify(data),
			_getHeaderWidthToken(),
		);
	}

	const createBoard = async (workspaceId, data) => {
		return await request(
			'/boards',
			'POST',
			JSON.stringify({ ...data, workspaceId }),
			_getHeaderWidthToken(),
		);
	}


	const getWorkspace = async (workspaceId) => {
		return await request(
			`/workspaces/${workspaceId}`,
			'GET',
			null,
			_getHeaderWidthToken(),
		);
	}

	const getBoards = async (workspaceId) => {
		return await request(
			`/workspaces/${workspaceId}/boards`,
			'GET',
			null,
			_getHeaderWidthToken(),
		);
	}

	const setUserLastWorkspace = async (lastWorkspace) => {
		return await request(
			`/user/lastWorkspace`,
			'PATCH',
			JSON.stringify({ lastWorkspace }),
			_getHeaderWidthToken(),
		);
	}

	const createColumn = async (data) => {
		return await request(
			'/columns',
			'POST',
			JSON.stringify(data),
			_getHeaderWidthToken(),
		)
	}

	const createTask = async (data) => {
		return await request(
			'/tasks',
			'POST',
			JSON.stringify(data),
			_getHeaderWidthToken(),
		)
	}

	const getBoardData = async (boardId) => {
		return await request(
			`/boards/${boardId}`,
			'GET',
			null,
			_getHeaderWidthToken(),
		);
	}

	const updateTaskPosition = async (data) => {
		return request(
			'/tasks/position',
			'PATCH',
			JSON.stringify(data),
			_getHeaderWidthToken(),
		);
	}

	const updateColumnPosition = async (data) => {
		return request(
			'/columns/position',
			'PATCH',
			JSON.stringify(data),
			_getHeaderWidthToken()
		)
	}

	const inviteUser = async (data) => {
		return request(
			'/notifications/invitation/workspace',
			'POST',
			JSON.stringify(data),
			_getHeaderWidthToken()
		)
	}

	const getMembers = async (workspaceId) => {
		return await request(
			`/workspaces/${workspaceId}/members`,
			'GET',
			null,
			_getHeaderWidthToken(),
		);
	}

	const deleteMember = async (workspaceId, userId) => {
		return await request(
			`/workspaces/${workspaceId}/members/${userId}`,
			'DELETE',
			null,
			_getHeaderWidthToken(),
		)
	}

	const getNotification = async () => {
		return await request(
			`/notifications`,
			'GET',
			null,
			_getHeaderWidthToken(),
		)
	}

	const setAcceptMember = async (url, data) => {
		return await request(
			url,
			'PATCH',
			JSON.stringify(data),
			_getHeaderWidthToken(),
		)
	}

	const createTag = async (data) => {
		return await request(
			'/tags',
			'POST',
			JSON.stringify(data),
			_getHeaderWidthToken(),
		);
	}

	const getTags = async (workspaceId) => {
		return await request(
			`/workspaces/${workspaceId}/tags`,
			'GET',
			null,
			_getHeaderWidthToken(),
		);
	}

	const createSchedule = async (data) => {
		return await request(
			`/schedules`,
			'POST',
			JSON.stringify(data),
			_getHeaderWidthToken(),
		);
	}

	const approveSchedule = async (data) => {
		return await request(
			`/schedules`,
			'PATCH',
			JSON.stringify(data),
			_getHeaderWidthToken(),
		);
	}

	const getSchedules = async (workspaceId) => {
		return await request(
			`/workspaces/${workspaceId}/schedules`,
			'GET',
			null,
			_getHeaderWidthToken(),
		);
	}

	const getCalendar = async (workspaceId) => {
		return await request(
			`/workspaces/${workspaceId}/calendar`,
			'GET',
			null,
			_getHeaderWidthToken(),
		)
	}

	const updateUser = async (data) => {
		return await request(
			'/user',
			'PATCH',
			JSON.stringify(data),
			_getHeaderWidthToken(),
		);
	}

	const deleteWorkspace = async (workspaceId) => {
		return await request(
			`/workspaces/${workspaceId}`,
			'DELETE',
			null,
			_getHeaderWidthToken(),
		)
	}

	const updateWorkspace = async (workspaceId, data) => {
		return await request(
			`/workspaces/${workspaceId}`,
			'PATCH',
			JSON.stringify(data),
			_getHeaderWidthToken(),
		)
	}

	const createTheme = async (data) => {
		return await request(
			'/base-colors',
			'POST',
			JSON.stringify(data),
			_getHeaderWidthToken(),
		)
	}

	const getTheme = async () => {
		return await request(
			'/base-colors',
			'GET',
			null,
			_getHeaderWidthToken(),
		)
	}

	const installTheme = async (themeId) => {
		return await request(
			`/base-colors/${themeId}`,
			'PATCH',
			null,
			_getHeaderWidthToken(),
		)
	}

	const deleteTheme = async (themeId) => {
		return await request(
			`/base-colors/${themeId}`,
			'DELETE',
			null,
			_getHeaderWidthToken(),
		)
	}

	const getWorkspaceMemberRole = async (workspaceId) => {
		return await request(
			`/workspaces/${workspaceId}/role`,
			'GET',
			null,
			_getHeaderWidthToken()
		)
	}

	return {
		getColorsBaseById,
		createUser,
		loginUser,
		getUserData,
		createWorkspace,
		createBoard,
		getWorkspace,
		getBoards,
		setUserLastWorkspace,
		createColumn,
		createTask,
		getBoardData,
		updateColumnPosition,
		updateTaskPosition,
		inviteUser,
		getMembers,
		deleteMember,
		getNotification,
		setAcceptMember,
		createTag,
		getTags,
		createSchedule,
		approveSchedule,
		getSchedules,
		getCalendar,
		updateUser,
		deleteWorkspace,
		updateWorkspace,
		createTheme,
		getTheme,
		deleteTheme,
		installTheme,
		getWorkspaceMemberRole
	}
}