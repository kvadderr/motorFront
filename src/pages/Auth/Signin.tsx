import { Button, Checkbox, Form, Input, notification } from 'antd';
import { useSignInMutation } from '../../api/auth';
import { useState } from 'react';
import { Content } from 'antd/es/layout/layout';

type FieldType = {
    login?: string;
    password?: string;
    isFranchisor?: boolean;
};

const Signin = () => {

    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
        api.open({
            message: 'Notification Title',
            description:
                'Проверьте вашу почту',
            duration: 5,
        });
    };

    const [isFranchaisor, setIsFranchaisor] = useState(false);
    const [signIn] = useSignInMutation();
    const [signInValue, setSignInValie] = useState({
        email: '',
        password: ''
    })

    async function onSubmit() {
        try {
            isFranchaisor === true && openNotification;
            await signIn(signInValue).unwrap();
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <Content style={{paddingTop: 40}}>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Логин"
                    name="login"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input onChange={(e) => setSignInValie({ ...signInValue, email: e.target.value })} />
                </Form.Item>
                {
                    !isFranchaisor && <Form.Item<FieldType>
                        label="Пароль"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password onChange={(e) => setSignInValie({ ...signInValue, password: e.target.value })} />
                    </Form.Item>
                }


                <Form.Item<FieldType>
                    name="isFranchisor"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox checked={isFranchaisor} onChange={(e) => setIsFranchaisor(e.target.checked)}>Я - франчайзер</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" onClick={onSubmit}>
                        Вход
                    </Button>
                </Form.Item>
            </Form>
        </Content>
    )
}


export default Signin