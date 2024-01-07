import { render, screen } from '@testing-library/react';
import { trainingMock } from '../../utils/mocks';
import TrainingList from './training-list';
import { MemoryRouter } from 'react-router-dom';

describe('TrainingList', () => {
  const mockTrainings = [
    trainingMock
  ];

  it('renders TrainingList component with correct content', () => {
    render(
      <MemoryRouter>
        <TrainingList sourceName="test-source" itemSourceName="test-item-source" trainings={mockTrainings} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('popular-trainings-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('training-item')).toHaveLength(1);

    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
