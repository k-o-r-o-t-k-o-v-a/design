import styled from 'styled-components';

import Card from './Card';

const StyledCustomH2 = styled.h2`
	font-family: 'Montserrat';
	font-weight: 600;
	font-size: 14px;
	line-height: 16px;
	color: ${props => props.theme.colors.primary100};
`

export default {
	title: 'Card',
	component: Card,
	tags: ['autodocs'],
};

export const Primary = {
	name: 'Primary Label',
	args: {
		cursor: 'pointer',
		children: <StyledCustomH2>Проект "X"</StyledCustomH2>,
	},
};
