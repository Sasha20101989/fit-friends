import GoBack from '../../components/go-back/go-back';
import Layout from '../../components/layout/layout';
import { AppRoute } from '../../const';

function PurchasesScreen() : JSX.Element {
  // const initialQueryParams: FetchTrainingsParams = {
  //   category: TrainingCategory.BASE,
  //   createdAtDirection: Sorting.Descending,
  // };

  // const [queryParams, setQueryParams] = useState<FetchTrainingsParams>(initialQueryParams);

  // const handleShowMoreClick = () => {
  //   setQueryParams((prevParams) => ({
  //     ...prevParams,
  //     limit: (prevParams.limit || 0) + MAX_TRAININGS_COUNT,
  //   }));
  // };

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
            {/* <TrainingList sourceName={'my-purchases__list'} itemSourceName={'my-purchases__item'} trainings={trainings}/> */}
            {/* <ShowMore sourceName={'show-more users-catalog__show-more'} length={trainings.length} limit={queryParams.limit} onShowMoreClick={handleShowMoreClick}/> */}
          </div>
        </div>
      </section>
    </Layout>

  );
}
export default PurchasesScreen;
