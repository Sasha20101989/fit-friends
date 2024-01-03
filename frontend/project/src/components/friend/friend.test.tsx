import { render, screen, fireEvent } from '@testing-library/react';
import Friend from './friend';
import { RequestType } from '../../types/request-type.enum';
import { RequestStatus } from '../../types/request-status.enum';
import { notificationMessages } from '../../const';
import { Role } from '../../types/role.enum';
import { Gender } from '../../types/gender.enum';
import { TrainingLevel } from '../../types/training-level.enum';
import { WorkoutDuration } from '../../types/workout-duration.enum';
import { Location } from '../../types/location.enum';
import { WorkoutType } from '../../types/workout-type.enum';

const mockFriend = {
  email: 'john@mail.ru',
  password: '123456',
  role: Role.User,
  gender: Gender.Male,
  trainingLevel: TrainingLevel.Beginner,
  workoutDuration: WorkoutDuration.ExtraLong,
  caloriesToBurn: 2220,
  caloriesToSpend: 1110,
  friends: [],
  name: 'John Doe',
  location: Location.Petrograd,
  workoutTypes: [WorkoutType.Boxing, WorkoutType.Crossfit],
  readinessForWorkout: true,
  avatar: 'path/to/avatar.jpg',
};

const mockRequest = {
  requestType: RequestType.Friend,
  status: RequestStatus.Pending,
};

describe('Friend', () => {
  it('renders Friend component with correct values and handles accept/reject actions', () => {
    const onAcceptMock = jest.fn();
    const onRejectMock = jest.fn();

    render(
      <Friend
        friend={mockFriend}
        request={mockRequest}
        onAccept={onAcceptMock}
        onReject={onRejectMock}
      />
    );

    const friendElement = screen.getByText(mockFriend.name);
    expect(friendElement).toBeInTheDocument();

    // Проверяем, что запрос отображается и кнопки "Принять" и "Отклонить" также отображаются
    const requestStatusElement = screen.getByText(notificationMessages[mockRequest.requestType]);
    expect(requestStatusElement).toBeInTheDocument();

    const acceptButton = screen.getByText('Принять');
    const rejectButton = screen.getByText('Отклонить');
    expect(acceptButton).toBeInTheDocument();
    expect(rejectButton).toBeInTheDocument();

    // Симулируем клик по кнопке "Принять" и проверяем, что функция обратного вызова onAccept вызывается
    fireEvent.click(acceptButton);
    expect(onAcceptMock).toHaveBeenCalledWith(expect.anything(), mockRequest);

    // Симулируем клик по кнопке "Отклонить" и проверяем, что функция обратного вызова onReject вызывается
    fireEvent.click(rejectButton);
    expect(onRejectMock).toHaveBeenCalledWith(expect.anything(), mockRequest);
  });
});
