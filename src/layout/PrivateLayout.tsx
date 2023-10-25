
import { useEffect, useState } from 'react';
import { Layout, theme } from 'antd';

import { useAppSelector } from '../store/storeHooks';
import { selectCurrentUser } from '../store/slices/authSlice';
import { selectCurrentFranchisor } from '../store/slices/authSlice';

import { useAllWorkspaceMutation } from '../api/workspace';
import { useCurrentUserQuery } from '../api/user';

import MainHeader from '../shared/Global/Header/MainHeader';
import Dashboard from '../pages/Admin/Dashboard';
import Course from '../pages/Admin/Course';
import Admin from '../pages/Admin/Admin';
import ModalData from '../shared/Global/Modal';

const PrivateLayout = () => {
    const [current, setCurrent] = useState('db');
    const me = useAppSelector(selectCurrentUser);
    const franchisor = useAppSelector(selectCurrentFranchisor);
    useCurrentUserQuery();
    
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const CurrentPage = () => {
        switch (current) {
            case "db":
                return <Dashboard />
                break;
            case "course":
                return <Course />
            case "admin":
                return <Admin />
            default:
                break;
        }
    }

    return (
        <Layout style={{ minHeight: '100vh' }} >
            <MainHeader setCurrent={setCurrent} />
            <Layout style={{ background: colorBgContainer }}>
                <CurrentPage />
            </Layout>
            <ModalData/>
        </Layout >
    )
}

export default PrivateLayout