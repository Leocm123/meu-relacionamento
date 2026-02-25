import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders intro section', () => {
  render(<App />);
  expect(screen.getByText(/Para você/i)).toBeInTheDocument();
});
