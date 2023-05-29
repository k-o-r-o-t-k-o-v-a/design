import styled from 'styled-components';
import { PropTypes } from 'prop-types';


const StyledTab = styled.ul`
	display: inline-flex;
	flex-direction: row;
	/* align-items: center; */
	align-items: stretch;
	gap: ${props => props.variant === 'primary' ? '24px' : '4px'};
	border-bottom: ${props =>
		props.variant === 'primary' ?
			`2px solid ${props.theme.colors.primary20}` :
			'none'
	};
`;

const StyledItem = styled.li`
	display: flex;
	flex-direction: column;
	align-items: center;

	position: relative;
	font-family: 'Montserrat';
	font-weight: 400;
	font-size: 14px;
	line-height: ${props => props.variant === "primary" ? "20px" : "16px"};
	padding: ${props => props.variant === "primary" ? "0 0 10px 0" : "8px 12px"};
	color: ${props => props.theme.colors.primary100};
	border-radius: ${props => props.variant === "primary" ? 'none' : '8px'};
	background: ${props => {
		if (props.variant === 'primary')
			return 'transparent';
		if (props.variant === 'secondary' && props.active)
			return props.theme.colors.succsess10;
		return props.theme.colors.transparent
	}};
	cursor: pointer;

	&:after {
		${props => props.variant === 'primary' && `
			content: ${props.active ? '""' : "none"};
			position: absolute;
			bottom: -2px;
			left: 0;
			width: 100%;
			height: 2px;
			background: ${props.theme.colors.succsess50};
			border-radius: 1px;
		`}
	}

	&:hover {
		${props => props.variant === 'secondary' && `
			background: ${props.active ?
			props.theme.colors.succsess10 :
			props.theme.colors.primary10
		};
		`}
		&:before {
			${props => props.variant === 'primary' && `
				content: ${props.active ? "none" : '""'};
				position: absolute;
				bottom: -2px;
				left: 0;
				width: 100%;
				height: 2px;
				background: ${props.theme.colors.primary40};
				border-radius: 1px;
			`}
		}
	}
`;


const Tab = ({ variant, tabList, activeItemId, onSetActiveItemId }) => {
	return (
		<StyledTab variant={variant}>
			{tabList?.map(({ id, name }) =>
				<StyledItem
					key={id}
					variant={variant}
					active={id === activeItemId}
					onClick={() => onSetActiveItemId(id)}
				>
					{name}
				</StyledItem>
			)}
		</StyledTab>
	);
};

Tab.propTypes = {
	variant: PropTypes.oneOf(['primary', 'secondary']).isRequired,
	tabList: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
	})).isRequired,
	activeItemId: PropTypes.number.isRequired,
	onSetActiveItemId: PropTypes.func,
};

export default Tab;