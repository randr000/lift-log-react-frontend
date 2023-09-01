import { render, screen } from '@testing-library/react';
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
  });
});