import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AlertDialog from '../components/alertDialog/AlertDialog';

describe('AlertDialog', () => {
  const handleCloseAlertDIalogMock = vi.fn();
  const handleSubmitAltertDialogMock = vi.fn();

  beforeEach(() => {
    render(
      <AlertDialog
        isAlertDialogOpen={true}
        handleCloseAlertDIalog={handleCloseAlertDIalogMock}
        alertDialogTitle="Test Alert"
        alertDialogContentText="This is a test alert dialog."
        handleSubmitAltertDialog={handleSubmitAltertDialogMock}
      />
    );
  });

  test('renders alert dialog with correct title and content', () => {
    expect(screen.getByText('Test Alert')).toBeInTheDocument();
    expect(screen.getByText('This is a test alert dialog.')).toBeInTheDocument();
  });

  test('calls handleCloseAlertDIalog when No button is clicked', () => {
    const cancelButton = screen.getByText('No');
    fireEvent.click(cancelButton);

    expect(handleCloseAlertDIalogMock).toHaveBeenCalled();
  });

  test('calls handleSubmitAltertDialog when Yes button is clicked', () => {
    const submitButton = screen.getByText('Yes');
    fireEvent.click(submitButton);

    expect(handleSubmitAltertDialogMock).toHaveBeenCalled();
  });
});
