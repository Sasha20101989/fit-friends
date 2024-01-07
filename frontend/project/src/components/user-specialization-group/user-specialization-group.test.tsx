import { render, fireEvent, screen } from '@testing-library/react';
import { WorkoutType } from '../../types/workout-type.enum';
import UserSpecializationGroup from './user-specialization-group';
import { MemoryRouter } from 'react-router-dom';
import { mockState, mockStore } from '../../utils/mocks';
import { Role } from '../../types/role.enum';
import { Provider } from 'react-redux';

describe('UserSpecializationGroup Component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders checkboxes with correct values and disabled state', () => {
    const state = mockState();

    state.user.user.role = Role.User;
    state.user.user.id = '123456qwerty';
    state.user.user.workoutTypes = [WorkoutType.Yoga];
    const store = mockStore(state);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserSpecializationGroup isFormEditable={false} workoutTypes={state.user.user.workoutTypes} />
        </MemoryRouter>
      </Provider>
    );

    const yogaCheckbox = screen.getByLabelText('йога');
    expect(yogaCheckbox).toBeInTheDocument();
    expect(yogaCheckbox).toBeChecked();

    const weightliftingCheckbox = screen.getByLabelText('силовые');
    expect(weightliftingCheckbox).toBeInTheDocument();
    expect(weightliftingCheckbox).not.toBeChecked();
  });

  it('does not call dispatch on checkbox change when form is not editable', () => {
    const state = mockState();

    state.user.user.role = Role.User;
    state.user.user.id = '123456qwerty';
    state.user.user.workoutTypes = [];
    const store = mockStore(state);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserSpecializationGroup isFormEditable={false} workoutTypes={state.user.user.workoutTypes} />
        </MemoryRouter>
      </Provider>
    );

    const yogaCheckbox = screen.getByLabelText('йога');
    fireEvent.click(yogaCheckbox);

    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
