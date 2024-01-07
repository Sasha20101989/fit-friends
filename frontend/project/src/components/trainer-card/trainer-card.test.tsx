import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { initialTrainerState, trainingMock } from '../../utils/mocks';
import TrainerCard from './trainer-card';
import { Role } from '../../types/role.enum';
import { WorkoutType } from '../../types/workout-type.enum';
import { Location } from '../../types/location.enum';

describe('TrainerCard', () => {
  const mockTrainer = {
    ...initialTrainerState,
    name: 'John Doe',
    location: Location.Petrograd,
    description: 'Test Description',
    workoutTypes: [WorkoutType.Aerobics, WorkoutType.Boxing],
    role: Role.Trainer,
    personalTraining: true,
    certificates: ['Certificate 1', 'Certificate 2'],
  };

  const mockTrainings = [
    trainingMock
  ];

  const mockProps = {
    trainer: mockTrainer,
    trainings: mockTrainings,
    isFriend: false,
    isInSubscribers: false,
    selectedPage: 1,
    onAddFriend: jest.fn(),
    onRemoveFriend: jest.fn(),
    onAddSubscribe: jest.fn(),
    onRemoveSubscribe: jest.fn(),
    onPreviousTrainingsClick: jest.fn(),
    onNextTrainingsClick: jest.fn(),
  };

  it('renders TrainerCard component', () => {
    render(
      <Router>
        <TrainerCard {...mockProps} />
      </Router>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText(Location.Petrograd)).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('handles "Добавить в друзья" button click', () => {
    render(
      <Router>
        <TrainerCard {...mockProps} />
      </Router>
    );

    const addButton = screen.getByText('Добавить в друзья');
    fireEvent.click(addButton);

    expect(mockProps.onAddFriend).toHaveBeenCalled();
  });
});
