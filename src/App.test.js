import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders Navbar component', () => {
  render(<App />);
  const navBar = screen.getByRole(/navigation/i);
  expect(navBar).toBeInTheDocument();
});

test('Renders logo as background image', () => {
  render(<App />);
  const bgImg = screen.getByAltText(/Background Image Logo/i);
  expect(bgImg).toBeInTheDocument();
});