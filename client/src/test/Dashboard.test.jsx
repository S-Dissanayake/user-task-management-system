import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import Dashboard from '../pages/dashboard/view/Dashboard';

test('opens task form dialog when "New Task" button is clicked', async () => {
  // Render the Dashboard component
  render(
    <BrowserRouter>
        <Dashboard />
    </BrowserRouter>
  );

  // Click the "New Task" button
  await fireEvent.click(screen.getByRole('button', { name: 'New Task' }));

  // Assert that the task form dialog is opened
  expect(screen.getByText('Task Manager')).toBeInTheDocument();
});


