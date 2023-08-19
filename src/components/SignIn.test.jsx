import { render, screen } from '@testing-library/react';
import SignIn from './SignIn';
import AppContext from '../contexts/AppContext';
import { APP_INITIAL_STATE } from '../reducers/appReducer';

describe('All sign in modal elements load', () => {

    const state = {...APP_INITIAL_STATE, showSignIn: true};
    const renderInitialLoad = () => {
        render(
            <AppContext.Provider value={{app_state: state, dispatch: () => {}}}>
                <SignIn />
            </AppContext.Provider>
        );
    };

    test('Login title loads', () => {
        renderInitialLoad();
        const loginHeader = screen.getByText(/login/i);
        expect(loginHeader).toBeInTheDocument();
    });

    test('Email address input loads', () => {
        renderInitialLoad();
        const emailInput = screen.getByLabelText(/email address/i);
        expect(emailInput).toBeInTheDocument();
    });

    test('Password input loads', () => {
        renderInitialLoad();
        const passwordInput = screen.getByLabelText(/password/i);
        expect(passwordInput).toBeInTheDocument();
    });

    test('Sign In button loads', () => {
        renderInitialLoad();
        const signInBtn = screen.getByRole('button', {name: /sign in/i});
        expect(signInBtn).toBeInTheDocument();
    });

    test('Close button loads', () => {
        renderInitialLoad();
        const closeBtn = screen.getByText(/close/i);
        expect(closeBtn).toBeInTheDocument();
    });
});