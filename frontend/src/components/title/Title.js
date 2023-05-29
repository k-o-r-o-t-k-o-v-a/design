import styled from 'styled-components';

const StyledH1 = styled.h1`
	font-family: 'Montserrat';
	font-weight: 600;
	font-size: 30px;
	line-height: 40px;
	color: ${props => props.theme.colors.primary100};
`

const Title = ({ text }) => {
	return <StyledH1>{text}</StyledH1>
};

export default Title;