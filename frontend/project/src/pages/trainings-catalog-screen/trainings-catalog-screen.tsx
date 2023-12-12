import ThumbnailPicture from '../../components/thumbnail-picture/thumbnail-picture';
import Layout from '../../components/layout/layout';
import ThumbnailTrainingWrapper from '../../components/thumbnail-training-wrapper/thumbnail-training-wrapper';

function TrainingsCatalogScreen() : JSX.Element {
  const id = null;
  return(
    <Layout>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Каталог тренировок</h1>
            <div className="gym-catalog-form">
              <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
              <div className="gym-catalog-form__wrapper">
                <button className="btn-flat btn-flat--underlined gym-catalog-form__btnback" type="button">
                  <svg width="14" height="10" aria-hidden="true">
                    <use xlinkHref="#arrow-left"></use>
                  </svg><span>Назад</span>
                </button>
                <h3 className="gym-catalog-form__title">Фильтры</h3>
                <form className="gym-catalog-form__form">
                  <div className="gym-catalog-form__block gym-catalog-form__block--price">
                    <h4 className="gym-catalog-form__block-title">Цена, ₽</h4>
                    <div className="filter-price">
                      <div className="filter-price__input-text filter-price__input-text--min">
                        <input type="number" id="text-min" name="text-min" value="0"/>
                        <label htmlFor="text-min">от</label>
                      </div>
                      <div className="filter-price__input-text filter-price__input-text--max">
                        <input type="number" id="text-max" name="text-max" value="3200"/>
                        <label htmlFor="text-max">до</label>
                      </div>
                    </div>
                    <div className="filter-range">
                      <div className="filter-range__scale">
                        <div className="filter-range__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
                      </div>
                      <div className="filter-range__control">
                        <button className="filter-range__min-toggle"><span className="visually-hidden">Минимальное значение</span></button>
                        <button className="filter-range__max-toggle"><span className="visually-hidden">Максимальное значение</span></button>
                      </div>
                    </div>
                  </div>
                  <div className="gym-catalog-form__block gym-catalog-form__block--calories">
                    <h4 className="gym-catalog-form__block-title">Калории</h4>
                    <div className="filter-calories">
                      <div className="filter-calories__input-text filter-calories__input-text--min">
                        <input type="number" id="text-min-cal" name="text-min-cal"/>
                        <label htmlFor="text-min-cal">от</label>
                      </div>
                      <div className="filter-calories__input-text filter-calories__input-text--max">
                        <input type="number" id="text-max-cal" name="text-max-cal"/>
                        <label htmlFor="text-max-cal">до</label>
                      </div>
                    </div>
                    <div className="filter-range">
                      <div className="filter-range__scale">
                        <div className="filter-range__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
                      </div>
                      <div className="filter-range__control">
                        <button className="filter-range__min-toggle"><span className="visually-hidden">Минимальное значение</span></button>
                        <button className="filter-range__max-toggle"><span className="visually-hidden">Максимальное значение</span></button>
                      </div>
                    </div>
                  </div>
                  <div className="gym-catalog-form__block gym-catalog-form__block--rating">
                    <h4 className="gym-catalog-form__block-title">Рейтинг</h4>
                    <div className="filter-raiting">
                      <div className="filter-raiting__scale">
                        <div className="filter-raiting__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
                      </div>
                      <div className="filter-raiting__control">
                        <button className="filter-raiting__min-toggle"><span className="visually-hidden">Минимальное значение</span></button><span>1</span>
                        <button className="filter-raiting__max-toggle"><span className="visually-hidden">Максимальное значение</span></button><span>5</span>
                      </div>
                    </div>
                  </div>
                  <div className="gym-catalog-form__block gym-catalog-form__block--type">
                    <h4 className="gym-catalog-form__block-title">Тип</h4>
                    <ul className="gym-catalog-form__check-list">
                      <li className="gym-catalog-form__check-list-item">
                        <div className="custom-toggle custom-toggle--checkbox">
                          <label>
                            <input type="checkbox" value="type-1" name="type"/>
                            <span className="custom-toggle__icon">
                              <svg width="9" height="6" aria-hidden="true">
                                <use xlinkHref="#arrow-check"></use>
                              </svg>
                            </span>
                            <span className="custom-toggle__label">йога</span>
                          </label>
                        </div>
                      </li>
                      <li className="gym-catalog-form__check-list-item">
                        <div className="custom-toggle custom-toggle--checkbox">
                          <label>
                            <input type="checkbox" value="type-1" name="type"/>
                            <span className="custom-toggle__icon">
                              <svg width="9" height="6" aria-hidden="true">
                                <use xlinkHref="#arrow-check"></use>
                              </svg>
                            </span>
                            <span className="custom-toggle__label">силовые</span>
                          </label>
                        </div>
                      </li>
                      <li className="gym-catalog-form__check-list-item">
                        <div className="custom-toggle custom-toggle--checkbox">
                          <label>
                            <input type="checkbox" value="type" name="type"/>
                            <span className="custom-toggle__icon">
                              <svg width="9" height="6" aria-hidden="true">
                                <use xlinkHref="#arrow-check"></use>
                              </svg>
                            </span>
                            <span className="custom-toggle__label">кроссфит</span>
                          </label>
                        </div>
                      </li>
                      <li className="gym-catalog-form__check-list-item">
                        <div className="custom-toggle custom-toggle--checkbox">
                          <label>
                            <input type="checkbox" value="type-1" name="type"/>
                            <span className="custom-toggle__icon">
                              <svg width="9" height="6" aria-hidden="true">
                                <use xlinkHref="#arrow-check"></use>
                              </svg>
                            </span>
                            <span className="custom-toggle__label">бокс</span>
                          </label>
                        </div>
                      </li>
                      <li className="gym-catalog-form__check-list-item">
                        <div className="custom-toggle custom-toggle--checkbox">
                          <label>
                            <input type="checkbox" value="type-1" name="type"/>
                            <span className="custom-toggle__icon">
                              <svg width="9" height="6" aria-hidden="true">
                                <use xlinkHref="#arrow-check"></use>
                              </svg>
                            </span>
                            <span className="custom-toggle__label">бег</span>
                          </label>
                        </div>
                      </li>
                      <li className="gym-catalog-form__check-list-item">
                        <div className="custom-toggle custom-toggle--checkbox">
                          <label>
                            <input type="checkbox" value="type-1" name="type"/>
                            <span className="custom-toggle__icon">
                              <svg width="9" height="6" aria-hidden="true">
                                <use xlinkHref="#arrow-check"></use>
                              </svg>
                            </span>
                            <span className="custom-toggle__label">аэробика</span>
                          </label>
                        </div>
                      </li>
                      <li className="gym-catalog-form__check-list-item">
                        <div className="custom-toggle custom-toggle--checkbox">
                          <label>
                            <input type="checkbox" value="type-1" name="type"/>
                            <span className="custom-toggle__icon">
                              <svg width="9" height="6" aria-hidden="true">
                                <use xlinkHref="#arrow-check"></use>
                              </svg>
                            </span>
                            <span className="custom-toggle__label">пилатес</span>
                          </label>
                        </div>
                      </li>
                      <li className="gym-catalog-form__check-list-item">
                        <div className="custom-toggle custom-toggle--checkbox">
                          <label>
                            <input type="checkbox" value="type-1" name="type"/>
                            <span className="custom-toggle__icon">
                              <svg width="9" height="6" aria-hidden="true">
                                <use xlinkHref="#arrow-check"></use>
                              </svg>
                            </span>
                            <span className="custom-toggle__label">стрейчинг</span>
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="gym-catalog-form__block gym-catalog-form__block--sort">
                    <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
                    <div className="btn-radio-sort gym-catalog-form__radio">
                      <label>
                        <input type="radio" name="sort"/>
                        <span className="btn-radio-sort__label">Дешевле</span>
                      </label>
                      <label>
                        <input type="radio" name="sort"/>
                        <span className="btn-radio-sort__label">Дороже</span>
                      </label>
                      <label>
                        <input type="radio" name="sort"/>
                        <span className="btn-radio-sort__label">Бесплатные</span>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="training-catalog">
              <ul className="training-catalog__list">
                <li className="training-catalog__item">
                  <div className="thumbnail-training">
                    <div className="thumbnail-training__inner">
                      <ThumbnailPicture imageSrc={'img/content/thumbnails/training-02'} sourceName={'thumbnail-training__image'} width={330} height={190} alt={'тренировка'}/>
                      <p className="thumbnail-training__price">Бесплатно
                      </p>
                      <h3 className="thumbnail-training__title">crossfit</h3>
                      <div className="thumbnail-training__info">
                        <ul className="thumbnail-training__hashtags-list">
                          <li className="thumbnail-training__hashtags-item">
                            <div className="hashtag thumbnail-training__hashtag"><span>#кроссфит</span></div>
                          </li>
                          <li className="thumbnail-training__hashtags-item">
                            <div className="hashtag thumbnail-training__hashtag"><span>#1200ккал</span></div>
                          </li>
                        </ul>
                        <div className="thumbnail-training__rate">
                          <svg width="16" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-star"></use>
                          </svg><span className="thumbnail-training__rate-value">5</span>
                        </div>
                      </div>
                      <div className="thumbnail-training__text-wrapper">
                        <p className="thumbnail-training__text">Сложный комплекс упражнений для профессиональных атлетов на&nbsp;отработку показателей в&nbsp;классическом стиле.</p>
                      </div>
                      {id && <ThumbnailTrainingWrapper trainingId={id}/>}
                    </div>
                  </div>
                </li>
              </ul>
              <div className="show-more training-catalog__show-more">
                <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
                <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
export default TrainingsCatalogScreen;
