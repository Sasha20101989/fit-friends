import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { TrainingOrder } from '../../types/training-order.type';
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import { AppRoute, MAX_ORDERS_COUNT } from '../../const';
import GoBack from '../../components/go-back/go-back';
import OrderList from '../../components/order-list/order-list';
import { fetchOrdersAction } from '../../store/api-actions/order-api-actions/order-api-actions';
import { getOrders } from '../../store/order-data/order-data.selectors';
import { OrderQueryParams } from '../../types/order-query-params';
import ShowMore from '../../components/show-more/show-more';
import { OrderSortingField } from '../../types/order-sorting-field.enum';
import { Sorting } from '../../types/sorting.enum';

function OrderScreen() : JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const orders: TrainingOrder[] | null = useAppSelector(getOrders);

  const initialQueryParams: OrderQueryParams = {
    limit: MAX_ORDERS_COUNT,
    trainerId: id || '',
  };

  const [queryParams, setQueryParams] = useState<OrderQueryParams>(initialQueryParams);

  const handleShowMoreClick = () => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      limit: (prevParams.limit || 0) + MAX_ORDERS_COUNT,
    }));
  };

  const handleSortClick = (field: OrderSortingField) => {
    const sortOrder =
      queryParams.typeOrder === field && queryParams.sortOrder === Sorting.Ascending
        ? Sorting.Descending
        : Sorting.Ascending;

    setQueryParams({
      ...queryParams,
      typeOrder: field,
      sortOrder,
    });
  };

  useEffect(() => {
    if(queryParams.trainerId){
      dispatch(fetchOrdersAction(queryParams));
    }
  }, [dispatch, queryParams]);

  return(
    <Layout>
      <section className="my-orders">
        <div className="container">
          <div className="my-orders__wrapper">
            <GoBack sourceName={'btn-flat btn-flat--underlined my-orders__back'} width={14} height={10} route={AppRoute.Main}/>
            <div className="my-orders__title-wrapper">
              <h1 className="my-orders__title">Мои заказы</h1>
              <div className="sort-for">
                <p>Сортировать по:</p>
                <div className="sort-for__btn-container">
                  <button
                    className="btn-filter-sort"
                    type="button"
                    onClick={() => handleSortClick(OrderSortingField.TotalSalesAmount)}
                  >
                    <span>Сумме</span>
                    <svg width="16" height="10" aria-hidden="true">
                      <use xlinkHref={`#icon-sort-${queryParams.typeOrder === OrderSortingField.TotalSalesAmount && queryParams.sortOrder === Sorting.Descending ? 'up' : 'down'}`} />
                    </svg>
                  </button>
                  <button
                    className="btn-filter-sort"
                    type="button"
                    onClick={() => handleSortClick(OrderSortingField.PurchasedQuantity)}
                  >
                    <span>Количеству</span>
                    <svg width="16" height="10" aria-hidden="true">
                      <use xlinkHref={`#icon-sort-${queryParams.typeOrder === OrderSortingField.PurchasedQuantity && queryParams.sortOrder === Sorting.Descending ? 'up' : 'down'}`} />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <OrderList orders={orders}/>
            <ShowMore sourceName={'show-more my-orders__show-more'} length={orders.length} limit={queryParams.limit} onShowMoreClick={handleShowMoreClick}/>
          </div>
        </div>
      </section>
    </Layout>
  );
}
export default OrderScreen;
