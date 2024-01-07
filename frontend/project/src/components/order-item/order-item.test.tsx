import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mockState, mockStore, orderMock } from '../../utils/mocks';
import OrderItem from './order-item';

describe('OrderItem', () => {
  it('renders OrderItem component with correct attributes', () => {
    const state = mockState();
    const store = mockStore(state);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OrderItem order={orderMock} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Training Name')).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
  });
});
