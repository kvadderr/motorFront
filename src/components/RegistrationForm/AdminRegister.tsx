import { useState } from "react";
import { Button, Form, Input } from 'antd';
import { useSignUpMutation } from "../../api/auth";



type FieldType = {
    login?: string;
    password?: string;
};

type Props = {
    role: string
};

const AdminRegister = ({ role }: Props) => {

    const [signUp, { isLoading }] = useSignUpMutation();

    const [signInValue, setSignInValie] = useState({
        email: '',
        password: '',
        role: role,
    })

    async function onSubmit() {
        try {
            await signUp(signInValue).unwrap();
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
                <Input onChange={(e) => setSignInValie({ ...signInValue, email: e.target.value })} />
            </Form.Item>

            <Form.Item<FieldType>
                label="Пароль"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password onChange={(e) => setSignInValie({ ...signInValue, password: e.target.value })} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button loading={isLoading} type="primary" htmlType="submit" onClick={onSubmit}>
                    Зарегестрировать
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AdminRegister;