import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search button', () => {
  render(<App />);
  const linkElement = screen.getByText("Search");
  expect(linkElement).toBeInTheDocument();
});
