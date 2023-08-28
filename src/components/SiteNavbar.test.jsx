import { render, screen } from '@testing-library/react';
import SiteNavbar from './SiteNavbar';
import AppContext from '../contexts/AppContext';
import { APP_INITIAL_STATE } from '../reducers/appReducer';

describe('Sign in and sign up buttons render correctly on initial load and sign out button does not', () => {

    const initialRender = () => {
        render(
            <AppContext.Provider value={{app_state: APP_INITIAL_STATE, dispatch: () => {}}}>
                <SiteNavbar />
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

    test('Sign Out button does not render', () => {
        initialRender();
        const signOutBtn = screen.queryByRole('button', {
        name: "Sign Out"
        });
        expect(signOutBtn).not.toBeInTheDocument();
    });
});

describe('Sign in and sign up buttons do not render and sign out button does when signed in', () => {

    const signInRender = () => {
        render(
            <AppContext.Provider value={{app_state: {...APP_INITIAL_STATE, signedIn: true}, dispatch: () => {}}}>
                <SiteNavbar />
            </AppContext.Provider>
        );
    };

    test('Sign In button does not render', () => {
        signInRender();
        const signInBtn = screen.queryByRole('button', {
            name: "Sign In"
        });
        expect(signInBtn).not.toBeInTheDocument();
    });

    test('Sign Up button does not render', () => {
        signInRender();
        const signUpBtn = screen.queryByRole('button', {
            name: "Sign Up"
        });
        expect(signUpBtn).not.toBeInTheDocument();
    });

    test('Sign Out button does render', () => {
        signInRender();
        const signOutBtn = screen.getByRole('button', {
        name: "Sign Out"
        });
        expect(signOutBtn).toBeInTheDocument();
    });
});