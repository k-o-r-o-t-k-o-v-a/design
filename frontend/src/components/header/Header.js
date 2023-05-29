import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { setWorkspace } from '../../redux/slices/workspacesSlice';

import Notification from '../notification/Notification';

import logo from '../../assets/icons/logo.svg';
import themeIcon from '../../assets/icons/theme.svg';
import notificationIcon from '../../assets/icons/notification.svg';
import { useState } from 'react';

const StyledHeader = styled.header`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100vw;
	height: 40px;
	padding: 0 16px;
	background: ${props => props.theme.colors.neutral10};
`;

const StyledLeft = styled.div`
	flex: 0 0 224px;
`;

const StyledLogo = styled.div`
	display: inline-block;
	height: 16px;
	margin: 8px 0 0;
	cursor: pointer;
`;

const StyledLogoImg = styled.img`
	width: 100%;
	height: 100%;
`

const StyledRight = styled.div`
	flex: 0 1 calc(100% - 72px);
	display: flex;
	align-items: center;
	justify-content: end;
	gap: 10px;
`;

const StyledProfile = styled(Link)`
	display: flex;
	align-items: center;
	height: 32px;
	margin: 4px 0;
	border-radius: 4px;
	cursor: pointer;

	background: ${props => props.theme.colors.primary0};
`;

const StyledAvatar = styled.div`
	width: 32px;
	height: 32px;
	padding: 2px;
	border-radius: 4px;
`;

const StyledAvatarImg = styled.img`
	width: 100%;
	height: 100%;
`;

const StyledAvatarShort = styled.div`
	border-radius: 4px;
	width: 100%;
	height: 100%;
	font-size: 14px;
	font-weight: 700;
	text-align: center;
	padding: 5px 0;
	color: ${props => props.theme.colors.primary60};
	background: ${props => props.theme.colors.secondary20};
`;

const StyledUserName = styled.span`
	margin: 0 8px 0 6px;
	color: ${props => props.theme.colors.primary80};
`;

const StyledTheme = styled.div`
	width: 20px;
	height: 20px;
	cursor: pointer;
`;

const StyledThemeIcon = styled.img`
	width: 100%;
	height: 100%;
`;

const StyledNotification = styled.div`
	margin: -1px 0 0;
	width: 23px;
	height: 23px;
`;

const StyledNotificationIcon = styled.img`
	width: 100%;
	height: 100%;
	cursor: pointer;
`;

const Header = () => {
	const navigate = useNavigate();

	const { user } = useSelector(state => state.userSlice);

	const [notificationOpen, setNotificationOpen] = useState(false);

	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(setWorkspace());
		navigate('/workspaces');
	}

	return (
		<StyledHeader>
			<StyledLeft>
				<StyledLogo onClick={handleClick}>
					<StyledLogoImg
						src={logo}
						alt="Avatar"
					/>
				</StyledLogo>
			</StyledLeft>
			<StyledRight>
				<StyledNotification>
					<StyledNotificationIcon
						src={notificationIcon}
						alt="Тема"
						onClick={() => setNotificationOpen(notificationOpen => !notificationOpen)}
					/>
					{notificationOpen &&
						<Notification setClose={() => setNotificationOpen(false)} />
					}
				</StyledNotification>
				<StyledTheme onClick={() => navigate('/theme')}>
					<StyledThemeIcon
						src={themeIcon}
						alt="Тема"
					/>
				</StyledTheme>
				<StyledProfile to="/user">
					<StyledAvatar>
						{user?.avatar ?
							<StyledAvatarImg
								src={user?.avatar}
								alt="Avatar"
							/> :
							<StyledAvatarShort>
								{`${user?.username}`.slice(0, 1).toUpperCase()}
							</StyledAvatarShort>
						}
					</StyledAvatar>
					<StyledUserName>
						{user?.username}
					</StyledUserName>
				</StyledProfile>
			</StyledRight>
		</StyledHeader>
	);
};

export default Header;