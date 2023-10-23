import CountUp from 'react-countup';
import { Col, Row, Statistic, Layout, theme } from 'antd';
const { Content } = Layout ;

const formatter = (value: number) => <CountUp end={value} separator="," />;


const Course = () => {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Content style={{ padding: 20, background: colorBgContainer }}>
            <Row gutter={16}>
                <Col span={6}>
                    <Statistic title="Active Users" value={112893} formatter={formatter} />
                </Col>
                <Col span={6}>
                    <Statistic title="Account Balance (CNY)" value={112893} precision={2} formatter={formatter} />
                </Col>
                <Col span={6}>
                    <Statistic title="Account Balance (CNY)" value={112893} precision={2} formatter={formatter} />
                </Col>
                <Col span={6}>
                    <Statistic title="Account Balance (CNY)" value={112893} precision={2} formatter={formatter} />
                </Col>
            </Row>
        </Content>

    )
}


export default Course