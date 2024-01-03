import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PersonalAccountUser from './personal-account-user';
import { Role } from '../../types/role.enum';
import { mockState, mockStore } from '../../utils/mocks';
import { Provider } from 'react-redux';

describe('PersonalAccountUser', () => {
  it('renders PersonalAccountUser component with correct attributes and handles input changes', () => {
    const state = mockState();

    state.user.user.role = Role.User;
    state.user.user.id = '123456qwerty';

    const store = mockStore(state);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PersonalAccountUser />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Мои друзья')).toBeInTheDocument();
    expect(screen.getByText('Мои покупки')).toBeInTheDocument();

    const dailyCaloriesInput = screen.getByLabelText('План на день, ккал');
    const weeklyCaloriesInput = screen.getByLabelText('План на неделю, ккал');
    expect(dailyCaloriesInput).toBeInTheDocument();
    expect(weeklyCaloriesInput).toBeInTheDocument();
  });
});
