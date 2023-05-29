import { useState } from 'react';
import styled from 'styled-components';

import arrowDownSvg from '../../assets/icons/arrowDown.svg';

const StyledAccordion = styled.div`
	margin: 16px 0 0;
`;

const StyledAccordionHead = styled.div`
	padding: 12px 14px;
	display: flex;
	width: 100%;
	align-items: center;
	gap: 14px;
	height: 48px;
	border-radius: 4px;
	cursor: pointer;
	background: ${props => props.theme.colors.neutral10};
`;

const StyledAccordionHeadIcon = styled.span`
	width: 16px;
	height: 16px;
	transform: ${props => props.open ? 'none' : 'rotate(-90deg)'};
`;

const StyledAccordionHeadIconImg = styled.img`
	width: 100%;
	height: 100%;
	margin: 1px 0 0;
`;

const StyledAccordionHeadName = styled.span`
	font-family: 'Montserrat';
	font-weight: 400;
	font-size: 16px;
	line-height: 20px;
	user-select: none;
	color: ${props => props.theme.colors.primary80};
`;

const StyledAccordionBody = styled.div`
	display: ${props => props.open ? 'block' : 'none'};
	padding: 16px 0 0;
`;

const Accordion = ({ name, children }) => {
	const [open, setOpen] = useState(true);

	const toggleOpen = () => {
		setOpen(open => !open)
	}

	return (
		<StyledAccordion>
			<StyledAccordionHead
				open={open}
				onClick={toggleOpen}
			>
				<StyledAccordionHeadIcon open={open}>
					<StyledAccordionHeadIconImg
						src={arrowDownSvg}
						alt={name}
					/>
				</StyledAccordionHeadIcon>
				<StyledAccordionHeadName>
					{name}
				</StyledAccordionHeadName>
			</StyledAccordionHead>
			<StyledAccordionBody open={open}>
				{children}
			</StyledAccordionBody>
		</StyledAccordion >
	);
};

export default Accordion;