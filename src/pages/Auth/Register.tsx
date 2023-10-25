import { Button, Checkbox, Form, Input } from 'antd';
import { useSignInMutation } from '../../api/auth';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetMeQuery } from '../../api/user';
import { Content } from 'antd/es/layout/layout';

type FieldType = {
    fio?: string;
    password?: string;
    phone?: string;

};

const Register = () => {

    const [signIn] = useSignInMutation();
    const [searchParams, setSearchParams] = useSearchParams()
    const [signInValue, setSignInValie] = useState({
        email: '',
        password: ''
    })

   
    const { data: myData } = useGetMeQuery({ token: searchParams.get('token') || "" });

    const [franchiseeValue, setFranchiseeValue] = useState({
        id: myData?.id,
        email: myData?.email,
        password: '',
        phone: '',
        franchisee: {
            llc: 'Loool' 
        }
    })

    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState(''); 
    


    const franchiseeFormSumbit = () => {
        console.log(franchiseeValue)    
    }


    const FranchiseeForm = () => {
        return (
            <div style={{gap: 20, display: 'flex', flexWrap: 'wrap'}}>
                <Input placeholder='Номер телефона' onChange={(e) => setFranchiseeValue({ ...franchiseeValue, phone: e.target.value })} />
                <Input placeholder='Пароль' onChange={(e) => setFranchiseeValue({ ...franchiseeValue, password: e.target.value })} />
                <Input placeholder='ИНН' onChange={(e) => setFranchiseeValue({ ...franchiseeValue, email: e.target.value })} />
                <Button type="primary" htmlType="submit" onClick={franchiseeFormSumbit}>
                    Зарегестрировать
                </Button>
            </div>
        )
    }

    const EmployeeForm = () => {
        return (
            <div style={{gap: 20, display: 'flex', flexWrap: 'wrap'}}>
                <h2>ТУТ МНОГО ДРУГИХ ДАННЫХ СОТРУДНИКА</h2>
                <Input placeholder='Придумайте пароль' onChange={(e) => setSignInValie({ ...signInValue, email: e.target.value })} />
                <Button type="primary" htmlType="submit" onClick={onSubmit}>
                    Зарегестрировать
                </Button>
            </div>
        )
    }

    async function onSubmit() {
        try {
            await signIn(signInValue).unwrap();
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <Content style={{padding: 40}}>
            <FranchiseeForm />
        </Content>
    )
}


export default Register