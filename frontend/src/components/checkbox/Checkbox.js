import { useState } from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

import iconCheckLine from './../../assets/icons/check-line.svg';

const StyledCheckbox = styled.div`
	width: 16px;
	height: 16px;
	border-radius: 2px;
	cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`

const StyledIcon = styled.div`
	width: 100%;
	height: 100%;
	mask-size: 100%;
	mask-position: center;
	mask-image: url('${iconCheckLine}');
	mask-repeat: no-repeat;
`;

const StyledCheckboxDefault = styled(StyledCheckbox)`
	background: ${props => props.disabled ?
		props.theme.colors.primary10 :
		props.theme.colors.primary0
	};
	border: 2px solid ${props => props.theme.colors.primary20};
	
	:hover > div {
		background: ${props => props.disabled ?
		props.theme.colors.primary10 :
		props.theme.colors.primary20
	}
	}

	:active > div {
		background: ${props => props.disabled ?
		props.theme.colors.primary10 :
		props.theme.colors.primary0
	};
	}
`;

const StyledCheckboxActive = styled(StyledCheckbox)`
	background: ${props => props.disabled ?
		props.theme.colors.primary0 :
		props.theme.colors.succsess60
	};
	border: 2px solid ${props => props.disabled ?
		props.theme.colors.primary20 :
		props.theme.colors.succsess60
	};

	> div {
		background: ${props => props.disabled ?
		props.theme.colors.primary20 :
		props.theme.colors.primary0
	};
	} 

	:hover {
		background: ${props => props.disabled ?
		props.theme.colors.primary0 :
		props.theme.colors.succsess20
	};
		border: 2px solid ${props => props.disabled ?
		props.theme.colors.primary20 :
		props.theme.colors.succsess20
	};
	}

	:active {
		background: ${props => props.disabled ?
		props.theme.colors.primary0 :
		props.theme.colors.succsess60
	};
	border: 2px solid ${props => props.disabled ?
		props.theme.colors.primary20 :
		props.theme.colors.succsess60
	};
	}
`;

const Checkbox = ({ defaultActive, disabled, onChange }) => {
	const [active, setActive] = useState(defaultActive);

	const handleClick = (value) => {
		if (!disabled) {
			setActive(value);
			onChange(value);
		}
	};

	return active ?
		<StyledCheckboxActive
			disabled={disabled}
			onClick={() => handleClick(false)}
		>
			<StyledIcon />
		</StyledCheckboxActive>
		:
		<StyledCheckboxDefault
			disabled={disabled}
			onClick={() => handleClick(true)}
		>
			<StyledIcon />
		</StyledCheckboxDefault>;
};

Checkbox.propTypes = {
	defaultActive: PropTypes.bool,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
};

Checkbox.defaultProps = {
	defaultActive: false,
	disabled: false,
	onChange: () => { }
};


export default Checkbox;