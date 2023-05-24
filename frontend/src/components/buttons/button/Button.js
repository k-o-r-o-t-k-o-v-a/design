import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
	display: flex;
	align-items: center;
	flex-direction: ${props => {
		if (props.icon && props.iconVariant === 'right') return 'row-reverse';
	}};
	padding: ${props => {
		if (props.label && props.icon && props.iconVariant === 'left') return '6px 22px 6px 18px';
		if (props.label && props.icon && props.iconVariant === 'right') return '6px 18px 6px 22px';
		if (!props.label && props.icon) return '10px';
		return '6px 22px';
	}};
	gap: ${props => {
		if (props.icon && props.label) return '10px';
	}};
	border-radius: 22px;
	box-sizing: border-box;
	background: ${props => {
		if (props.variant === 'primary') return props.theme.colors.primary80;
		if (props.variant === 'secondary') return props.theme.colors.primary0;
		if (props.variant === 'gost') return 'transparent';
	}};
	border: 2px solid ${props => {
		if (props.variant === 'primary') return 'transparent';
		if (props.variant === 'secondary') return props.theme.colors.primary20;
		if (props.variant === 'gost') return 'transparent';
	}};
	cursor: pointer;

	&:hover {
		background: ${props => {
			if (props.variant === 'primary') return props.theme.colors.primary50;
			if (props.variant === 'secondary') return 'transparent';
			if (props.variant === 'gost') return props.theme.colors.primary20;
		}};
		border: 2px solid ${props => {
			if (props.variant === 'primary') return 'transparent';
			if (props.variant === 'secondary') return props.theme.colors.primary40;
			if (props.variant === 'gost') return 'transparent';
		}};
	}

	&:active {
		background: ${props => {
			if (props.variant === 'primary') return props.theme.colors.primary100;
			if (props.variant === 'secondary') return props.theme.colors.primary20;
			if (props.variant === 'gost') return props.theme.colors.primary20;
		}};
		border: 2px solid ${props => {
			if (props.variant === 'primary') return props.theme.colors.primary80;
			if (props.variant === 'secondary') return 'transparent';
			if (props.variant === 'gost') return 'transparent';
		}};
	}

	&:disabled {
		background: ${props => {
			if (props.variant === 'primary') return props.theme.colors.primary20;
			if (props.variant === 'secondary') return props.theme.colors.primary10;
			if (props.variant === 'gost') return 'transparent';
		}};
		border: 2px solid ${props => {
			if (props.variant === 'primary') return 'transparent';
			if (props.variant === 'secondary') return props.theme.colors.primary20;
			if (props.variant === 'gost') return 'transparent';
		}};
		cursor: not-allowed;
	}
`;

const StyledText = styled.span`
	font-family: 'Montserrat';
	font-weight: 400;
	font-size: 14px;
	line-height: 16px;
	color: ${props => {
		if (props.variant === 'primary') return props.theme.colors.primary0;
		if (props.variant === 'secondary') return props.theme.colors.primary90;
		if (props.variant === 'gost') return props.theme.colors.primary90;
	}};
	${StyledButton}:disabled & {
		color: ${props => {
			if (props.variant === 'primary') return props.theme.colors.primary0;
			if (props.variant === 'secondary') return props.theme.colors.primary40;
			if (props.variant === 'gost') return props.theme.colors.primary40;
		}};
	}
`

const StyledIcon = styled.div`
	width: 11.3px;
	height: 11.3px;
	mask-size: 100%;
	mask-position: center auto;
	mask-image: url(${props => props.icon});
	mask-repeat: no-repeat;
	background: ${props => {
		if (props.variant === 'primary') return props.theme.colors.primary0;
		if (props.variant === 'secondary') return props.theme.colors.primary90;
		if (props.variant === 'gost') return props.theme.colors.primary90;
	}};
	${StyledButton}:disabled & {
		background: ${props => {
			if (props.variant === 'primary') return props.theme.colors.primary0;
			if (props.variant === 'secondary') return props.theme.colors.primary40;
			if (props.variant === 'gost') return props.theme.colors.primary40;
		}};
	}
`

const Button = (props) => {
	return (
		<StyledButton
			type="button"
			{...props}
		>
			{props.icon &&
				<StyledIcon
					icon={props.icon}
					variant={props.variant}
				/>
			}
			<StyledText
				variant={props.variant}
			>
				{props.label}
			</StyledText>
		</StyledButton>
	);
};

Button.propTypes = {
	variant: PropTypes.oneOf(['primary', 'secondary', 'gost']).isRequired,
	disabled: PropTypes.bool,
	icon: PropTypes.string,
	iconVariant: PropTypes.oneOf(['left', 'right']),
	label: PropTypes.string,
	onClick: PropTypes.func,
};

Button.defaultProps = {
	disabled: false,
	icon: undefined,
	iconVariant: 'left',
	label: undefined,
	onClick: undefined,
};

export default Button;
