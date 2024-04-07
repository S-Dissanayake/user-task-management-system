import { vi } from 'vitest';
import { render, screen, fireEvent} from '@testing-library/react';
import TaskFormDialog from '../pages/dashboard/dialog/TaskFormDialog';

// Mocking the HTTP request function
vi.mock('../../../utils/HTTP_Request', () => ({
  http_Request: vi.fn(),
}));

describe('TaskFormDialog', () => {
  const handleCloseFormDIalogMock = vi.fn();
  const handleRefreshTaskListMock = vi.fn();
  const setSnackDataMock = vi.fn();

  const defaultProps = {
    isFormDialogOpen: true,
    handleCloseFormDIalog: handleCloseFormDIalogMock,
    formDialogViewMode: 'NEW',
    handleRefreshTaskList: handleRefreshTaskListMock,
    setSnackData: setSnackDataMock,
    selectedTask: null,
  };

  test('renders task form dialog with default values', async () => {
    render(<TaskFormDialog {...defaultProps} />);

    expect(screen.getByText('Task Manager')).toBeTruthy();
    expect(screen.getByTestId('task-title')).toBeTruthy();
    expect(screen.getByTestId('task-priority')).toBeTruthy();
    expect(screen.getByTestId('task-status')).toBeTruthy();
    expect(screen.getByText('Add')).toBeTruthy();
    expect(screen.getByText('Cancel')).toBeTruthy();
  });

  test('calls handleCloseFormDIalog and handleFormReset when Cancel button is clicked', async () => {
    render(<TaskFormDialog {...defaultProps} />);

    const cancelButton = screen.getByText('Cancel');
    await fireEvent.click(cancelButton);

    expect(handleCloseFormDIalogMock).toHaveBeenCalled();
  });

  test('calls handleCloseFormDIalog with "NEW" when Add button is clicked and submited', async () => {
    render(<TaskFormDialog {...defaultProps} />);

    const addButton = screen.getByText('Add');
    await fireEvent.click(addButton);

    expect(handleCloseFormDIalogMock).toHaveBeenCalled();
  });

  test('disables form fields in VIEW mode', async () => {
    const props = {
      ...defaultProps,
      formDialogViewMode: 'VIEW',
    };
    render(<TaskFormDialog {...props} />);

    const titleInput = screen.getByTestId('task-title');
    const priorityInput = screen.getByTestId('task-priority');
    const statusInput = screen.getByTestId('task-status');

    const titleInputElement = titleInput.querySelector('.Mui-disabled');
    const priorityInputElement = priorityInput.querySelector('.Mui-disabled');
    const statusInputElement = statusInput.querySelector('.Mui-disabled');

    expect(titleInputElement).toBeTruthy();
    expect(priorityInputElement).toBeTruthy();
    expect(statusInputElement).toBeTruthy();
  });
});
