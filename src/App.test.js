import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('Renders Navbar component', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const navBar = screen.getByRole(/navigation/i);
  expect(navBar).toBeInTheDocument();
});

test('Renders logo as background image', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const bgImg = screen.getByAltText(/Background Image Logo/i);
  expect(bgImg).toBeInTheDocument();
});