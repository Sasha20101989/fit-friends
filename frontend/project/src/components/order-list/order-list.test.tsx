import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { orderMock } from '../../utils/mocks';
import OrderList from './order-list';

describe('OrderList', () => {
  it('renders OrderList component with correct attributes', () => {
    const orders = [orderMock];

    render(
      <MemoryRouter>
        <OrderList orders={orders} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('orders-list')).toBeInTheDocument();
  });
});
