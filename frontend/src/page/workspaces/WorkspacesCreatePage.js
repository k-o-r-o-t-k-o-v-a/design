import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

// import { addWorkspaces } from '../redux/slices/workspacesSlice';
import { api } from '../../services/api';
import { useValidation } from '../../services/validation';

import Title from '../../components/title/Title';
import Input from '../../components/input/Input';
import Button from '../../components/buttons/button/Button';
import { useNavigate } from 'react-router-dom';
import { fetchCreateWorkspace } from '../../redux/slices/workspacesSlice';

const StyledFrom = styled.form`
	margin: 24px 0 0;
`;

const StyledInputWrapper = styled.div`
	margin: 20px;
`;

const WorkspacesCreatePage = () => {
    const navigate = useNavigate();

    const [workspaceName, setWorkspaceName] = useState('');
    const [isCorrectWorkspaceName, setIsCorrectWorkspaceName] = useState(null);
    const [workspaceNameErrorMessage, setWorkspaceNameErrorMessage] = useState(null);

    const dispatch = useDispatch();

    const { createWorkspace } = api();
    const { validationNotEmpty } = useValidation();

    const handleSetValue = (setValue, value) => {
        // Todo:
        setValue(value);
    }

    const handleBlur = (value, validation, correct, setCorrect, setErrorMessage) => {
        const isValid = validation(value);
        if (isValid !== true) {
            setCorrect(false);
            setErrorMessage({ title: isValid });
        } else if (correct === false) {
            setCorrect(true);
        }
        return isValid;
    }

    const handleBlurWorkspaceName = () => {
        return handleBlur(
            workspaceName,
            validationNotEmpty,
            isCorrectWorkspaceName,
            setIsCorrectWorkspaceName,
            setWorkspaceNameErrorMessage,
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // dispatch(fetchCreateWorkspace({ name: workspaceName }))
        createWorkspace({ name: workspaceName })
            .then(res => {
                navigate(`/workspaces/${res.id}`)
            })
        // .then(res => {
        // 	console.log('Create workspace ok', res);
        // });
    }

    return (
        <>
            <Title text="Создайте рабочее пространство" />
            <StyledFrom onSubmit={handleSubmit}>
                <StyledInputWrapper>
                    <Input
                        label="Название рабочего пространства"
                        value={workspaceName}
                        setValue={(value) => handleSetValue(setWorkspaceName, value)}
                        success={isCorrectWorkspaceName === null ? false : isCorrectWorkspaceName}
                        error={isCorrectWorkspaceName === null ? false : !isCorrectWorkspaceName}
                        errorMessage={workspaceNameErrorMessage}
                        onBlur={handleBlurWorkspaceName}
                    />
                </StyledInputWrapper>
                <Button
                    label="Создать"
                    variant='primary'
                    onClick={handleSubmit}
                />
            </StyledFrom>
        </>
    );
};

export default WorkspacesCreatePage;
