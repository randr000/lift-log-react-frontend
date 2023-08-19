import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import AppContext from '../contexts/AppContext';
import { APP_INITIAL_STATE } from '../reducers/appReducer';

describe('Sign in button renders correctly on initial load and sign out button does not', () => {

    test('Sign in button renders', () => {
    render(
        <AppContext.Provider value={{app_state: APP_INITIAL_STATE, dispatch: () => {}}}>
            <Navbar />
        </AppContext.Provider>
    );
    const signInBtn = screen.getByRole('button', {
        name: "Sign In"
    });
    expect(signInBtn).toBeInTheDocument();
    });

    test('Sign out button does not render', () => {
        render(
        <AppContext.Provider value={{app_state: APP_INITIAL_STATE, dispatch: () => {}}}>
            <Navbar />
        </AppContext.Provider>
        );
        const signOutBtn = screen.queryByRole('button', {
        name: "Sign Out"
        });
        expect(signOutBtn).not.toBeInTheDocument();
    });
});