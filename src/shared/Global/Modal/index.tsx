import { Modal, Input } from "antd";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../store/storeHooks";
import { setShowModal, setShowModalFranchiseeInvite, setShowAdminMode } from "../../../store/slices/modal";
import { selectShowModal, selectShowModalFranchiseeInvite, selectShowAdminMode } from "../../../store/slices/modal";
import { setCurrentFranchisor, setCurrentFranchisee, setCurrentEmployee } from "../../../store/slices/authSlice";
import AdminMode from "../../../components/Modal/AdminMode";
import { useState } from "react";
import { selectCurrentFranchisor } from "../../../store/slices/authSlice";
import { useCreateWorkspaceMutation } from "../../../api/workspace";
import { addWorkspace, selectWorkspaceList } from "../../../store/slices/workspace";
import { useSignUpMutation } from "../../../api/auth";
import { useAllWorkspaceMutation } from "../../../api/workspace";

const ModalData = () => {

    const [getWorkspece] = useAllWorkspaceMutation()

    const isModalOpen = useAppSelector(selectShowModal);
    const isModalFranchiseeInvite = useAppSelector(selectShowModalFranchiseeInvite);
    const isModalAdminMode = useAppSelector(selectShowAdminMode);

    const currentFranchisor = useAppSelector(selectCurrentFranchisor);
    const workspaceList = useAppSelector(selectWorkspaceList);

    const [createWorkspace] = useCreateWorkspaceMutation();
    const [signUp] = useSignUpMutation();

    const [currentFranchisorNumber, setCurrentFranchisorNumber] = useState<number | null>(null);
    const [currentFranchiseeNumber, setCurrentFranchiseeNumber] = useState<number | null>(null);
    const [workspaceName, setWorkspaceName] = useState('');
    const [inviteMail, setInviteMail] = useState('')
    const [isFranchaisor, setIsFranchaisor] = useState(false);
    const dispatch = useDispatch();

    const handleOk = async () => {
        console.log(currentFranchisor);
        dispatch(setShowModal(false));
        const data = { franchisor_id: currentFranchisor, name: workspaceName }
        currentFranchisor && await createWorkspace(data).unwrap();
        dispatch(addWorkspace({ ...data, id: workspaceList && workspaceList?.length + 1 }))
    };

    const handleCancel = () => {
        dispatch(setShowModal(false))
    };

    const handleOkFranchiseeInvite = async () => {
        dispatch(setShowModalFranchiseeInvite(false));
        await signUp({
            email: inviteMail,
            franchisee: {
                franchisor_id: currentFranchisor,
            },
            role: 'franchisee'
        }).unwrap();
    }

    const handleCancelFranchiseeInvite = () => {
        dispatch(setShowModalFranchiseeInvite(false));
    }

    const handleOkAdminMode = () => {
         if(!isFranchaisor) 
        {
            dispatch(setCurrentFranchisee(currentFranchiseeNumber))
            dispatch(setCurrentFranchisor(null))
        } else {
            getWorkspece({id: currentFranchisorNumber});
            dispatch(setCurrentFranchisee(null))
            dispatch(setCurrentFranchisor(currentFranchisorNumber))
        }
        dispatch(setShowAdminMode(false));
    }

    const handleCancelAdminMode = () => {
        dispatch(setShowAdminMode(false));
    }

    return (
        <>
            <Modal title="Новое рабочее пространство" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input addonBefore="Название" value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} />
            </Modal>
            <Modal title="Пригласить франчайзи" open={isModalFranchiseeInvite} onOk={handleOkFranchiseeInvite} onCancel={handleCancelFranchiseeInvite}>
                <Input onChange={(e) => setInviteMail(e.target.value)} addonBefore="E-mail" />
            </Modal>
            <Modal title="Войти в режим" open={isModalAdminMode} onOk={handleOkAdminMode} onCancel={handleCancelAdminMode}>
                <AdminMode setIsFranchaisor={setIsFranchaisor} isFranchaisor={isFranchaisor} setCurrentFranchisorNumber={setCurrentFranchisorNumber} setCurrentFranchiseeNumber={setCurrentFranchiseeNumber} />
            </Modal>
        </>
    )
}

export default ModalData;