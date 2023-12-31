import { render, screen, fireEvent } from '@testing-library/react';
import SignUp from './SignUp';
import AppContext from '../contexts/AppContext';
import { APP_INITIAL_STATE } from '../reducers/appReducer';

describe('All sign up modal elements load', () => {

    const state = {...APP_INITIAL_STATE, showSignUp: true};
    const renderInitialLoad = () => {
        render(
            <AppContext.Provider value={{appState: state, dispatch: () => {}}}>
                <SignUp />
            </AppContext.Provider>
        );
    };

    test('Sign Up title loads', () => {
        renderInitialLoad();
        const signUpHeader = screen.getByTestId('sign-up-title');
        expect(signUpHeader).toBeInTheDocument();
    });

    test('Email address input loads', () => {
        renderInitialLoad();
        const emailInput = screen.getByLabelText(/email address/i);
        expect(emailInput).toBeInTheDocument();
    });

    test('Password input loads', () => {
        renderInitialLoad();
        const passwordInput = screen.getByLabelText(/^password$/i);
        expect(passwordInput).toBeInTheDocument();
    });

    test('Confirm Password input loads', () => {
        renderInitialLoad();
        const passwordInput = screen.getByLabelText(/^confirm password$/i);
        expect(passwordInput).toBeInTheDocument();
    });

    test('Sign Up button loads', () => {
        renderInitialLoad();
        const signInBtn = screen.getByRole('button', {name: /sign up/i});
        expect(signInBtn).toBeInTheDocument();
    });

    test('Cancel button loads', () => {
        renderInitialLoad();
        const closeBtn = screen.getByRole('button', {name: /cancel/i});
        expect(closeBtn).toBeInTheDocument();
    });
});

describe('All sign up modal elements do not load', () => {

    const renderInitialLoad = () => {
        render(
            <AppContext.Provider value={{appState: APP_INITIAL_STATE, dispatch: () => {}}}>
                <SignUp />
            </AppContext.Provider>
        );
    }

    test('Sign Up title does not load', () => {
        renderInitialLoad();
        const signUpHeader = screen.queryByTestId('sign-up-title');
        expect(signUpHeader).not.toBeInTheDocument();
    });

    test('Email address input does not load', () => {
        renderInitialLoad();
        const emailInput = screen.queryByLabelText(/email address/i);
        expect(emailInput).not.toBeInTheDocument();
    });

    test('Password input does not load', () => {
        renderInitialLoad();
        const passwordInput = screen.queryByLabelText(/^password$/i);
        expect(passwordInput).not.toBeInTheDocument();
    });

    test('Confirm Password input does not load', () => {
        renderInitialLoad();
        const passwordInput = screen.queryByLabelText(/^confirm password$/i);
        expect(passwordInput).not.toBeInTheDocument();
    });

    test('Sign Up button does not load', () => {
        renderInitialLoad();
        const signInBtn = screen.queryByRole('button', {name: /sign up/i});
        expect(signInBtn).not.toBeInTheDocument();
    });

    test('Cancel button does not load', () => {
        renderInitialLoad();
        const closeBtn = screen.queryByRole('button', {name: /cancel/i});
        expect(closeBtn).not.toBeInTheDocument();
    });
});

describe('Email and password inputs update after input from keyboard', () => {

    const state = {...APP_INITIAL_STATE, showSignUp: true};
    const renderInitialLoad = () => {
        render(
            <AppContext.Provider value={{appState: state, dispatch: () => {}}}>
                <SignUp />
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
        const passwordInput = screen.getByLabelText(/^password$/i);
        testInput(passwordInput);
        testInput(passwordInput, 'asdk#2gdakl@');
        testInput(passwordInput, '');
    });

    test('Confirm Password input updates correctly', () => {
        renderInitialLoad();
        const passwordInput = screen.getByLabelText(/^confirm password$/i);
        testInput(passwordInput);
        testInput(passwordInput, 'asdk#2gdakl@');
        testInput(passwordInput, '');
    });
});