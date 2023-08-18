import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders Navbar component', () => {
  render(<App />);
  const navBar = screen.getByRole(/navigation/i);
  expect(navBar).toBeInTheDocument();
});