import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledRadio = styled.div`
	width: 16px;
	height: 16px;
	border-radius: 50%;
	border: 2px solid ${props => props.theme.colors.primary20};
	padding: 2px;
	background: ${props => {
		if (props.disabled && !props.checked)
			return props.theme.colors.primary10;
		return props.theme.colors.primary0;
	}};
	cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

	:hover {
		background: ${props => {
			if (props.disabled && !props.checked)
				return props.theme.colors.primary10;
			return props.theme.colors.primary0;
		}};
	}

	:active {
		padding: 2px;
		background: ${props => {
			if (props.disabled && !props.checked)
				return props.theme.colors.primary10;
			return props.theme.colors.primary0;
		}};
	}


	:hover > div {
		background: ${props => {
			if (props.checked && props.disabled)
				return props.theme.colors.primary20;
			if (props.checked && !props.disabled)
				return props.theme.colors.primary50;
			if (!props.checked && props.disabled)
				return props.theme.colors.primary10;
			return props.theme.colors.primary20;
		}};
	}

	:active > div {
		background: ${props => {
			if (props.checked && props.disabled)
				return props.theme.colors.primary20;
			if (!props.checked && props.disabled)
				return props.theme.colors.primary10;
			return props.theme.colors.primary0;
		}}
	}
`

const StyledChecked = styled.div`
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: ${props => {
		if (props.disabled && props.checked)
			return props.theme.colors.primary20;
		if (props.checked)
			return props.theme.colors.primary80;
		if (props.disabled)
			return props.theme.colors.primary10;
		return props.theme.colors.primary0
	}};
`

const Radio = ({ checked, disabled, onChange }) => {
	const handleClick = () => {
		if (!checked) {
			onChange();
		}
	}

	return (
		<StyledRadio
			checked={checked}
			disabled={disabled}
			onClick={handleClick}
		>
			<StyledChecked
				checked={checked}
				disabled={disabled}
			/>
		</StyledRadio>
	);
};

Radio.propTypes = {
	checked: PropTypes.bool.isRequired,
	disabled: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
};

Radio.defaultProps = {
	disabled: false,
}

export default Radio;
