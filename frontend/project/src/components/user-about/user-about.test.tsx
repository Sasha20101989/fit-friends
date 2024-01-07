import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import UserAbout from './user-about';
import { Role } from '../../types/role.enum';
import { mockState, mockStore } from '../../utils/mocks';

describe('UserAbout', () => {
  it('renders UserAbout component with correct content', () => {
    const state = mockState();

    state.user.user.role = Role.User;
    state.user.user.id = '123456qwerty';
    state.user.user.name = 'Sasha';
    state.user.user.description = 'Fitness enthusiast';

    const store = mockStore(state);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserAbout isFormEditable error="" currentUser={state.user.user} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Обо мне')).toBeInTheDocument();
    expect(screen.getByLabelText('Имя')).toHaveValue('Sasha');
    expect(screen.getByLabelText('Описание')).toHaveValue('Fitness enthusiast');
  });
});
