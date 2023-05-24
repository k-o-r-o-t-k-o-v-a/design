import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { api } from '../../services/api';
import { useValidation } from '../../services/validation';

import Input from '../../components/input/Input';
import Button from '../../components/buttons/button/Button';
import { useNavigate } from 'react-router-dom';
import { fetchCreateWorkspace } from '../../redux/slices/workspacesSlice';
import BaseLayout from '../../layout/BaseLayout';

const StyledFrom = styled.form`
	margin: 24px 0 0;
`;

const StyledInputWrapper = styled.div`
	margin: 20px;
`;

const BoardCreatePage = () => {
    const navigate = useNavigate();

    const { workspace } = useSelector(state => state.workspacesSlice);

    const [boardName, setBoardName] = useState('');
    const [isCorrectBoardName, setIsCorrectBoardName] = useState(null);
    const [boardNameErrorMessage, setBoardNameErrorMessage] = useState(null);

    const { createBoard } = api();
    const { validationNotEmpty } = useValidation();

    const handleSetValue = (setValue, value) => {
        // Todo:убрать ошибку после продолжения
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

    const handleBlurBoardName = () => {
        return handleBlur(
            boardName,
            validationNotEmpty,
            isCorrectBoardName,
            setIsCorrectBoardName,
            setBoardNameErrorMessage,
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createBoard(workspace.id, { name: boardName })
            .then(res => {
                navigate(`/workspaces/${workspace}/board/${res.data.id}`)
            })
    }

    return (
        <BaseLayout title="Создайте рабочую доску">
            <StyledFrom onSubmit={handleSubmit}>
                <StyledInputWrapper>
                    <Input
                        label="Название доски"
                        value={boardName}
                        setValue={(value) => handleSetValue(setBoardName, value)}
                        success={isCorrectBoardName === null ? false : isCorrectBoardName}
                        error={isCorrectBoardName === null ? false : !isCorrectBoardName}
                        errorMessage={boardNameErrorMessage}
                        onBlur={handleBlurBoardName}
                    />
                </StyledInputWrapper>
                <Button
                    label="Создать"
                    variant='primary'
                    onClick={handleSubmit}
                />
            </StyledFrom>
        </BaseLayout>
    );
};

export default BoardCreatePage;
