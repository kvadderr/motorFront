import { useState } from "react";
import { Button, Form, Input } from 'antd';


type FieldType = {
    login?: string;
};

const FranchiseeRegister = () => {

    const [signInValue, setSignInValie] = useState({
        email: '',
        role: 'franchisee'
    })

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
                label="E-mail"
                name="login"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input onChange={(e) => setSignInValie({ ...signInValue, email: e.target.value })} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" >
                    Отправить приглашение
                </Button>
            </Form.Item>
        </Form>
    )
}

export default FranchiseeRegister;