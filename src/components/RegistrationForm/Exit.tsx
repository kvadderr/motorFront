import { Button } from "antd";
import { useSignOutMutation } from "../../api/auth";

const Exit = () => {

    const [ signOut ] = useSignOutMutation();

    return (
        <Button onClick={() => signOut()} >Выйти из аккаунта</Button>
    )
}

export default Exit;