

import { Button, Flex, Progress, Layout, Tree } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import type { DataNode } from 'antd/es/tree';
import { useEffect } from 'react';
import { useAppSelector } from '../../../store/storeHooks';
import { selectCurrentUser, selectCurrentFranchisor, selectCurrentFranchisee } from '../../../store/slices/authSlice';
import { ROLE } from '../../../@types/entities/Role';
import { useDispatch } from 'react-redux';
import { setCurrentFranchisor, setCurrentFranchisee, setCurrentEmployee } from '../../../store/slices/authSlice';

import FranchisorSection from '../../../components/Sidebar/FranchisorSection';
import AdminSection from '../../../components/Sidebar/AdminSection';
import { allowedRolesAdmin, allowedRolesFranchaisee, allowedRolesFranchaisor } from '../../../constants/allowedRoles';

import { useGetMeQuery } from '../../../api/franchaisor';
import { useGetMeAtFranchiseeQuery } from '../../../api/franchaisee';
const { Sider } = Layout;
const { DirectoryTree } = Tree;



const treeData: DataNode[] = [
    {
        title: 'parent 0',
        key: '0-0',
        children: [
            { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
            { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
        ],
    },
    {
        title: 'parent 1',
        key: '0-1',
        children: [
            { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
            { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
        ],
    },
];


const FranchiseeSection = () => {
    return (
        <Button icon={<UsergroupAddOutlined />} type="primary" size='middle' style={{ textAlign: 'start' }}>Мои сотрудники</Button>
    )
}

const SideBar = () => {
    const me = useAppSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const {data: getMeAtFranchisee} = useGetMeAtFranchiseeQuery();
    const {data: getMeAtFranchisor} = useGetMeQuery();
    const currentFranchisor = useAppSelector(selectCurrentFranchisor);
    const currentFranchisee = useAppSelector(selectCurrentFranchisee);
    console.log('currentFranchisor', currentFranchisor);
    const role = me?.role || ROLE.EMPLOYEE;
   

    useEffect(() => {
        role === ROLE.FRANCHISOR && dispatch(setCurrentFranchisor(getMeAtFranchisor?.id));
        role === ROLE.FRANCHISEE && dispatch(setCurrentFranchisee(getMeAtFranchisee?.id))
        role === ROLE.EMPLOYEE && dispatch(setCurrentEmployee(me?.id));
    }, [])



    return (
        <Sider width={350} theme='light' style={{ padding: 40 }}>
            <Flex vertical justify='space-between' style={{ minHeight: '100%' }}>
                <Flex vertical gap={20}>
                    {
                        allowedRolesAdmin.includes(role) && <AdminSection />
                    }
                    {
                        allowedRolesFranchaisor && currentFranchisor && <FranchisorSection />
                    }
                    <DirectoryTree
                        multiple
                        defaultExpandAll
                        treeData={treeData}
                    />
                </Flex>
                <Flex vertical gap={10}>
                    {
                        allowedRolesFranchaisee.includes(role) && currentFranchisee && <FranchiseeSection />
                    }
                    <Progress percent={66} />
                    <p>Использовано 10 ГБ из 15 ГБ</p>
                </Flex>
            </Flex>
        </Sider>
    )
}

export default SideBar