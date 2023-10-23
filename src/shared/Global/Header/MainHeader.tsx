import { Layout, Menu, theme, Flex, Typography, MenuProps } from "antd"
import { AppstoreOutlined, MailOutlined, DatabaseOutlined } from '@ant-design/icons';
const { Header } = Layout;
const { Title } = Typography;


const items: MenuProps['items'] = [
    {
        label: 'Курсы',
        key: 'course',
        icon: <MailOutlined />,
    },
    {
        label: 'База знаний',
        key: 'db',
        icon: <DatabaseOutlined />,
    },
    {
        label: 'HR MOTOR',
        key: 'admin',
        icon: <AppstoreOutlined />,
    }
]

const MainHeader = (props: any) => {

    const onClick: MenuProps['onClick'] = (e) => {
        props.setCurrent(e.key)
    };

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    

    return (
        <Header style={{
            background: colorBgContainer, position: 'sticky',
            top: 0,
            paddingLeft: 20,
            paddingRight: 20,
            zIndex: 1,
            width: '100%',
            borderBottomColor: '#000',
            borderBottomWidth: 2,
            borderWidth: 4,
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)"
        }} >
            <Flex align='center' justify='space-between'>
                <Title level={4} style={{ textAlign: 'center', marginTop: 16 }}>Motor</Title>
                <Menu
                    theme="light"
                    onClick={onClick}
                    mode="horizontal"
                    items={items}
                />
            </Flex>
        </Header>
    )
}

export default MainHeader