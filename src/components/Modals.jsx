import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import AddExerciseFormModal from "./AddExerciseFormModal";
import ViewSetsModal from "./ViewSetsModal";

const Modals = () => {
    return (
        <>
            <SignIn/>
            <SignUp/>
            <AddExerciseFormModal/>
            {/* <ViewSetsModal/> */}
        </>
    );
};

export default Modals;