import { useSelector } from 'react-redux';
import BaseLayout from '../../layout/BaseLayout';
import { useEffect } from 'react';

const WorkspacesItemPage = () => {
    const { workspaces } = useSelector(state => state.workspacesSlice);

    useEffect(() => {
        console.log(workspaces)
    })

    return (
        <BaseLayout title={workspaces?.name}>
        </BaseLayout >
    );
};

export default WorkspacesItemPage;
