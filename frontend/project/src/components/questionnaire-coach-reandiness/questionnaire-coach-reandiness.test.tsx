import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { initialTrainerState, mockState, mockStore } from '../../utils/mocks';
import QuestionnaireCoachReandiness from './questionnaire-coach-reandiness';
import { Role } from '../../types/role.enum';

describe('QuestionnaireCoachReandiness', () => {
  it('renders with correct content', () => {
    const state = mockState();

    state.user.trainer = initialTrainerState;
    state.user.trainer.role = Role.Trainer;

    const store = mockStore(state);

    render(
      <Provider store={store}>
        <QuestionnaireCoachReandiness />
      </Provider>
    );

    expect(screen.getByText('Хочу дополнительно индивидуально тренировать')).toBeInTheDocument();
  });

  it('calls handleReadinessForWorkoutChange when checkbox is clicked', () => {
    const state = mockState();

    state.user.trainer = initialTrainerState;

    const store = mockStore(state);

    render(
      <Provider store={store}>
        <QuestionnaireCoachReandiness />
      </Provider>
    );

    const checkbox = screen.getByLabelText('Хочу дополнительно индивидуально тренировать');
    fireEvent.click(checkbox);

    expect(store.getActions()).toContainEqual({
      type: 'user/changeCurrentUserReadiessToWorkout',
      payload: true,
    });
  });
});
