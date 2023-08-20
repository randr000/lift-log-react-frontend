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
        const closeBtn = screen.getByRole('button', {name: /cancel/i});
        expect(closeBtn).toBeInTheDocument();
    });
});

describe('All sign in modal elements do not load', () => {

    const renderInitialLoad = () => {
        render(
            <AppContext.Provider value={{app_state: APP_INITIAL_STATE, dispatch: () => {}}}>
                <SignIn />
            </AppContext.Provider>
        );
    };

    test('Login title does not load', () => {
        renderInitialLoad();
        const loginHeader = screen.queryByText(/login/i);
        expect(loginHeader).not.toBeInTheDocument();
    });

    test('Email address input does not load', () => {
        renderInitialLoad();
        const emailInput = screen.queryByLabelText(/email address/i);
        expect(emailInput).not.toBeInTheDocument();
    });

    test('Password input does not load', () => {
        renderInitialLoad();
        const passwordInput = screen.queryByLabelText(/password/i);
        expect(passwordInput).not.toBeInTheDocument();
    });

    test('Sign In button does not load', () => {
        renderInitialLoad();
        const signInBtn = screen.queryByRole('button', {name: /sign in/i});
        expect(signInBtn).not.toBeInTheDocument();
    });

    test('Close button does not load', () => {
        renderInitialLoad();
        const closeBtn = screen.queryByRole('button', {name: /cancel/i});
        expect(closeBtn).not.toBeInTheDocument();
    });
});