

import { Button, Select } from 'antd';
import { FolderAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/storeHooks';
import { setShowModal, setShowModalFranchiseeInvite  } from '../../store/slices/modal';
import { selectWorkspaceList } from '../../store/slices/workspace';


const FranchisorSection = () => {

    const dispatch = useAppDispatch();

    const workspaceList = useAppSelector(selectWorkspaceList);

    const showModal = () => dispatch(setShowModal(true));
    const showModalFranchiseeInvite = () => dispatch(setShowModalFranchiseeInvite(true));

    const handleChange = (value: number) => {
        
    };

    const workspaceData = workspaceList?.map((workspace) => ({label: workspace.name, value: workspace.id}));
    
    return (
        <>
            <Button onClick={showModal} icon={<FolderAddOutlined />} type="primary" size='middle' style={{ textAlign: 'start' }}>Создать рабочее пространство</Button>
            <Select
                style={{ width: '100%' }}
                onChange={handleChange}
                options={workspaceData}
            />
            <Button icon={<UsergroupAddOutlined />} type="primary" size='middle' style={{ textAlign: 'start' }}>Создать группу</Button>
            <Button onClick={showModalFranchiseeInvite} icon={<UsergroupAddOutlined />} type="primary" size='middle' style={{ textAlign: 'start' }}>Пригласить франчайзи</Button>
        </>
    )
}

export default FranchisorSection;