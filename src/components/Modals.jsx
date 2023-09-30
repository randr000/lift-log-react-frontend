import React, { useContext } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AddExerciseFormModal from "./AddExerciseFormModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EditSetModal from "./EditSetModal";
import AppContext from "../contexts/AppContext";

const Modals = () => {
    
    const {app_state, dispatch} = useContext(AppContext);
    const {showEditSetModal} = app_state;

    return (
        <>
            <SignIn/>
            <SignUp/>
            <AddExerciseFormModal/>
            <DeleteConfirmationModal/>
            {showEditSetModal && <EditSetModal/>}
        </>
    );
};

export default Modals;