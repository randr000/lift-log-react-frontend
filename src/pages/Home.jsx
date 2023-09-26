import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";
import BlueBackground from "../components/BlueBackground";
import AddExerciseCard from "../components/AddExerciseCard";
import ExerciseCard from "../components/ExerciseCard";

const Home = () => {

    const {app_state, dispatch} = useContext(AppContext);
    const {user} = app_state;

    return (
        <BlueBackground>
            <h1 className="google-font-800 text-white text-center mt-5 fs-1">{`Welcome! UID: ${user.uid}`}</h1>
            <AddExerciseCard/>
            <ExerciseCard/>
        </BlueBackground>
    );
};

export default Home;