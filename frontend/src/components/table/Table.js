import { useEffect } from "react";
import styled from "styled-components";

const StyledTable = styled.table`
	width: 100%;
	border-spacing: 0;
`;

const StyledTableHead = styled.thead`
	th {
		background: ${props => props.theme.colors.neutral10};
	}
`;

const StyledTableBody = styled.tbody``;

const StyledTableRow = styled.tr`
	height: 44px;
	> th, > td {
		&:first-child {
			border-top-left-radius: 8px;
			border-bottom-left-radius: 8px;
		}
		&:last-child {
			border-top-right-radius: 8px;
			border-bottom-right-radius: 8px;
		}
	}
`;

const StyledTableHeadItem = styled.th`
	text-align: left;
	font-family: 'Montserrat';
	font-weight: 400;
	font-size: 14px;
	line-height: 16px;
	padding: 12px 16px;
`;

const StyledTableBodyItem = styled.td`
	font-family: 'Montserrat';
	font-weight: 400;
	font-size: 14px;
	line-height: 16px;
	padding: 5px 16px;
	color: ${props => props.theme.colors.neutral90};

	&:last-child > button {
		margin: 0 0 0 auto;
	}

	${StyledTableRow}:hover && {
		background: ${props => props.theme.colors.neutral10};
	}
`;

const StyledTableHeadIcon = styled.img`
	display: block;
	width: 19px;
	height: 19px;
	margin: 0 0 0 auto;
`;

const Table = ({ fields, data }) => {
	return (
		<StyledTable>
			<StyledTableHead>
				<StyledTableRow>
					{fields.map(({ fieldName, text, img }) =>
						<StyledTableHeadItem key={fieldName}>
							{text ||
								<StyledTableHeadIcon
									src={img.icon}
									alt={img.alt}
								/>
							}
						</StyledTableHeadItem>
					)}
				</StyledTableRow>
			</StyledTableHead>
			<StyledTableBody>
				{data.map((item) =>
					<StyledTableRow key={item.id}>
						{fields.map(({ fieldName }) =>
							<StyledTableBodyItem key={`cell-${fieldName}`}>
								{item[fieldName]}
							</StyledTableBodyItem>
						)}
					</StyledTableRow>
				)}
			</StyledTableBody>
		</StyledTable>
	);
};

export default Table;