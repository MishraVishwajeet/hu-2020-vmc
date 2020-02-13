import React from 'react';
import { render, screen, fireEvent, getByRole } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  expect(screen.getByText('App')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('Button'))
  expect(screen.getByRole('Button')).toBeInTheDocument();
});