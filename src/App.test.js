import { render, screen } from '@testing-library/react';
import { Route } from 'react-router';
import App from './App';

test('renders learn react link', () => {
  render(<Route><App /></Route>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
