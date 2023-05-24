export const api = () => {
	const _baseUrl = process.env.API_BASE_URL || 'http://localhost:8006';

	const request = async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
		try {
			const response = await fetch(`${_baseUrl}${url}`, { method, body, headers });

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(`Could not fetch ${url}, status: ${response.status}, ${errorData.message}`);
			}

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
		console.log({ ...data, workspaceId });
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

	return {
		getColorsBaseById,
		createUser,
		loginUser,
		getUserData,
		createWorkspace,
		createBoard,
		getWorkspace,
		getBoards,
	}
}
