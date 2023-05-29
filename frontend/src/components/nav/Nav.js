import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

import arrowDown from '../../assets/icons/arrowDown.svg';


const StyledLink = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 12px 18px;
	cursor: pointer;
	background: ${props => props.theme.colors.neutral10};

	:hover {
		background: ${props => props.theme.colors.neutral20};
	}
`;

const StyledLeft = styled.div`
	display: flex;
	gap: 10px;
	align-items: center;
`;

const StyledRight = styled(StyledLeft)`
	flex: 0 0 auto;
`;

const StyledLinkIcon = styled.div`
	flex: 0 0 auto;
	width: 16px;
	height: 16px;
	mask-size: 100%;
	mask-position: center auto;
	mask-image: url(${props => props.icon});
	mask-repeat: no-repeat;
	background: ${props => props.theme.colors.neutral30};
	
	${StyledLink}:hover & {
		background: ${props => props.theme.colors.neutral90};
	}
`;

const StyledLinkAdditional = styled.div`
	flex: 0 0 auto;
	width: 16px;
	height: 16px;
	mask-size: 100%;
	mask-position: center auto;
	mask-image: url(${props => props.icon});
	mask-repeat: no-repeat;
	background: ${props => props.theme.colors.neutral30};

	:hover {
		background: ${props => props.theme.colors.neutral90}
	}
`;

const StyledLinkText = styled.span`
	font-family: 'Montserrat';
	font-weight: 400;
	font-size: 14px;
	line-height: 16px;
	color: ${props => props.theme.colors.neutral90};
`;

const StyledNested = styled.ul`

	display: ${props => props.open ? 'block' : 'none'};
`;

const StyledNestedItem = styled.li`
	position: relative;
	padding: 12px 18px 12px 40px;
	font-family: 'Montserrat';
	font-weight: 400;
	font-size: 12px;
	line-height: 16px;
	cursor: pointer;
	color: ${props => props.theme.colors.primary60};
	background: ${props => props.theme.colors.neutral10};
	
	:hover {
		background: ${props => props.theme.colors.neutral20};
	}
`;

const StyledNestedIcon = styled.img`
	flex: 0 0 auto;
	transform: ${props => props.open ? 'rotate(0)' : 'rotate(-90deg)'};
`;

const StyledLinkAdditionalActive = styled.div`
	position: absolute;
	top: 17px;
	left: 24px;
	width: 8px;
	height: 8px;
	border-radius: 2px;
	background: ${props => props.theme.colors.succsess50};
`;

const Nav = ({ navLinks }) => {
	const navigate = useNavigate();

	const [openIndex, setOpenIndex] = useState(-1);

	const handleItemClick = (index) => {
		setOpenIndex(index === openIndex ? -1 : index);
	}

	const handleAdditionalLinkClick = (e, path) => {
		e.preventDefault();
		e.stopPropagation();

		navigate(path);
	}

	return (
		<nav>
			<ul>
				{navLinks.map(({ name, path, additionalLink, icon, nested }, index) =>
					<li key={name}>
						<StyledLink
							onClick={
								nested ?
									() => handleItemClick(index) :
									() => navigate(path)
							}
						>
							<StyledLeft>
								<StyledLinkIcon icon={icon} />
								<StyledLinkText>{name}</StyledLinkText>
							</StyledLeft>
							<StyledRight>
								{additionalLink &&
									<StyledLinkAdditional
										icon={additionalLink.icon}
										onClick={(e) => handleAdditionalLinkClick(e, additionalLink.path)}
									/>
								}
								{nested &&
									<StyledNestedIcon
										open={index === openIndex}
										src={arrowDown}
										alt="arrow"
									/>
								}
							</StyledRight>
						</StyledLink>
						{nested &&
							<StyledNested open={index === openIndex}>
								{nested.map(({ name, path, active }) =>
									<StyledNestedItem
										key={name}
										onClick={() => navigate(path)}
									>
										{active && <StyledLinkAdditionalActive />}
										{name}
									</StyledNestedItem>
								)}
							</StyledNested>
						}
					</li>
				)}
			</ul>
		</nav>
	);
};

Nav.propTypes = {
	links: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		path: PropTypes.string,
		additionalLink: PropTypes.shape({
			icon: PropTypes.string.isRequired,
			path: PropTypes.string.isRequired,
		}),
		icon: PropTypes.string.isRequired,
		nested: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string.isRequired,
			path: PropTypes.string.isRequired,
		}))
	})),
};

export default Nav;