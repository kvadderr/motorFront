import { Button } from 'antd';
import { FolderAddOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../store/storeHooks';
import { setShowAdminMode  } from '../../store/slices/modal';

const AdminSection = () => {

    const dispatch = useAppDispatch();

    const showModal = () => dispatch(setShowAdminMode(true));

    return (
        <>
            <Button onClick={showModal} icon={<FolderAddOutlined />} type="primary" size='middle' style={{ textAlign: 'start' }}>Сменить рабочее пространство</Button>
        </>
    )
}

export default AdminSection;