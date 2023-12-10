import Layout from '../../components/layout/layout';
import ThumbnailPicture from '../../components/thumbnail-picture/thumbnail-picture';
import { Link } from 'react-router-dom';
import { Location } from '../../types/location.enum';

function UsersCatalogScreen() : JSX.Element {
  return(
    <Layout>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Каталог пользователей</h1>
            <div className="user-catalog-form">
              <h2 className="visually-hidden">Каталог пользователя</h2>
              <div className="user-catalog-form__wrapper">
                <button className="btn-flat btn-flat--underlined user-catalog-form__btnback" type="button">
                  <svg width="14" height="10" aria-hidden="true">
                    <use xlinkHref="#arrow-left"></use>
                  </svg><span>Назад</span>
                </button>
                <h3 className="user-catalog-form__title">Фильтры</h3>
                <form className="user-catalog-form__form">
                  <div className="user-catalog-form__block user-catalog-form__block--location">
                    <h4 className="user-catalog-form__block-title">Локация, станция метро</h4>
                    <ul className="user-catalog-form__check-list">
                      {Object.values(Location).map((loc) => (
                        <li key={loc} className="user-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value={loc} name="user-agreement"/>
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">{loc}</span>
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <button className="btn-show-more user-catalog-form__btn-show" type="button"><span>Посмотреть все</span>
                      <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
                        <use xlinkHref="#arrow-down"></use>
                      </svg>
                    </button>
                  </div>
                  <div className="user-catalog-form__block user-catalog-form__block--spezialization">
                    <h4 className="user-catalog-form__block-title">Специализация</h4>
                    <ul className="user-catalog-form__check-list">
                      <li className="user-catalog-form__check-list-item">
                        <div className="custom-toggle custom-toggle--checkbox">
                          <label>
                            <input type="checkbox" value="spezialization-1" name="spezialization"/>
                            <span className="custom-toggle__icon">
                              <svg width="9" height="6" aria-hidden="true">
                                <use xlinkHref="#arrow-check"></use>
                              </svg>
                            </span>
                            <span className="custom-toggle__label">Аэробика</span>
                          </label>
                        </div>
                      </li>
                      <li className="user-catalog-form__check-list-item">
                        <div className="custom-toggle custom-toggle--checkbox">
                          <label>
                            <input type="checkbox" value="spezialization-1" name="spezialization"/>
                            <span className="custom-toggle__icon">
                              <svg width="9" height="6" aria-hidden="true">
                                <use xlinkHref="#arrow-check"></use>
                              </svg>
                            </span>
                            <span className="custom-toggle__label">Бег</span>
                          </label>
                        </div>
                      </li>
                      <li className="user-catalog-form__check-list-item">
                        <div className="custom-toggle custom-toggle--checkbox">
                          <label>
                            <input type="checkbox" value="spezialization-1" name="spezialization"/>
                            <span className="custom-toggle__icon">
                              <svg width="9" height="6" aria-hidden="true">
                                <use xlinkHref="#arrow-check"></use>
                              </svg>
                            </span>
                            <span className="custom-toggle__label">Бокс</span>
                          </label>
                        </div>
                      </li>
                      <li className="user-catalog-form__check-list-item">
                        <div className="custom-toggle custom-toggle--checkbox">
                          <label>
                            <input type="checkbox" value="spezialization-1" name="spezialization"/>
                            <span className="custom-toggle__icon">
                              <svg width="9" height="6" aria-hidden="true">
                                <use xlinkHref="#arrow-check"></use>
                              </svg>
                            </span>
                            <span className="custom-toggle__label">Йога</span>
                          </label>
                        </div>
                      </li>
                      <li className="user-catalog-form__check-list-item">
                        <div className="custom-toggle custom-toggle--checkbox">
                          <label>
                            <input type="checkbox" value="spezialization-1" name="spezialization"/>
                            <span className="custom-toggle__icon">
                              <svg width="9" height="6" aria-hidden="true">
                                <use xlinkHref="#arrow-check"></use>
                              </svg>
                            </span>
                            <span className="custom-toggle__label">Кроссфит</span>
                          </label>
                        </div>
                      </li>
                    </ul>
                    <button className="btn-show-more user-catalog-form__btn-show" type="button">
                      <span>Посмотреть все</span>
                      <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
                        <use xlinkHref="#arrow-down"></use>
                      </svg>
                    </button>
                  </div>
                  <div className="user-catalog-form__block user-catalog-form__block--level">
                    <h4 className="user-catalog-form__block-title">Ваш уровень</h4>
                    <div className="custom-toggle-radio">
                      <div className="custom-toggle-radio__block">
                        <label>
                          <input type="radio" name="user-agreement"/>
                          <span className="custom-toggle-radio__icon"></span>
                          <span className="custom-toggle-radio__label">Новичок</span>
                        </label>
                      </div>
                      <div className="custom-toggle-radio__block">
                        <label>
                          <input type="radio" name="user-agreement"/>
                          <span className="custom-toggle-radio__icon"></span>
                          <span className="custom-toggle-radio__label">Любитель</span>
                        </label>
                      </div>
                      <div className="custom-toggle-radio__block">
                        <label>
                          <input type="radio" name="user-agreement" value="user-agreement-1"/>
                          <span className="custom-toggle-radio__icon"></span>
                          <span className="custom-toggle-radio__label">Профессионал</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="user-catalog-form__block">
                    <h3 className="user-catalog-form__title user-catalog-form__title--sort">Сортировка</h3>
                    <div className="btn-radio-sort">
                      <label>
                        <input type="radio" name="sort"/>
                        <span className="btn-radio-sort__label">Тренеры</span>
                      </label>
                      <label>
                        <input type="radio" name="sort"/>
                        <span className="btn-radio-sort__label">Пользователи</span>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="inner-page__content">
              <div className="users-catalog">
                <ul className="users-catalog__list">
                  <li className="users-catalog__item">
                    <div className="thumbnail-user thumbnail-user--role-user">
                      <ThumbnailPicture imageSrc={'img/content/thumbnails/user-01'} sourceName={'thumbnail-user__image'} width={82} height={82} alt={'аватар пользователя'}/>
                      <div className="thumbnail-user__header">
                        <h3 className="thumbnail-user__name">Елизавета</h3>
                        <div className="thumbnail-user__location">
                          <svg width="14" height="16" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <address className="thumbnail-user__location-address">Петроградская</address>
                        </div>
                      </div>
                      <ul className="thumbnail-user__hashtags-list">
                        <li className="thumbnail-user__hashtags-item">
                          <div className="hashtag thumbnail-user__hashtag"><span>#стретчинг</span></div>
                        </li>
                        <li className="thumbnail-user__hashtags-item">
                          <div className="hashtag thumbnail-user__hashtag"><span>#йога</span></div>
                        </li>
                      </ul>
                      <Link className="btn btn--medium thumbnail-user__button" to="">Подробнее</Link>
                    </div>
                  </li>
                </ul>
                <div className="show-more users-catalog__show-more">
                  <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
                  <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
export default UsersCatalogScreen;
