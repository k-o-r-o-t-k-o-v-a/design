import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import arrowIcon from '../../assets/icons/textEditor/arrow.svg';

const StyledSelect = styled.div`
	position: relative;
	display: block;
`;

const StyledValue = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
  /* padding: 6px 10.4px 6px 22px; */
	background: ${props => props.theme.colors.primary0};
  /* border: 2px solid ${props => props.theme.colors.primary20}; */
  border-radius: 22px;
  cursor: pointer;
	
	border-radius: 0;
	border: 1px solid ${props => props.theme.colors.primary20};
	/* height: 48px; */
`;

const StyledValueText = styled.span`
	overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
	font-family: 'Montserrat';
	font-weight: 600;
	/* font-weight: 400; */
	font-size: 14px;
	line-height: 16px;
	color: ${props => props.theme.colors.info90};
`;

const StyledValueIcon = styled.img`
	width: 12px;
	height: 12px;
`

const StyledDropdown = styled.div`
	overflow: hidden;
	position: absolute;
  top: calc(100% + 5px);
  left: 0;
  right: 0;
	max-height: 76px;
  overflow-y: auto;
	border-top: 8px solid ${props => props.theme.colors.primary0};
	border-bottom: 8px solid ${props => props.theme.colors.primary0};
	background: ${props => props.theme.colors.primary0};
	box-shadow: 0px 4px 8px -2px rgba(147, 147, 163, 0.24), 0px 1px 4px -1px rgba(147, 147, 163, 0.08);
	border-radius: 4px;

	/* кастомный скролл */
	scroll-behavior: smooth;
	scrollbar-width: 4px;
	border-radius: 2px;
  scrollbar-color: ${props => props.theme.colors.primary80};

  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.primary80};
    border-radius: 2px;
  }
`;

const StyledOptionItem = styled.span`
	display: block;
	overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
	font-family: 'Montserrat';
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	padding: 0 12px;
	color: ${props => props.theme.colors.primary80};
	cursor: pointer;

  &:hover {
		background-color: ${props => props.theme.colors.primary10};
  }
`;


const TextEditorSelect = ({ defaultValue, options, onChange }) => {
	const selectRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(defaultValue);

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, []);

	const handleClickOutside = (event) => {
		if (selectRef.current && !selectRef.current.contains(event.target)) {
			setIsOpen(false);
		}
	};


	const handleSelectOption = (option) => {
		setIsOpen(false);
		setSelectedOption(option);
		onChange(option);
	};

	return (
		<StyledSelect ref={selectRef}>
			<StyledValue onClick={() => setIsOpen(!isOpen)}>
				<StyledValueText>{selectedOption.label}</StyledValueText>
				<StyledValueIcon src={arrowIcon} alt="icon" />
			</StyledValue>
			{isOpen && (
				<StyledDropdown>
					{options.map((option) => (
						<StyledOptionItem
							key={option.value}
							onClick={() => handleSelectOption(option)}>
							{option.label}
						</StyledOptionItem>
					))}
				</StyledDropdown>
			)}
		</StyledSelect>
	);
};

export default TextEditorSelect;