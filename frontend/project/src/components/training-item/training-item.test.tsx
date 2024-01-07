import { render, screen } from '@testing-library/react';
import TrainingItem from './training-item';
import { trainingMock } from '../../utils/mocks';
import { WorkoutType } from '../../types/workout-type.enum';
import { MemoryRouter } from 'react-router-dom';

describe('TrainingItem', () => {
  const mockTraining = {
    ...trainingMock,
    id: '1',
    backgroundImage: 'path/to/image.jpg',
    price: 0,
    name: 'Sample Training',
    workoutType: WorkoutType.Boxing,
    rating: 4.5,
    description: 'Sample description for the training.',
  };

  it('renders TrainingItem component with correct content', () => {
    render(
      <MemoryRouter>
        <TrainingItem sourceName="test-source" training={mockTraining} />
      </MemoryRouter>
    );

    expect(screen.getByAltText('тренировка')).toBeInTheDocument();
    expect(screen.getByText('Бесплатно')).toBeInTheDocument();
    expect(screen.getByText('Sample Training')).toBeInTheDocument();
    expect(screen.getByText('#бокс')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('Sample description for the training.')).toBeInTheDocument();

    expect(screen.getByTestId('thumbnail-training-wrapper')).toBeInTheDocument();
  });

});
