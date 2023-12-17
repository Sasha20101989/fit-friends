import { useEffect, useState } from 'react';
import GoBack from '../../components/go-back/go-back';
import Layout from '../../components/layout/layout';
import { AppRoute, MAX_BALANCE_COUNT } from '../../const';
import { BalanceQueryParams, fetchBalanceAction } from '../../store/api-actions/balance-api-actions/balance-api-actions';
import { Sorting } from '../../types/sorting.enum';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getBalance } from '../../store/balance-data/balance-data.selectors';
import { UserBalance } from '../../types/user-balance.type';
import TrainingList from '../../components/training-list/training-list';
import ShowMore from '../../components/show-more/show-more';
import { Training } from '../../types/training.type';

function PurchasesScreen() : JSX.Element {
  const dispatch = useAppDispatch();

  const balance: UserBalance[] = useAppSelector(getBalance);

  const initialQueryParams: BalanceQueryParams = {
    createdAtDirection: Sorting.Descending,
    limit: MAX_BALANCE_COUNT,
  };

  const [queryParams, setQueryParams] = useState<BalanceQueryParams>(initialQueryParams);

  const handleShowMoreClick = () => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      limit: (prevParams.limit || 0) + MAX_BALANCE_COUNT,
    }));
  };

  useEffect(() => {
    dispatch(fetchBalanceAction(queryParams));
  }, [dispatch, queryParams]);

  const trainings: Training[] = balance.map((userBalance) => userBalance.training);

  return(
    <Layout>
      <section className="my-purchases">
        <div className="container">
          <div className="my-purchases__wrapper">
            <GoBack sourceName={'btn-flat my-purchases__back'} width={14} height={10} route={AppRoute.Main}/>
            <div className="my-purchases__title-wrapper">
              <h1 className="my-purchases__title">Мои покупки</h1>
              <div className="my-purchases__controls">
                <div className="custom-toggle custom-toggle--switch custom-toggle--switch-right my-purchases__switch" data-validate-type="checkbox">
                  <label>
                    <input type="checkbox" value="user-agreement-1" name="user-agreement"/>
                    <span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg>
                    </span>
                    <span className="custom-toggle__label">Только активные</span>
                  </label>
                </div>
              </div>
            </div>
            <TrainingList sourceName={'my-purchases__list'} itemSourceName={'my-purchases__item'} trainings={trainings}/>
            <ShowMore sourceName={'show-more users-catalog__show-more'} length={trainings.length} limit={queryParams.limit} onShowMoreClick={handleShowMoreClick}/>
          </div>
        </div>
      </section>
    </Layout>

  );
}
export default PurchasesScreen;
