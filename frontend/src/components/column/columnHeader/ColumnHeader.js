import React from 'react';
import styled from 'styled-components';

import fixedIcon from './../../../assets/icons/fixed.svg';
import { PropTypes } from 'prop-types';

const StyledColumnHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px 12px;
	width: 284px;
	height: 40px;
	border-radius: 8px;
	cursor: pointer;
	background: ${props => props.theme.colors.primary10};
`;

const StyledWrapperLeft = styled.div`
	display: flex;
	align-items: center;
	gap: 10.69px;
`

const StyledTitle = styled.span`
	display: block;
	font-family: 'Montserrat';
	font-weight: 600;
	font-size: 16px;
	line-height: 24px;
	color: ${props => props.theme.colors.primary80};
`;

const StyledIcon = styled.img`
	display: ${props => props.fixed ? 'block' : 'none'};
	width: 15.91px;
	height: 15.91px;
`

const StyledQuantity = styled.span`
	font-family: 'Montserrat';
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	color: ${props => props.theme.colors.primary70};
`;

const ColumnHeader = ({ title, fixed, quantity, ...provided }) => {
    return (
        <StyledColumnHeader {...provided}>
            <StyledWrapperLeft>
                <StyledTitle>{title}</StyledTitle>
                <StyledIcon
                    fixed={fixed}
                    src={fixedIcon}
                    alt="fixed"
                />
            </StyledWrapperLeft>
            <StyledQuantity>{quantity}</StyledQuantity>
        </StyledColumnHeader>
    );
};

ColumnHeader.propTypes = {
    title: PropTypes.string.isRequired,
    fixed: PropTypes.bool,
    quantity: PropTypes.number,
};

ColumnHeader.defaultProps = {
    fixed: false,
    quantity: undefined,
};

export default ColumnHeader;
