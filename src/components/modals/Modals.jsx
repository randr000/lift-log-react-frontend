import React, { useContext } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AddExerciseFormModal from "./AddExerciseFormModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EditSetModal from "./EditSetModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import AccountSettingsModal from "./AccountSettingsModal";
import PasswordResetModal from "./PasswordResetModal";
import AppContext from "../../contexts/AppContext";

const Modals = () => {
    
    const {appState, dispatch} = useContext(AppContext);
    const {
        showEditSetModal,
        showForgotPasswordModal,
        showAccountSettingsModal,
        showPasswordResetModal
    } = appState;

    return (
        <>
            <SignIn/>
            <SignUp/>
            <AddExerciseFormModal/>
            <DeleteConfirmationModal/>
            {showEditSetModal && <EditSetModal/>}
            {showForgotPasswordModal && <ForgotPasswordModal/>}
            {showAccountSettingsModal && <AccountSettingsModal/>}
            {showPasswordResetModal && <PasswordResetModal/>}
        </>
    );
};

export default Modals;