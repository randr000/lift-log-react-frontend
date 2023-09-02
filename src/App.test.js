import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const renderApp = () => render(<BrowserRouter><App /></BrowserRouter>);

describe('Renders all components', () => {
  
  test('Renders Navbar component', () => {
    renderApp();
    const navBar = screen.getByRole(/navigation/i);
    expect(navBar).toBeInTheDocument();
  });

  test('Renders logo as background image', () => {
    renderApp();
    const bgImg = screen.getByAltText(/Background Image Logo/i);
    expect(bgImg).toBeInTheDocument();
  });
});

describe('Test app navigation', () => {

  const user = userEvent.setup();

  test('Navigate to About page and back home', async () => {
    renderApp();

    // verify page content for default route
    const navBar = screen.getByRole(/navigation/i);
    const bgImg = screen.getByAltText(/Background Image Logo/i);
    expect(navBar).toBeInTheDocument();
    expect(bgImg).toBeInTheDocument();

    // verify page content for expected route after clicking on about button
    const aboutBtn = screen.getByRole(/button/i, {name: "About"});
    await user.click(aboutBtn);
    expect(screen.getByRole(/heading/i, {text: /about*/i})).toBeInTheDocument();
    const logoText = screen.getByTestId("logo-text");
    await user.click(logoText);
    expect(screen.getByAltText(/Background Image Logo/i)).toBeInTheDocument();
  });
});

// describe('Test user sign in and sign out', () => {

//   const user = user.setup();

//   test(`Test ${process.env.REACT_APP_TEST_LOGIN_EMAIL} can sign in and out`, async () => {
//     renderApp();

//     const signInBtn = screen.getByRole(/button/i, {name: /sign in/i});
//     const singOutBtn = screen.getByRole(/button/i, {name: /sign out/i});

//     await user.click(signInBtn);

//     const emailInput = screen.getByLabelText(/email address/i);
//     const passwordInput = screen.getByLabelText(/enter password/i);

//     await user.type(emailInput, process.env.REACT_APP_TEST_LOGIN_EMAIL);
//     await user.type(passwordInput, process.env.REACT_APP_TEST_LOGIN_PASSWORD);

//     const signInForm = screen.getByRole(/form/i);
//     const signInSubmitBtn = within(signInForm).getByRole(/button/i, {name: /sign in/i});

//     await user.click(signInSubmitBtn);

//     await waitFor(() => {
//       expect(process.env.REACT_APP_TEST_FIREBASE_UID).toEqual()
//     });
   
//   });
// });