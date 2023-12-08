import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { TrainingOrder } from '../../types/training-order.type';
import { useParams } from 'react-router-dom';
import { fetchOrdersAction } from '../../store/api-actions/trainings-api-actions/trainings-api-actions';
import { getOrders } from '../../store/main-data/main-data.selectors';
import ThumbnailTrainingOrder from '../../components/thumbnail-training-order/thumbnail-training-order';
import Layout from '../../components/layout/layout';

function OrderScreen() : JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const orders: TrainingOrder[] | null = useAppSelector(getOrders);

  useEffect(() => {
    if(id){
      dispatch(fetchOrdersAction(id));
    }
  }, [dispatch, id]);

  return(
    <Layout>
      <section className="my-orders">
        <div className="container">
          <div className="my-orders__wrapper">
            <button className="btn-flat btn-flat--underlined my-orders__back" type="button">
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-left"></use>
              </svg><span>Назад</span>
            </button>
            <div className="my-orders__title-wrapper">
              <h1 className="my-orders__title">Мои заказы</h1>
              <div className="sort-for">
                <p>Сортировать по:</p>
                <div className="sort-for__btn-container">
                  <button className="btn-filter-sort" type="button"><span>Сумме</span>
                    <svg width="16" height="10" aria-hidden="true">
                      <use xlinkHref="#icon-sort-up"></use>
                    </svg>
                  </button>
                  <button className="btn-filter-sort" type="button"><span>Количеству</span>
                    <svg width="16" height="10" aria-hidden="true">
                      <use xlinkHref="#icon-sort-down"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <ul className="my-orders__list">
              {orders.map((order) => (
                <ThumbnailTrainingOrder key={order.name} order={order} />
              ))}
            </ul>
            <div className="show-more my-orders__show-more">
              <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
              <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
export default OrderScreen;
