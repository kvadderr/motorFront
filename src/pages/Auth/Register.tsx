import { Button, Checkbox, Form, Input } from 'antd';
import { useSignInMutation } from '../../api/auth';
import { useState } from 'react';

type FieldType = {
    login?: string;
    password?: string;
    isFranchisor?: boolean;
};

const Register = () => {

    const [signIn] = useSignInMutation();
    const [signInValue, setSignInValie] = useState({
        email: '',
        password: '' 
    })

    async function onSubmit() {
        try {
            await signIn(signInValue).unwrap();
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
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
                <Input onChange={(e) => setSignInValie({...signInValue, email: e.target.value})}/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Пароль"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password onChange={(e) => setSignInValie({...signInValue, password: e.target.value})}/>
            </Form.Item>

            <Form.Item<FieldType>
                name="isFranchisor"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
            >
                <Checkbox>Я - франчайзер</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" onClick={onSubmit}>
                    Вход
                </Button>
            </Form.Item>
        </Form>
    )
}


export default Register