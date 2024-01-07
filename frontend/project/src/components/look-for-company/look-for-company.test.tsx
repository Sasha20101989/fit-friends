import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { initialUserState, mockState, mockStore } from '../../utils/mocks';
import LookForCompany from './look-for-company';

describe('LookForCompany', () => {
  it('renders LookForCompany component with correct attributes', () => {
    const state = mockState();

    const users = [
      initialUserState
    ];

    const store = mockStore(state);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LookForCompany
            lookForCompanyUsers={users}
            isPreviousButtonDisabled={false}
            isNextButtonDisabled={false}
            onPreviousClick={jest.fn()}
            onNextClick={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    );

    const lookForCompanyElement = screen.getByTestId('look-for-company');
    expect(lookForCompanyElement).toBeInTheDocument();

    const titleElement = screen.getByText('Ищут компанию для тренировки');
    expect(titleElement).toBeInTheDocument();

    const showAllButton = screen.getByText('Смотреть все');
    expect(showAllButton).toBeInTheDocument();

    const userList = screen.getByTestId('look-for-company-users');
    expect(userList).toBeInTheDocument();
  });
});
