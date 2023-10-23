import SideBar from "../../../shared/Global/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { Divider, Layout, Breadcrumb, Modal, Input, theme } from "antd";
import { selectCurrentFranchisee, selectCurrentFranchisor } from "../../../store/slices/authSlice";
import { useAppSelector } from "../../../store/storeHooks";

const { Content } = Layout;

const Dashboard = () => {

    const franchisor = useAppSelector(selectCurrentFranchisor);
    const franchisee = useAppSelector(selectCurrentFranchisee);




    
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    

    return (
        <>
            <SideBar />
            <Divider type='vertical' style={{ height: '90vh', marginTop: 20, marginBottom: 20 }} />
            <Content style={{ padding: 20, background: colorBgContainer }}>
                <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                    Catalog
                </div>
            </Content>
            
        </>
    )
}

export default Dashboard;