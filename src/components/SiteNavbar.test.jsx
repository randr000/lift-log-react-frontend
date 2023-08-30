import { render, screen } from '@testing-library/react';
import SiteNavbar from './SiteNavbar';
import AppContext from '../contexts/AppContext';
import { APP_INITIAL_STATE } from '../reducers/appReducer';
import { BrowserRouter } from 'react-router-dom';

describe('All navbar items render or do not render correctly when user is not signed in', () => {

    const initialRender = () => {
        render(
            <BrowserRouter>
                <AppContext.Provider value={{app_state: APP_INITIAL_STATE, dispatch: () => {}}}>
                    <SiteNavbar />
                </AppContext.Provider>
            </BrowserRouter>
        );
    };

    test('liftlog logo text renders', () => {
        initialRender();
        const logoTxt = screen.getByText(/liftlog/i);
        expect(logoTxt).toBeInTheDocument();
    });

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

    test('About button renders', () => {
        initialRender();
        const aboutBtn = screen.getByRole('button', {
            name: "About"
        });
        expect(aboutBtn).toBeInTheDocument();
    });
});

describe('All navbar items render or do not render correctly when user is signed in', () => {

    const signInRender = () => {
        render(
            <BrowserRouter>
                <AppContext.Provider value={{app_state: {...APP_INITIAL_STATE, signedIn: true}, dispatch: () => {}}}>
                    <SiteNavbar />
                </AppContext.Provider>
            </BrowserRouter>
        );
    };

    test('liftlog logo text renders', () => {
        signInRender();
        const logoTxt = screen.getByText(/liftlog/i);
        expect(logoTxt).toBeInTheDocument();
    });

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

    test('About button renders', () => {
        signInRender();
        const aboutBtn = screen.getByRole('button', {
            name: "About"
        });
        expect(aboutBtn).toBeInTheDocument();
    });
});