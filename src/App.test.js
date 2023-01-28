import { render, screen } from '@testing-library/react';
import App from './App';

// TODO: skipping this test but leaving it as an example
test.skip('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
