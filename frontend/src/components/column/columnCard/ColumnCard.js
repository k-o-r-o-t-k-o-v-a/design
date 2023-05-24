import styled from "styled-components";

const StyledColumnCard = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 12px;
	padding: 12px;
	border: 1px solid ${props => props.theme.colors.primary50};
	background: ${props => props.theme.colors.primary10};
	border-radius: 8px;
	cursor: pointer;
`;

const ColumnCard = ({
                        task,
                    }) => {
    return (
        <StyledColumnCard>
            {task.title}
        </StyledColumnCard>
    );
};

export default ColumnCard;
