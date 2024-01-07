import { render, screen } from '@testing-library/react';
import Header from './header';
import { mockState, mockStore } from '../../utils/mocks';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Role } from '../../types/role.enum';

describe('Header', () => {
  it('renders Header component with correct attributes', () => {
    const state = mockState();

    state.user.user.role = Role.User;
    state.user.user.id = '123456qwerty';

    const store = mockStore(state);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();

    const navItems = screen.getAllByTestId(/^nav-item-/i);
    expect(navItems).toHaveLength(4);
  });
});
