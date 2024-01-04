import { render, screen } from '@testing-library/react';
import TrainingRate from './training-rate';

describe('TrainingRate', () => {
  it('renders TrainingRate component with correct content', () => {
    const rate = 4;
    render(<TrainingRate rate={rate} />);

    expect(screen.getByTestId('training-rate')).toBeInTheDocument();

    expect(screen.getByText('4')).toBeInTheDocument();
  });
});
