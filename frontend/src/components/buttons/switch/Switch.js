import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledSwitch = styled.div`
	display: inline-flex;
	width: auto;
	align-items: center;
	padding: 2px;
	gap: 2px;
	border-radius: 90px;
	box-sizing: border-box;
	background: ${props => props.theme.colors.primary0};
	border: 2px solid ${props => props.theme.colors.primary20};
`

const StyledButton = styled.button`
	padding: ${props => props.variant === 'text' ? '8px 24px' : '9.67px'};
	background: ${props => props.active ?
		props.theme.colors.primary80 :
		'transparent'
	};
	border-radius: 22px;
	cursor: ${props => props.active ? 'default' : 'pointer'};

	&:hover {
		background: ${props => props.active ?
			props.theme.colors.primary80 :
			props.theme.colors.primary10
		};
	}
`

const StyledText = styled.span`
	font-family: 'Montserrat';
	font-weight: 400;
	font-size: 14px;
	line-height: 16px;
	color: ${props => props.active ?
		props.theme.colors.primary0 :
		props.theme.colors.primary90
	};
`

const StyledIcon = styled.div`
	width: 12px;
	height: 12px;
	mask-size: 100%;
	mask-position: center;
	mask-image: url(${props => props.icon});
	mask-repeat: no-repeat;
	background: ${props => props.active ?
		props.theme.colors.primary0 :
		props.theme.colors.primary80
	};
`

const Switch = ({ variant, icons, labels, acvieItem, onSwitch }) => {
	const [activeItem, setActiveItem] = useState(acvieItem === 'second' || 'first');

	const handleSwitch = (item) => {
		if (item !== activeItem) {
			onSwitch(item);
			setActiveItem(item);
		}
	};

	return (
		<StyledSwitch>
			<StyledButton
				variant={variant}
				active={activeItem === 'first'}
				onClick={() => handleSwitch('first')}
			>
				{variant === 'text' ?
					<StyledText active={activeItem === 'first'}>
						{labels?.[0]}
					</StyledText>
					:
					<StyledIcon
						active={activeItem === 'first'}
						icon={icons?.[0]}
					/>
				}
			</StyledButton>
			<StyledButton
				variant={variant}
				active={activeItem === 'second'}
				onClick={() => handleSwitch('second')}
			>
				{variant === 'text' ?
					<StyledText active={activeItem === 'second'}>
						{labels?.[1]}
					</StyledText> :
					<StyledIcon
						active={activeItem === 'second'}
						icon={icons?.[1]}
					/>
				}
			</StyledButton>
		</StyledSwitch>
	);
};

Switch.propTypes = {
	variant: PropTypes.oneOf(['text', 'icon']).isRequired,
	icons: PropTypes.arrayOf(PropTypes.string),
	labels: PropTypes.arrayOf(PropTypes.string),
	acvieItem: PropTypes.oneOf(['first', 'second']),
	onSwitch: PropTypes.func,
};

Switch.defaultProps = {
	icons: undefined,
	labels: undefined,
	onSwitch: () => { },
};


export default Switch;
