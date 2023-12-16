import { memo } from 'react';
import OrderItem from '../order-item/order-item';
import { TrainingOrder } from '../../types/training-order.type';

type OrderListProps = {
  orders: TrainingOrder[];
};

function OrderList({orders}: OrderListProps): JSX.Element {
  return (
    <ul className="my-orders__list">
      {orders.map((order) => (
        <OrderItem key={order.name} order={order} />
      ))}
    </ul>
  );
}

export default memo(OrderList);
