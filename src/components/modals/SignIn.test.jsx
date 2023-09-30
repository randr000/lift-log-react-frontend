import { render, screen, fireEvent } from '@testing-library/react';
import SignIn from './SignIn';
import AppContext from '../contexts/AppContext';
import { APP_INITIAL_STATE } from '../reducers/appReducer';
import userEvent from '@testing-library/user-event';

describe('All sign in modal elements load', () => {

    const state = {...APP_INITIAL_STATE, showSignIn: true};
    const renderInitialLoad = () => {
        render(
            <AppContext.Provider value={{appState: state, dispatch: () => {}}}>
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

    test('Cancel button loads', () => {
        renderInitialLoad();
        const closeBtn = screen.getByRole('button', {name: /cancel/i});
        expect(closeBtn).toBeInTheDocument();
    });
});

describe('All sign in modal elements do not load', () => {

    const renderInitialLoad = () => {
        render(
            <AppContext.Provider value={{appState: APP_INITIAL_STATE, dispatch: () => {}}}>
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

describe('Email and Password inputs update after input from keyboard', () => {

    const state = {...APP_INITIAL_STATE, showSignIn: true};
    const renderInitialLoad = () => {
        render(
            <AppContext.Provider value={{appState: state, dispatch: () => {}}}>
                <SignIn />
            </AppContext.Provider>
        );
    };

    const testInput = (component, text='') => {
        fireEvent.change(component, {target: {value: text}});
        expect(component.value).toBe(text);
    };
        
    test('Email address input updates correctly', () => {
        renderInitialLoad();
        const emailInput = screen.getByLabelText(/email address/i);
        testInput(emailInput);
        testInput(emailInput, 'test@test.com');
        testInput(emailInput, '');
    });

    test('Password input updates correctly', () => {
        renderInitialLoad();
        const passwordInput = screen.getByLabelText(/password/i);
        testInput(passwordInput);
        testInput(passwordInput, 'asdk#2gdakl@');
        testInput(passwordInput, '');
    });
});