import { Layout, theme, Tabs, Button, Divider, Menu } from "antd";
import type { TabsProps } from 'antd';
import type { MenuProps, MenuTheme } from 'antd';
const { Content, Sider } = Layout;
import { useState } from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import AdminRegister from "../../../components/RegistrationForm/AdminRegister";
import FranchisorRegister from "../../../components/RegistrationForm/FranchisorRegister";

import Exit from "../../../components/RegistrationForm/Exit";


const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Добавить администратора',
        children: <AdminRegister role="admin" />,
    },
    {
        key: '2',
        label: 'Добавить аккаунт-менеджера',
        children: <AdminRegister role="manager" />,
    },
    {
        key: '3',
        label: 'Добавить франчайзера',
        children: <FranchisorRegister role="franchisor" />
    },
    {
        key: '6',
        label: 'Выход',
        children: <Exit />
    },
];


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
  
  const itemsMenu: MenuItem[] = [
    getItem('Navigation One', 'sub1', <MailOutlined />, [
      getItem('Option 1', '1'),
      getItem('Option 2', '2'),
      getItem('Option 3', '3'),
      getItem('Option 4', '4'),
    ]),
  
    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
      getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),
  
    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
      getItem('Option 11', '11'),
      getItem('Option 12', '12'),
    ]),
  ];

const Admin = () => {
    const [current, setCurrent] = useState('1');
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <>
            <Sider width={350} theme='light' style={{ padding: 40 }}>
                <Menu
                    theme={'light'}
                    style={{ width: 256 }}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[current]}
                    mode="inline"
                    items={itemsMenu}
                />
            </Sider>
            <Content style={{ padding: 20, background: colorBgContainer }}>
                <Tabs defaultActiveKey="1" items={items} />
            </Content>
        </>
    )
}

export default Admin;