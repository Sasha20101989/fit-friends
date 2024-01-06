import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Role } from '../../types/role.enum';
import { MemoryRouter } from 'react-router-dom';
import UserStatus from './user-status';
import { mockState, mockStore } from '../../utils/mocks';

describe('UserStatus Component', () => {
  it('renders status correctly for user', () => {
    const state = mockState();

    state.user.user.role = Role.User;
    state.user.user.id = '123456qwerty';
    state.user.user.readinessForWorkout = true;

    const store = mockStore(state);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserStatus isFormEditable={false} currentUser={state.user.user} />
        </MemoryRouter>
      </Provider>
    );

    const checkbox = screen.getByLabelText('Готов к тренировке');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  it('renders status correctly for trainer', () => {
    const state = mockState();

    state.user.trainer.role = Role.Trainer;
    state.user.trainer.id = '123456qwerty';
    state.user.trainer.personalTraining = false;

    const store = mockStore(state);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserStatus isFormEditable={false} currentUser={state.user.trainer} />
        </MemoryRouter>
      </Provider>
    );

    const checkbox = screen.getByLabelText('Готов тренировать');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('dispatches changeCurrentUserReadiessToWorkout on checkbox change when form is editable for user', () => {
    const state = mockState();

    state.user.user.role = Role.User;
    state.user.user.id = '123456qwerty';
    state.user.user.readinessForWorkout = true;

    const store = mockStore(state);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserStatus isFormEditable={true} currentUser={state.user.user} />
        </MemoryRouter>
      </Provider>
    );

    const checkbox = screen.getByLabelText('Готов к тренировке');
    fireEvent.click(checkbox);

    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'user/changeCurrentUserReadiessToWorkout', payload: false }]);
  });

  it('dispatches changeCurrentUserReadiessToWorkout on checkbox change when form is editable for trainer', () => {
    const state = mockState();

    state.user.trainer.role = Role.Trainer;
    state.user.trainer.id = '123456qwerty';
    state.user.trainer.personalTraining = false;

    const store = mockStore(state);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserStatus isFormEditable={true} currentUser={state.user.trainer} />
        </MemoryRouter>
      </Provider>
    );

    const checkbox = screen.getByLabelText('Готов тренировать');
    fireEvent.click(checkbox);

    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'user/changeCurrentUserReadiessToWorkout', payload: true }]);
  });

  it('does not dispatch changeCurrentUserReadiessToWorkout on checkbox change when form is not editable', () => {
    const state = mockState();

    state.user.user.role = Role.User;
    state.user.user.id = '123456qwerty';
    state.user.user.readinessForWorkout = true;

    const store = mockStore(state);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserStatus isFormEditable={false} currentUser={state.user.user} />
        </MemoryRouter>
      </Provider>
    );

    const checkbox = screen.getByLabelText('Готов к тренировке');
    fireEvent.click(checkbox);

    const actions = store.getActions();
    expect(actions).toEqual([]);
  });
});
