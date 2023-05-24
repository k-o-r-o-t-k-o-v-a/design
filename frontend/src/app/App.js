import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { fetchUserData } from '../redux/slices/userSlice';
import { fetchColorsBaseById } from '../redux/slices/colorsSlice';

import BoardPage from '../page/board/BoardPage';
import RegisterPage from '../page/auth/RegisterPage';
import LoginPage from '../page/auth/LoginPage';
import WorkspacesPage from '../page/workspaces/WorkspacesPage';
import WorkspacesCreatePage from '../page/workspaces/WorkspacesCreatePage';
import WorkspacesItemPage from '../page/workspaces/WorkspacesItemPage';
import BoardCreatePage from '../page/board/BoardCreatePage';

const App = () => {
    const navigate = useNavigate();

    const { isAuth } = useSelector(state => state.userSlice);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuth) {
            dispatch(fetchUserData())
                .then(res => {
                    console.log(22, res);
                    const workspaceId = res?.payload?.workspace;
                    if (!workspaceId)
                        navigate('/workspaces');
                    else
                        navigate(`/workspaces/${workspaceId}`);
                })
                .catch((err) => {
                    localStorage.removeItem('token');
                    //navigate('/auth/login');
                })
        } else {
            dispatch(fetchColorsBaseById(1));
            //navigate('/auth/login');
        }
    }, [isAuth])

    return (
        <>
            <Routes>
                {isAuth ?
                    <>
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
                            path='/workspaces/:workspaceId/board/create'
                            element={<BoardCreatePage />}
                        />
                        <Route
                            path='/workspaces/:workspaceId/board/:boardId'
                            element={<BoardPage />}
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
                    </>
                }
            </Routes>
        </>
    );
};

export default App;
