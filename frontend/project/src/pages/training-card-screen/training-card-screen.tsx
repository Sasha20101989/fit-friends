import ThumbnailPicture from '../../components/thumbnail-picture/thumbnail-picture';

function TrainingCardScreen() : JSX.Element {
  return(
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Карточка тренировки</h1>
          <aside className="reviews-side-bar">
            <button className="btn-flat btn-flat--underlined reviews-side-bar__back" type="button">
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-left"></use>
              </svg><span>Назад</span>
            </button>
            <h2 className="reviews-side-bar__title">Отзывы</h2>
            <ul className="reviews-side-bar__list">
              <li className="reviews-side-bar__item">
                <div className="review">
                  <div className="review__user-info">
                    <ThumbnailPicture imageSrc={'img/content/avatars/users//photo-1'} sourceName={'review__user-photo'} width={64} height={64}/>
                    <span className="review__user-name">Никита</span>
                    <div className="review__rating">
                      <svg width="16" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg><span>5</span>
                    </div>
                  </div>
                  <p className="review__comment">Эта тренировка для меня зарядка по&nbsp;утрам, помогает проснуться.</p>
                </div>
              </li>
            </ul>
            <button className="btn btn--medium reviews-side-bar__button" type="button">Оставить отзыв</button>
          </aside>
          <div className="training-card">
            <div className="training-info">
              <h2 className="visually-hidden">Информация о тренировке</h2>
              <div className="training-info__header">
                <div className="training-info__coach">
                  <ThumbnailPicture imageSrc={'img/content/avatars/coaches//photo-1'} sourceName={'training-info__coach'} width={64} height={64}/>
                  <div className="training-info__coach-info">
                    <span className="training-info__label">Тренер</span>
                    <span className="training-info__name">Валерия</span>
                  </div>
                </div>
              </div>
              <div className="training-info__main-content">
                <form action="#" method="get">
                  <div className="training-info__form-wrapper">
                    <div className="training-info__info-wrapper">
                      <div className="training-info__input training-info__input--training">
                        <label><span className="training-info__label">Название тренировки</span>
                          <input type="text" name="training" value="energy"/>
                        </label>
                        <div className="training-info__error">Обязательное поле</div>
                      </div>
                      <div className="training-info__textarea">
                        <label><span className="training-info__label">Описание тренировки</span>
                          <textarea name="description" disabled>Упражнения укрепляют мышечный корсет, делают суставы более гибкими, улучшают осанку и&nbsp;координацию.</textarea>
                        </label>
                      </div>
                    </div>
                    <div className="training-info__rating-wrapper">
                      <div className="training-info__input training-info__input--rating">
                        <label>
                          <span className="training-info__label">Рейтинг</span>
                          <span className="training-info__rating-icon">
                            <svg width="18" height="18" aria-hidden="true">
                              <use xlinkHref="#icon-star"></use>
                            </svg>
                          </span>
                          <input type="number" name="rating" value="4"/>
                        </label>
                      </div>
                      <ul className="training-info__list">
                        <li className="training-info__item">
                          <div className="hashtag hashtag--white">
                            <span>#пилатес</span>
                          </div>
                        </li>
                        <li className="training-info__item">
                          <div className="hashtag hashtag--white">
                            <span>#для_всех</span>
                          </div>
                        </li>
                        <li className="training-info__item">
                          <div className="hashtag hashtag--white">
                            <span>#320ккал</span>
                          </div>
                        </li>
                        <li className="training-info__item">
                          <div className="hashtag hashtag--white">
                            <span>#30_50минут</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="training-info__price-wrapper">
                      <div className="training-info__input training-info__input--price">
                        <label><span className="training-info__label">Стоимость</span>
                          <input type="text" name="price" value="800 ₽"/>
                        </label>
                        <div className="training-info__error">Введите число</div>
                      </div>
                      <button className="btn training-info__buy" type="button">Купить</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="training-video">
              <h2 className="training-video__title">Видео</h2>
              <div className="training-video__video">
                <ThumbnailPicture imageSrc={'img/content/avatars/coaches//photo-1'} sourceName={'training-info__coach'} width={64} height={64}/>
                <ThumbnailPicture imageSrc={'img/content/training-video/video-thumbnail'} sourceName={'training-video__thumbnail'} width={922} height={566}/>
                <button className="training-video__play-button btn-reset">
                  <svg width="18" height="30" aria-hidden="true">
                    <use xlinkHref="#icon-arrow"></use>
                  </svg>
                </button>
              </div>
              <div className="training-video__buttons-wrapper">
                <button className="btn training-video__button training-video__button--start" type="button" disabled>Приступить</button>
                <button className="btn training-video__button training-video__button--stop" type="button">Закончить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default TrainingCardScreen;
