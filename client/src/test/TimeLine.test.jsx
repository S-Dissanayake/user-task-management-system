import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TimeLine from '../components/timeline/TimeLine';

describe('TimeLine', () => {
    test('renders timeline items correctly based on statusHistory prop', () => {
      const statusHistory = {
        "New": "2024-04-01",
        "In Progress": "2024-04-02",
        "Completed": "2024-04-03"
      };
  
      render(<TimeLine
        isPopoverOpen={true}
        anchorEl={document.createElement('div')}
        handlePopoverClose={vi.fn()}
        statusHistory={statusHistory}
      />);
  
      expect(screen.getByText('New')).toBeInTheDocument();
      expect(screen.getByText('In Progress')).toBeInTheDocument();
      expect(screen.getByText('Completed')).toBeInTheDocument();
    });
  
    test('does not render items if statusHistory prop is not provided', () => {
      render(<TimeLine
        isPopoverOpen={true}
        anchorEl={document.createElement('div')}
        handlePopoverClose={vi.fn()}
        statusHistory={{}}
      />);
  
      expect(screen.queryByText('New')).not.toBeInTheDocument();
      expect(screen.queryByText('In Progress')).not.toBeInTheDocument();
      expect(screen.queryByText('Completed')).not.toBeInTheDocument();
    });
  });