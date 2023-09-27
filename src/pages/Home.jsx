import React, { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import BlueBackground from "../components/BlueBackground";
import AddExerciseCard from "../components/AddExerciseCard";
import ExerciseCard from "../components/ExerciseCard";
import { doc, getDoc, onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase";
import APP_ACTION_TYPES from "../action-types/app-action-types";


const Home = () => {

    const {app_state, dispatch} = useContext(AppContext);
    const {user, displayName, exercises} = app_state;

    async function fetchDisplayName() {
        try {
            const docSnap = await getDoc(doc(db, 'users', user.uid));
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

    useEffect(() => {
        const unsub = onSnapshot(collection(db, `users/${user.uid}/exercises`), snapshot => {
            dispatch({
                type: APP_ACTION_TYPES.GET_EXERCISE_NAMES,
                payload: snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
            });
        });

        return unsub;
    }, []);

    return (
        <BlueBackground >
            <h1 className="google-font-800 text-white text-center mt-5 fs-1">{`Welcome back, ${displayName}!`}</h1>
            <AddExerciseCard/>
            {exercises.map(exercise => <ExerciseCard key={exercise.id} id={exercise.id} name={exercise.name} />)}
        </BlueBackground>
    );
};

export default Home;