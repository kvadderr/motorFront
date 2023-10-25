import { Button, Flex, Progress, Layout, Tree } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { setCurrentFranchisor, setCurrentFranchisee, setCurrentEmployee } from '../../../store/slices/authSlice';
import { selectCurrentUser, selectCurrentFranchisor, selectCurrentFranchisee } from '../../../store/slices/authSlice';

import FranchisorSection from '../../../components/Sidebar/FranchisorSection';
import AdminSection from '../../../components/Sidebar/AdminSection';

import { useAppSelector } from '../../../store/storeHooks';
import { useGetMeQuery } from '../../../api/franchaisor';
import { useGetMeAtFranchiseeQuery } from '../../../api/franchaisee';

import { treeData } from '../../../constants/catalogTreeData';
import { allowedRolesAdmin, allowedRolesFranchaisee, allowedRolesFranchaisor } from '../../../constants/allowedRoles';
import { ROLE } from '../../../@types/entities/Role';

const { Sider } = Layout;
const { DirectoryTree } = Tree;


const FranchiseeSection = () => {
    return (
        <Button icon={<UsergroupAddOutlined />} type="primary" size='middle' style={{ textAlign: 'start' }}>Мои сотрудники</Button>
    )
}

const SideBar = () => {
    const me = useAppSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const role = me?.role || ROLE.EMPLOYEE;

    const currentFranchisor = useAppSelector(selectCurrentFranchisor);
    const currentFranchisee = useAppSelector(selectCurrentFranchisee);

    const { data: getMeAtFranchisee } = useGetMeAtFranchiseeQuery();
    const { data: getMeAtFranchisor } = useGetMeQuery();


    useEffect(() => {
        role === ROLE.FRANCHISOR && dispatch(setCurrentFranchisor(getMeAtFranchisor?.id));
        role === ROLE.FRANCHISEE && dispatch(setCurrentFranchisee(getMeAtFranchisee?.id))
        role === ROLE.EMPLOYEE && dispatch(setCurrentEmployee(me?.id));
    }, [])

    return (
        <Sider width={350} theme='light' style={{ padding: 40 }}>
            <Flex vertical justify='space-between' style={{ minHeight: '100%' }}>
                <Flex vertical gap={20}>
                    { allowedRolesAdmin.includes(role) && <AdminSection /> }
                    { allowedRolesFranchaisor && currentFranchisor && <FranchisorSection /> }
                    <DirectoryTree multiple defaultExpandAll treeData={treeData}/>
                </Flex>
                <Flex vertical gap={10}>
                    { allowedRolesFranchaisee.includes(role) && currentFranchisee && <FranchiseeSection /> }
                    <Progress percent={66} />
                    <p>Использовано 10 ГБ из 15 ГБ</p>
                </Flex>
            </Flex>
        </Sider>
    )
}

export default SideBar