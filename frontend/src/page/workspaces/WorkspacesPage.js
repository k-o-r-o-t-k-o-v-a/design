import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Card from '../../components/card/Card';
import Title from '../../components/title/Title';

const StyledCards = styled.div`
	display: flex;
	gap: 24px;
	margin: 24px 0 0;
`;

const StyledCreateCardText = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	height: 100%;
	vertical-align: middle;
`

const WorkspacesPage = () => {
    const navigate = useNavigate();

    const { workspaces } = useSelector(state => state.workspacesSlice);

    return (
        <>
            <Title text="Рабочие пространства" />
            <StyledCards>
                <Card
                    cursor="pointer"
                    onClick={() => navigate('/workspaces/create')}
                >
                    <StyledCreateCardText>
                        Создать
                    </StyledCreateCardText>
                </Card>
                {workspaces.map((item) =>
                    <Card
                        key={item.id}
                        cursor="pointer"
                        onClick={() => navigate(`/workspaces/${item.id}`)}
                    >
                        {item.name}
                    </Card>
                )}
            </StyledCards>
        </>
    );
};

export default WorkspacesPage;
