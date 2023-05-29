import styled from "styled-components";

const StyledError = styled.div`
	display: block;
	padding: 12px;
	border-radius: 4px;
	background: ${props => props.theme.colors.danger40};
`;

const StyledErrorText = styled.p`
	font-family: "Montserrat";
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	color: ${props => props.theme.colors.primary60};
`;

const Error = ({ text }) => {
	return (
		<StyledError>
			<StyledErrorText>{text}</StyledErrorText>
		</StyledError>
	);
};

export default Error;