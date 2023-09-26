import React, { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import BlueBackground from "../components/BlueBackground";
import AddExerciseCard from "../components/AddExerciseCard";
import ExerciseCard from "../components/ExerciseCard";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import APP_ACTION_TYPES from "../action-types/app-action-types";


const Home = () => {

    const {app_state, dispatch} = useContext(AppContext);
    const {user, displayName} = app_state;

    async function fetchDisplayName() {
        try {
            const docSnap = await getDoc(doc(db, 'users', user.uid));
            console.log(docSnap.data());
            dispatch({
                type: APP_ACTION_TYPES.UPDATE_DISPLAY_NAME,
                payload: docSnap.data().display_name
            });
        } catch (e) {
            console.log(e.message);
        }
    }

    useEffect(() => {
        fetchDisplayName();
    }, [user]);

    return (
        <BlueBackground>
            <h1 className="google-font-800 text-white text-center mt-5 fs-1">{`Welcome back, ${displayName}!`}</h1>
            <AddExerciseCard/>
            <ExerciseCard/>
        </BlueBackground>
    );
};

export default Home;