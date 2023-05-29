import styled from 'styled-components';

const StyledCard = styled.div`
	width: 132px;
	height: 96px;
	padding: 16px;
	background: ${props => props.theme.colors.primary0};
	box-shadow: 0px 8px 24px -8px rgba(147, 147, 163, 0.48), 0px 2px 8px -2px rgba(147, 147, 163, 0.24);
	border-radius: 4px;
	cursor: ${props => props.cursor};
`;

const Card = ({ onClick, cursor, children }) => {
	return (
		<StyledCard
			cursor={cursor}
			onClick={onClick}
		>
			{children}
		</StyledCard>
	);
};

export default Card;