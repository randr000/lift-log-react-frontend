import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import AppContext from '../contexts/AppContext';
import { APP_INITIAL_STATE } from '../reducers/appReducer';

describe('Sign in and sign up buttons render correctly on initial load and sign out button does not', () => {

    const initialRender = () => {
        render(
            <AppContext.Provider value={{app_state: APP_INITIAL_STATE, dispatch: () => {}}}>
                <Navbar />
            </AppContext.Provider>
        );
    };

    test('Sign In button renders', () => {
        initialRender();
        const signInBtn = screen.getByRole('button', {
            name: "Sign In"
        });
        expect(signInBtn).toBeInTheDocument();
    });

    test('Sign Up button renders', () => {
        initialRender();
        const signUpBtn = screen.getByRole('button', {
            name: "Sign Up"
        });
        expect(signUpBtn).toBeInTheDocument();
    });

    test('Sign out button does not render', () => {
        initialRender();
        const signOutBtn = screen.queryByRole('button', {
        name: "Sign Out"
        });
        expect(signOutBtn).not.toBeInTheDocument();
    });
});