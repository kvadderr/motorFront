import { Button, Checkbox, Form, Input } from 'antd';
import { useUpdateInfoMutation } from '../../api/auth';
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

    const [update] = useUpdateInfoMutation();
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


    async function onSubmit() {
        try {
            const data = {
                id: myData?.id,
                email: myData?.email || "",
                role: myData?.role || "",
                password: password,
            }
            await update(data).unwrap();
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <Content style={{ padding: 40 }}>
            <div style={{ gap: 20, display: 'flex', flexWrap: 'wrap' }}>
                <h2>ТУТ МНОГО ДРУГИХ ДАННЫХ {myData?.email}</h2>
                <p>Пока что только назначение пароля. Остальные права убрал, ибо мешают работе с каталогом. На функционал не влияют</p>
                <Input placeholder='Придумайте пароль' value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button type="primary" htmlType="submit" onClick={onSubmit}>
                    Зарегестрировать
                </Button>
            </div>
        </Content>
    )
}


export default Register