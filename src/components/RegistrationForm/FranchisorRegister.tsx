import { useState } from "react";
import { Button, Form, Input } from 'antd';
import { useSignUpMutation } from "../../api/auth";


type FieldType = {
    login?: string;
    phone?: string;
    company?: string;
    FIO?: string;
};

type Props = {
    role: string
};

const FranchisorRegister = ({ role }: Props) => {

    const [signUp, { isLoading }] = useSignUpMutation();


    const [signInValue, setSignInValie] = useState({
        email: '',
        phone: '',
        role: role,
        franchisor: {
            FIO: '',
            company: ''
        }
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
                label="Название компании"
                name="company"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input onChange={(e) => setSignInValie({
                    ...signInValue, franchisor: {
                        ...signInValue.franchisor,
                        company: e.target.value
                    }
                })} />
            </Form.Item>

            <Form.Item<FieldType>
                label="Номер телефона"
                name="phone"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input onChange={(e) => setSignInValie({ ...signInValue, phone: e.target.value })} />
            </Form.Item>

            <Form.Item<FieldType>
                label="FIO"
                name="FIO"
            >
                <Input onChange={(e) => setSignInValie({
                    ...signInValue, franchisor: {
                        ...signInValue.franchisor,
                        FIO: e.target.value
                    }
                })} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button onClick={onSubmit} loading={isLoading} type="primary" htmlType="submit" >
                    Зарегестрировать
                </Button>
            </Form.Item>
        </Form>
    )
}

export default FranchisorRegister;