import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { TrainingOrder } from '../../types/training-order.type';
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import { AppRoute} from '../../const';
import GoBack from '../../components/go-back/go-back';
import OrderList from '../../components/order-list/order-list';
import { fetchOrdersAction } from '../../store/api-actions/order-api-actions/order-api-actions';
import { getOrders } from '../../store/order-data/order-data.selectors';

function OrderScreen() : JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const orders: TrainingOrder[] | null = useAppSelector(getOrders);

  // const initialQueryParams: FetchTrainingsParams = {
  //   category: TrainingCategory.BASE,
  //   createdAtDirection: Sorting.Descending,
  // };

  //const [queryParams, setQueryParams] = useState<FetchTrainingsParams>(initialQueryParams);

  // const handleShowMoreClick = () => {
  //   setQueryParams((prevParams) => ({
  //     ...prevParams,
  //     limit: (prevParams.limit || 0) + MAX_TRAININGS_COUNT,
  //   }));
  // };

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
            <GoBack sourceName={'btn-flat btn-flat--underlined my-orders__back'} width={14} height={10} route={AppRoute.Main}/>
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
            <OrderList orders={orders}/>
            {/* <ShowMore sourceName={'show-more my-orders__show-more'} length={orders.length} limit={queryParams.limit} onShowMoreClick={handleShowMoreClick}/> */}
          </div>
        </div>
      </section>
    </Layout>
  );
}
export default OrderScreen;
