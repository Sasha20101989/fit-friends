import { render, screen, fireEvent } from '@testing-library/react';
import UserCard from './user-card';
import { initialUserState } from '../../utils/mocks';
import { Location } from '../../types/location.enum';
import { WorkoutType } from '../../types/workout-type.enum';
import { Role } from '../../types/role.enum';
import { MemoryRouter } from 'react-router-dom';

describe('UserCard Component', () => {
  const mockUser = {
    ...initialUserState,
    name: 'John Doe',
    location: Location.Pioneer,
    description: 'Sample description',
    workoutTypes: [WorkoutType.Boxing, WorkoutType.Aerobics],
    role: Role.User,
    readinessForWorkout: true,
  };

  it('renders user information correctly', () => {
    const mockOnAddFriend = jest.fn();
    const mockOnRemoveFriend = jest.fn();

    render(
      <MemoryRouter>
        <UserCard
          user={mockUser}
          isFriend={false}
          onAddFriend={mockOnAddFriend}
          onRemoveFriend={mockOnRemoveFriend}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();

    const locationLink = screen.getByRole('link', { name: /пионерская/i });
    expect(locationLink).toBeInTheDocument();
    expect(locationLink).toHaveAttribute('href', '/');

    expect(screen.getByText(/Готов к тренировке/i)).toBeInTheDocument();

    expect(screen.getByText(mockUser.description)).toBeInTheDocument();

    mockUser.workoutTypes.forEach((type) => {
      expect(screen.getByText(`#${type}`)).toBeInTheDocument();
    });

    const addButton = screen.getByRole('button', { name: /Добавить в друзья/i });
    expect(addButton).toBeInTheDocument();

    expect(screen.queryByRole('button', { name: /Убрать из друзей/i })).not.toBeInTheDocument();

    const cardGalery = screen.getByTestId('card-galery');
    expect(cardGalery).toBeInTheDocument();
  });

  it('handles Add to Friends button click', () => {
    const mockOnAddFriend = jest.fn();
    const mockOnRemoveFriend = jest.fn();

    render(
      <MemoryRouter>
        <UserCard
          user={mockUser}
          isFriend={false}
          onAddFriend={mockOnAddFriend}
          onRemoveFriend={mockOnRemoveFriend}
        />
      </MemoryRouter>
    );

    const addButton = screen.getByRole('button', { name: /Добавить в друзья/i });
    fireEvent.click(addButton);

    expect(mockOnAddFriend).toHaveBeenCalled();
  });

  it('handles Remove from Friends button click', () => {
    const mockOnAddFriend = jest.fn();
    const mockOnRemoveFriend = jest.fn();

    render(
      <MemoryRouter>
        <UserCard
          user={mockUser}
          isFriend
          onAddFriend={mockOnAddFriend}
          onRemoveFriend={mockOnRemoveFriend}
        />
      </MemoryRouter>
    );

    const removeButton = screen.getByRole('button', { name: /Убрать из друзей/i });
    fireEvent.click(removeButton);

    expect(mockOnRemoveFriend).toHaveBeenCalled();
  });

  it('handles Show Map link click', () => {
    const mockOnAddFriend = jest.fn();
    const mockOnRemoveFriend = jest.fn();

    render(
      <MemoryRouter>
        <UserCard
          user={mockUser}
          isFriend={false}
          onAddFriend={mockOnAddFriend}
          onRemoveFriend={mockOnRemoveFriend}
        />
      </MemoryRouter>
    );

    const locationLink = screen.getByRole('link', { name: /пионерская/i });
    fireEvent.click(locationLink);

    const popupMap = screen.getByTestId('popup-map');
    expect(popupMap).toBeInTheDocument();
    expect(popupMap).toHaveTextContent(/John Doe/i);
    expect(popupMap).toHaveTextContent(/пионерская/i);
  });
});
