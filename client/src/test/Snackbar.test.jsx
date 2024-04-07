import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Snackbar from '../components/snackbar/Snackbar';

describe('Snackbar', () => {
  const handleResetMock = vi.fn();

  beforeEach(() => {
    // Mock props
    const props = {
      snackText: 'Test message',
      snackVariant: 'success',
      handleReset: handleResetMock
    };

    render(<Snackbar {...props} />);
  });

  test('renders snackbar with correct text and variant', () => {
    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByTestId('SuccessOutlinedIcon')).toBeInTheDocument();
  });

  test('calls handleReset when snackbar is closed', () => {
    const closeButton = screen.getByTitle("Close");
    fireEvent.click(closeButton);

    expect(handleResetMock).toHaveBeenCalled();
  });
});
