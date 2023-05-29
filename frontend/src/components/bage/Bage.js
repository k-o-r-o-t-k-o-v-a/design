import styled from 'styled-components';
import { PropTypes } from 'prop-types';

const StyledBage = styled.div`
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 4px 8px;

	border: 1px solid ${props => {
		if (props.variant === 'success')
			return props.theme.colors.succsess10;
		if (props.variant === 'info')
			return props.theme.colors.info10;
		if (props.variant === 'warning')
			return props.theme.colors.warning10;
		return props.theme.colors.primary20;
	}};
	background: ${props => {
		if (props.variant === 'success')
			return props.theme.colors.succsess10;
		if (props.variant === 'info')
			return props.theme.colors.info10;
		if (props.variant === 'warning')
			return props.theme.colors.warning10;
		return props.theme.colors.primary10;
	}};

	border-radius: 4px;
`;

const StyledPoint = styled.div`
	width: 8px;
	height: 8px;
	background: ${props => {
		if (props.variant === 'success')
			return props.theme.colors.succsess60;
		if (props.variant === 'info')
			return props.theme.colors.info60;
		if (props.variant === 'warning')
			return props.theme.colors.warning60;
		return props.theme.colors.primary40;
	}};
	border-radius: 4px;
`;

const StyledText = styled.div`
	font-family: 'Montserrat';
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	color: ${props => props.theme.colors.primary100};
`;

const Bage = ({ variant, label }) => {
	return (
		<StyledBage variant={variant} >
			<StyledPoint variant={variant} />
			<StyledText>{label}</StyledText>
		</StyledBage>
	);
};

Bage.propTypes = {
	variant: PropTypes.oneOf(['primary', 'success', 'info', 'warning']).isRequired,
	label: PropTypes.string.isRequired,
};

export default Bage;