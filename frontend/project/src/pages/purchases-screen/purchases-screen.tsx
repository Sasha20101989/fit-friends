import GoBack from '../../components/go-back/go-back';
import Layout from '../../components/layout/layout';
import ThumbnailPicture from '../../components/thumbnail-picture/thumbnail-picture';
import ThumbnailTrainingWrapper from '../../components/thumbnail-training-wrapper/thumbnail-training-wrapper';
import { AppRoute } from '../../const';

function PurchasesScreen() : JSX.Element {
  const id = null;

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
            <ul className="my-purchases__list">
              <li className="my-purchases__item">
                <div className="thumbnail-training">
                  <div className="thumbnail-training__inner">
                    <ThumbnailPicture imageSrc={'img/content/thumbnails/training-01'} sourceName={'thumbnail-training__image'} width={330} height={190} alt={'тренировка'}/>
                    <p className="thumbnail-training__price"><span className="thumbnail-training__price-value">800</span><span>₽</span>
                    </p>
                    <h2 className="thumbnail-training__title">energy</h2>
                    <div className="thumbnail-training__info">
                      <ul className="thumbnail-training__hashtags-list">
                        <li className="thumbnail-training__hashtags-item">
                          <div className="hashtag thumbnail-training__hashtag">
                            <span>#пилатес</span>
                          </div>
                        </li>
                        <li className="thumbnail-training__hashtags-item">
                          <div className="hashtag thumbnail-training__hashtag">
                            <span>#320ккал</span>
                          </div>
                        </li>
                      </ul>
                      <div className="thumbnail-training__rate">
                        <svg width="16" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-star"></use>
                        </svg><span className="thumbnail-training__rate-value">4</span>
                      </div>
                    </div>
                    <div className="thumbnail-training__text-wrapper">
                      <p className="thumbnail-training__text">Упражнения укрепляют мышечный корсет, делают суставы более гибкими, улучшают осанку и&nbsp;координацию.</p>
                    </div>
                    {id && <ThumbnailTrainingWrapper trainingId={id}/>}
                  </div>
                </div>
              </li>
            </ul>
            <div className="show-more my-purchases__show-more">
              {/* {trainings.length > 0 && queryParams.limit && trainings.length % queryParams.limit === 0 && (
                  <ShowMore onShowMoreClick={handleShowMoreClick}/>
                )} */}
              <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
            </div>
          </div>
        </div>
      </section>
    </Layout>

  );
}
export default PurchasesScreen;
