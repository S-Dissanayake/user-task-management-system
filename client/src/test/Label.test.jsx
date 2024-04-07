import { render, screen } from '@testing-library/react';
import Label from '../components/label'; 

describe('Label', () => {
  test('renders children and icons correctly', () => {
    render(
      <Label
        color="primary"
        variant="filled"
        startIcon={<span>Start Icon</span>}
        endIcon={<span>End Icon</span>}
      >
        Label Text
      </Label>
    );

    // Check if children are rendered
    expect(screen.getByText('Label Text')).toBeInTheDocument();

    // Check if startIcon and endIcon are rendered
    expect(screen.getByText('Start Icon')).toBeInTheDocument();
    expect(screen.getByText('End Icon')).toBeInTheDocument();
  });

  test('applies custom styles correctly', () => {
    render(
      <Label sx={{ fontWeight: 'bold' }}>
        Label Text
      </Label>
    );

    // Check if custom styles are applied
    const label = screen.getByText('Label Text');
    expect(label).toHaveClass('MuiBox-root');
  });

});
