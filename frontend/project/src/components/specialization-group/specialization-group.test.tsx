import { render, screen } from '@testing-library/react';
import { Role } from '../../types/role.enum';
import { WorkoutType } from '../../types/workout-type.enum';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mockState, mockStore } from '../../utils/mocks';
import SpecializationGroup from './specialization-group';

describe('SpecializationGroup', () => {
  it('renders the SpecializationGroup component for a User', () => {
    const state = mockState();
    state.user.user.id = '1';
    state.user.user.role = Role.User;
    state.user.user.workoutTypes = [WorkoutType.Crossfit, WorkoutType.Stretching];
    const store = mockStore(state);

    const mockOnSpecializationChange = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SpecializationGroup currentUser={state.user.user} error="" onSpecializationChange={mockOnSpecializationChange}/>
        </MemoryRouter>
      </Provider>
    );

    const yogaCheckbox = screen.getByLabelText(WorkoutType.Yoga);
    const strengthCheckbox = screen.getByLabelText(WorkoutType.Stretching);

    expect(yogaCheckbox).toBeInTheDocument();
    expect(strengthCheckbox).toBeInTheDocument();
  });

  it('renders the SpecializationGroup component for a Trainer', () => {
    const state = mockState();
    state.user.trainer.id = '1';
    state.user.trainer.role = Role.Trainer;
    state.user.trainer.workoutTypes = [WorkoutType.Crossfit, WorkoutType.Stretching];
    const store = mockStore(state);

    const mockOnSpecializationChange = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SpecializationGroup currentUser={state.user.trainer} error="" onSpecializationChange={mockOnSpecializationChange} />
        </MemoryRouter>
      </Provider>
    );

    const cardioCheckbox = screen.getByLabelText(WorkoutType.Crossfit);
    const strengthCheckbox = screen.getByLabelText(WorkoutType.Stretching);

    expect(cardioCheckbox).toBeInTheDocument();
    expect(strengthCheckbox).toBeInTheDocument();
  });

  it('renders an error message when there is an error', () => {
    const errorMessage = 'Invalid specialization';
    const state = mockState();
    state.user.user.id = '1';
    state.user.user.role = Role.User;
    const store = mockStore(state);

    const mockOnSpecializationChange = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SpecializationGroup currentUser={state.user.user} error={errorMessage} onSpecializationChange={mockOnSpecializationChange}/>
        </MemoryRouter>
      </Provider>
    );

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });
});
