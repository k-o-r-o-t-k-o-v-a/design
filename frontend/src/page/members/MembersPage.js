import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";

import { api } from "../../services/api";
import { removeMemberById } from "../../redux/slices/membersSlice";

import Button from "../../components/buttons/button/Button";
import Table from "../../components/table/Table";
import BaseLayout from "../../layout/BaseLayout";

import settingsIcon from './../../assets/icons/settings.svg';

const StyledCustomWrapperBtn = styled.div`
	display: flex;
	justify-content: end;
	margin: 32px 0 0;
`;

const StyledCustomSection = styled.div`
	margin: 32px 0 0;
`;

const tableFields = [
	{ fieldName: 'username', text: 'Имя пользователя' },
	{ fieldName: 'first_name', text: 'Фамилия' },
	{ fieldName: 'last_name', text: 'Имя' },
	{ fieldName: 'memberRole', text: 'Роль' },
	{ fieldName: 'button', img: { icon: settingsIcon, alt: 'Действия' } }
];

const MembersPage = () => {
	const navigate = useNavigate()
	const { workspaceId } = useParams();

	const { user } = useSelector(state => state.userSlice);
	const { members } = useSelector(state => state.membersSlice);
	const { memberRole } = useSelector(state => state.workspacesSlice);

	const { deleteMember } = api();

	const dispatch = useDispatch();

	const formattingData = (data) => {
		let isDisabledButton = false;
		if (memberRole === 'user') isDisabledButton = true;

		return data.map(item => {
			return {
				...item,
				button:
					<Button
						label="Удалить"
						disabled={user?.id === item.id || isDisabledButton}
						variant="primary"
						onClick={() => {
							deleteMember(workspaceId, item.id)
							dispatch(removeMemberById(item.id))
							// .then((res) => )
						}}
					/>
			}
		});
	}

	const formattedData = formattingData(members);

	return (
		<BaseLayout title="Участники">
			<StyledCustomWrapperBtn>
				{memberRole === 'admin' && <Button
					label="Пригласить"
					variant='primary'
					onClick={() => navigate(`/workspaces/${workspaceId}/members/invitation`)}
				/>}
			</StyledCustomWrapperBtn>
			<StyledCustomSection>
				<Table
					fields={tableFields}
					data={formattedData}
				/>
			</StyledCustomSection>
		</BaseLayout>
	);
};

export default MembersPage;