import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

import closeIcon from '../../assets/icons/close.svg';
import successIcon from '../../assets/icons/success.svg';

const StyledBlock = styled.div`
	position: relative;
	border-radius: 4px;

	&:focus::after{
		content: ${props => props.disabled ? "none" : '""'};
		position: absolute;
		top: -3px;
		left: -3px;
		width: calc(100% + 6px);
		height: calc(48px + 6px);
		border-radius: 4px;
		border: 2px solid ${props => props.theme.colors.info40};
	}
`;

const StyledInput = styled.input`
	padding: 24px 40px 4px 12px;
	width: 100%;
	height: 48px;
	border-radius: 4px;
	background: ${props => props.theme.colors.primary0};
	border: 1px solid ${props => props.theme.colors.primary20};

	font-family: 'Montserrat';
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	color: ${props => props.theme.colors.primary80};

  ${(props) =>
		props.hasSuccess && `
		border: 1px solid ${props.theme.colors.succsess50};
  `}

	${(props) =>
		props.hasError && `
		border: 1px solid ${props.theme.colors.danger50};
  `}

  &:hover {
		border: 1px solid ${props => {
		if (props.hasError)
			return props.theme.colors.danger50;
		if (props.hasError)
			return props.theme.colors.danger50;
		if (props.length !== 0)
			return props.theme.colors.primary20;
		return props.theme.colors.primary40;
	}};
  }

	&:focus {
		border: 2px solid ${props => props.theme.colors.primary40};
		padding: 24px 40px 3px 11px;
	}

	&:disabled {
		background: ${props => props.theme.colors.primary10};
		border: 1px solid ${props => props.theme.colors.primary20};
	}
`;

const StyledLabel = styled.label`
	position: absolute;
	top: ${props => props.length === 0 ? '16px' : '4px'};
	left: 12px;
	z-index: 1;
	font-family: 'Montserrat';
	font-weight: 400;
	font-size: ${props => props.length === 0 ? '14px' : '12px'};
	line-height: 16px;
	pointer-events: none;
	color: ${props => props.theme.colors.primary50};
	transition: top 0.2s ease, font-size 0.2s ease;

	${StyledInput}:focus + && {
		top: 4px;
		font-size: 12px;
		transition: top 0.2s ease, font-size 0.2s ease;
	}
`;

const StyledIcon = styled.div`
	display: ${props => (
		props.hasError ||
		props.hasSuccess
	) ? 'block' : 'none'};
	${StyledBlock}:hover && {
		display: ${props => (
		props.hasError ||
		props.hasSuccess ||
		props.length
	) ? 'block' : 'none'};
	}
	${StyledInput}:focus + && {
		display: none;
	}
	position: absolute;
	top: 15px;
	right: 12px;
	width: 16px;
	height: 16px;
	margin: 1.33px;
	mask-size: 100%;
	mask-position: center auto;
	mask-image: url(${props => props.icon});
	mask-repeat: no-repeat;
	cursor: pointer;
	z-index: 2;
	background: ${props => {
		if (props.hasError)
			return props.theme.colors.danger50;
		if (props.hasSuccess)
			return props.theme.colors.succsess50;
		return props.theme.colors.primary50;
	}};
`;

const StyledErrorMessage = styled.div`	
	width: 100%;
	padding: 12px;
	background: ${props => props.theme.colors.primary0};
	box-shadow: 0px 4px 8px -2px rgba(147, 147, 163, 0.24), 0px 1px 4px -1px rgba(147, 147, 163, 0.08);
	border-radius: 4px;
`;

const StyledErrorMessageText = styled.span`
	display: block;
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 400;
	font-size: 12px;
	line-height: 16px;
	color: ${props => props.theme.colors.primary80};
`

const StyledErrorMessageTextDanger = styled(StyledErrorMessageText)`
	color: ${props => props.theme.colors.danger60};
`;

const Input = ({
	label,
	type,
	value,
	setValue,
	onBlur,
	success,
	error,
	errorMessage,
	disabled,
}) => {
	const inputRef = useRef(null);
	const [hasSuccess, setHasSuccess] = useState(success);

	useEffect(() => {
		if (success && !hasSuccess) {
			setHasSuccess(true);
		}
	}, [success]);

	useEffect(() => {
		if (hasSuccess) {
			const timeoutId = setTimeout(() => {
				setHasSuccess(false);
			}, 500);

			return () => clearTimeout(timeoutId);
		}
	}, [hasSuccess]);

	const handleClear = () => {
		if (error || value.length) {
			setValue('');
		}
	}

	return (
		<StyledBlock
			tabIndex={0}
			length={value.length}
			disabled={disabled}
		>
			<StyledInput
				ref={inputRef}
				type={type}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				length={value.length}
				disabled={disabled}
				hasError={error}
				hasSuccess={hasSuccess}
				onBlur={(e) => onBlur(e, value)}
			/>
			<StyledLabel length={value.length}>
				{label}
			</StyledLabel>
			{error &&
				<StyledErrorMessage
					tabIndex={-1}
				>
					<StyledErrorMessageTextDanger>
						{errorMessage?.title || 'Не корректно введены данные.'}
					</StyledErrorMessageTextDanger>
					<StyledErrorMessageText>
						{errorMessage?.hint || 'Попробуйте изменить значение.'}
					</StyledErrorMessageText>
				</StyledErrorMessage>
			}
			{!disabled && <StyledIcon
				tabIndex={-1}
				length={value.length}
				onClick={(e) => handleClear(e)}
				hasError={error}
				hasSuccess={hasSuccess}
				icon={hasSuccess ? successIcon : closeIcon}
				alt="icon"
			/>}
		</StyledBlock>
	);
};

Input.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.string,
	value: PropTypes.string,
	setValue: PropTypes.func,
	onBlur: PropTypes.func,
	success: PropTypes.bool,
	error: PropTypes.bool,
	errorMessage: PropTypes.string,
	disabled: PropTypes.bool,
};

Input.defaultProps = {
	type: 'text',
	value: '',
	setValue: () => { },
	onBlur: () => { },
	success: false,
	error: false,
	disabled: false,
};

export default Input;
