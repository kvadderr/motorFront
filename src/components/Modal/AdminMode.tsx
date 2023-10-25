import { Switch, Select, Space } from "antd";
import { useAppSelector } from "../../store/storeHooks";
import { selectFranchaiserList } from "../../store/slices/franchiser";
import { selectFranchaiseeList } from "../../store/slices/franchisee";
import { useAllFranchaisorQuery } from "../../api/franchaisor";
import { useAllFranchaiseeQuery } from "../../api/franchaisee";

type Props = {
    setCurrentFranchisorNumber: (id: number) => void;
    setCurrentFranchiseeNumber: (id: number) => void;
    isFranchaisor: boolean;
    setIsFranchaisor: (checked: boolean) => void;
}
const AdminMode = ({setCurrentFranchisorNumber, setCurrentFranchiseeNumber, setIsFranchaisor, isFranchaisor}: Props) => {
    
    useAllFranchaisorQuery();
    useAllFranchaiseeQuery();
    
    const franchaisorList = useAppSelector(selectFranchaiserList)
    const franchaiseeList = useAppSelector(selectFranchaiseeList)

    const onChange = (checked: boolean) => {
        setIsFranchaisor(checked)
    };

    const handleChange = (value: number) => {
        isFranchaisor ? setCurrentFranchisorNumber(value) : setCurrentFranchiseeNumber(value) 
    };

    const franchisorData = franchaisorList?.map((franchisor) => ({label: franchisor.company, value: franchisor.id}));
    const franchiseeData = franchaiseeList?.map((franchaisee) => ({label: franchaisee.FIO, value: franchaisee.id}));

    return (
        <Space direction="vertical" size="large" style={{width: '100%'}}>
            <Switch checkedChildren="Франчайзеры" unCheckedChildren="Франчайзи" defaultChecked={isFranchaisor} onChange={onChange} />
            <Select
                style={{ width: '100%' }}
                onChange={handleChange}
                options={isFranchaisor ? franchisorData : franchiseeData}
            />
        </Space>
    )
}

export default AdminMode;