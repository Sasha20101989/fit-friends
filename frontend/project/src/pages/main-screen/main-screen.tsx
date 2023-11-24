import React from 'react';
import Header from '../../components/header/header';

function MainScreen(): JSX.Element {
  return(
    <React.Fragment>
      <Header/>
      <main>
        <h1 class="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
        <section class="special-for-you">
          <div class="container">
            <div class="special-for-you__wrapper">
              <div class="special-for-you__title-wrapper">
                <h2 class="special-for-you__title">Специально подобрано для вас</h2>
                <div class="special-for-you__controls">
                  <button class="btn-icon special-for-you__control" type="button" aria-label="previous">
                    <svg width="16" height="14" aria-hidden="true">
                      <use xlink:href="#arrow-left"></use>
                    </svg>
                  </button>
                  <button class="btn-icon special-for-you__control" type="button" aria-label="next">
                    <svg width="16" height="14" aria-hidden="true">
                      <use xlink:href="#arrow-right"></use>
                    </svg>
                  </button>
                </div>
              </div>
              <ul class="special-for-you__list">
                <li class="special-for-you__item">
                  <div class="thumbnail-preview">
                    <div class="thumbnail-preview__image">
                      <picture>
                        <source type="image/webp" srcset="img/content/thumbnails/preview-03.webp, img/content/thumbnails/preview-03@2x.webp 2x"><img src="img/content/thumbnails/preview-03.jpg" srcset="img/content/thumbnails/preview-03@2x.jpg 2x" width="452" height="191" alt="">
                      </picture>
                    </div>
                    <div class="thumbnail-preview__inner">
                      <h3 class="thumbnail-preview__title">crossfit</h3>
                      <div class="thumbnail-preview__button-wrapper">
                        <a class="btn btn--small thumbnail-preview__button" href="#">Подробнее</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="special-for-you__item">
                  <div class="thumbnail-preview">
                    <div class="thumbnail-preview__image">
                      <picture>
                        <source type="image/webp" srcset="img/content/thumbnails/preview-02.webp, img/content/thumbnails/preview-02@2x.webp 2x"><img src="img/content/thumbnails/preview-02.jpg" srcset="img/content/thumbnails/preview-02@2x.jpg 2x" width="452" height="191" alt="">
                      </picture>
                    </div>
                    <div class="thumbnail-preview__inner">
                      <h3 class="thumbnail-preview__title">power</h3>
                      <div class="thumbnail-preview__button-wrapper">
                        <a class="btn btn--small thumbnail-preview__button" href="#">Подробнее</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="special-for-you__item">
                  <div class="thumbnail-preview">
                    <div class="thumbnail-preview__image">
                      <picture>
                        <source type="image/webp" srcset="img/content/thumbnails/preview-01.webp, img/content/thumbnails/preview-01@2x.webp 2x"><img src="img/content/thumbnails/preview-01.jpg" srcset="img/content/thumbnails/preview-01@2x.jpg 2x" width="452" height="191" alt="">
                      </picture>
                    </div>
                    <div class="thumbnail-preview__inner">
                      <h3 class="thumbnail-preview__title">boxing</h3>
                      <div class="thumbnail-preview__button-wrapper">
                        <a class="btn btn--small thumbnail-preview__button" href="#">Подробнее</a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section class="special-offers">
          <div class="container">
            <div class="special-offers__wrapper">
              <h2 class="visually-hidden">Специальные предложения</h2>
              <ul class="special-offers__list">
                <li class="special-offers__item is-active">
                  <aside class="promo-slider">
                    <div class="promo-slider__overlay"></div>
                    <div class="promo-slider__image"><img src="img/content/promo-1.png" srcset="img/content/promo-1@2x.png 2x" width="1040" height="469" alt="promo-photo">
                    </div>
                    <div class="promo-slider__header">
                      <h3 class="promo-slider__title">Fitball</h3>
                      <div class="promo-slider__logo">
                        <svg width="74" height="74" aria-hidden="true">
                          <use xlink:href="#logotype"></use>
                        </svg>
                      </div>
                    </div><span class="promo-slider__text">Горячие предложения на тренировки на фитболе</span>
                    <div class="promo-slider__bottom-container">
                      <div class="promo-slider__slider-dots">
                        <button class="promo-slider__slider-dot--active promo-slider__slider-dot" aria-label="первый слайд"></button>
                        <button class="promo-slider__slider-dot" aria-label="второй слайд"></button>
                        <button class="promo-slider__slider-dot" aria-label="третий слайд"></button>
                      </div>
                      <div class="promo-slider__price-container">
                        <p class="promo-slider__price">1600 ₽</p>
                        <p class="promo-slider__sup">за занятие</p>
                        <p class="promo-slider__old-price">2000 ₽</p>
                      </div>
                    </div>
                  </aside>
                </li>
                <li class="special-offers__item">
                  <aside class="promo-slider">
                    <div class="promo-slider__overlay"></div>
                    <div class="promo-slider__image"><img src="img/content/promo-2.png" srcset="img/content/promo-2@2x.png 2x" width="1040" height="469" alt="promo-photo">
                    </div>
                    <div class="promo-slider__header">
                      <h3 class="promo-slider__title">Fleksbend</h3>
                      <div class="promo-slider__logo">
                        <svg width="74" height="74" aria-hidden="true">
                          <use xlink:href="#logotype"></use>
                        </svg>
                      </div>
                    </div><span class="promo-slider__text">Горячие предложения на&nbsp;Тренировки с&nbsp;резинкой для фитнеса</span>
                    <div class="promo-slider__bottom-container">
                      <div class="promo-slider__slider-dots">
                        <button class="promo-slider__slider-dot" aria-label="первый слайд"></button>
                        <button class="promo-slider__slider-dot--active promo-slider__slider-dot" aria-label="второй слайд"></button>
                        <button class="promo-slider__slider-dot" aria-label="третий слайд"></button>
                      </div>
                      <div class="promo-slider__price-container">
                        <p class="promo-slider__price">2400 ₽</p>
                        <p class="promo-slider__sup">за занятие</p>
                        <p class="promo-slider__old-price">2800 ₽</p>
                      </div>
                    </div>
                  </aside>
                </li>
                <li class="special-offers__item">
                  <aside class="promo-slider">
                    <div class="promo-slider__overlay"></div>
                    <div class="promo-slider__image"><img src="img/content/promo-3.png" srcset="img/content/promo-3@2x.png 2x" width="1040" height="469" alt="promo-photo">
                    </div>
                    <div class="promo-slider__header">
                      <h3 class="promo-slider__title">Full Body Stretch</h3>
                      <div class="promo-slider__logo">
                        <svg width="74" height="74" aria-hidden="true">
                          <use xlink:href="#logotype"></use>
                        </svg>
                      </div>
                    </div><span class="promo-slider__text">Горячие предложения на&nbsp;Комплекс упражнений на&nbsp;растяжку всего тела для новичков</span>
                    <div class="promo-slider__bottom-container">
                      <div class="promo-slider__slider-dots">
                        <button class="promo-slider__slider-dot" aria-label="первый слайд"></button>
                        <button class="promo-slider__slider-dot" aria-label="второй слайд"></button>
                        <button class="promo-slider__slider-dot--active promo-slider__slider-dot" aria-label="третий слайд"></button>
                      </div>
                      <div class="promo-slider__price-container">
                        <p class="promo-slider__price">1800 ₽</p>
                        <p class="promo-slider__sup">за занятие</p>
                        <p class="promo-slider__old-price">2200 ₽</p>
                      </div>
                    </div>
                  </aside>
                </li>
              </ul>
              <div class="thumbnail-spec-gym">
                <div class="thumbnail-spec-gym__image">
                  <picture>
                    <source type="image/webp" srcset="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x"><img src="img/content/thumbnails/nearest-gym-01.jpg" srcset="img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt="">
                  </picture>
                </div>
                <!-- <p class="thumbnail-spec-gym__type">Ближайший зал</p> -->
                <div class="thumbnail-spec-gym__header", align ="center", >
                  <h3 class="thumbnail-spec-gym__title">Скоро здесь появится что - то полезное</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="popular-trainings">
          <div class="container">
            <div class="popular-trainings__wrapper">
              <div class="popular-trainings__title-wrapper">
                <h2 class="popular-trainings__title">Популярные тренировки</h2>
                <button class="btn-flat popular-trainings__button" type="button"><span>Смотреть все</span>
                  <svg width="14" height="10" aria-hidden="true">
                    <use xlink:href="#arrow-right"></use>
                  </svg>
                </button>
                <div class="popular-trainings__controls">
                  <button class="btn-icon popular-trainings__control" type="button" aria-label="previous">
                    <svg width="16" height="14" aria-hidden="true">
                      <use xlink:href="#arrow-left"></use>
                    </svg>
                  </button>
                  <button class="btn-icon popular-trainings__control" type="button" aria-label="next">
                    <svg width="16" height="14" aria-hidden="true">
                      <use xlink:href="#arrow-right"></use>
                    </svg>
                  </button>
                </div>
              </div>
              <ul class="popular-trainings__list">
                <li class="popular-trainings__item">
                  <div class="thumbnail-training">
                    <div class="thumbnail-training__inner">
                      <div class="thumbnail-training__image">
                        <picture>
                          <source type="image/webp" srcset="img/content/thumbnails/training-06.webp, img/content/thumbnails/training-06@2x.webp 2x"><img src="img/content/thumbnails/training-06.jpg" srcset="img/content/thumbnails/training-06@2x.jpg 2x" width="330" height="190" alt="">
                        </picture>
                      </div>
                      <p class="thumbnail-training__price"><span class="thumbnail-training__price-value">1600</span><span>₽</span>
                      </p>
                      <h3 class="thumbnail-training__title">run, forrest, run</h3>
                      <div class="thumbnail-training__info">
                        <ul class="thumbnail-training__hashtags-list">
                          <li class="thumbnail-training__hashtags-item">
                            <div class="hashtag thumbnail-training__hashtag"><span>#бег</span></div>
                          </li>
                          <li class="thumbnail-training__hashtags-item">
                            <div class="hashtag thumbnail-training__hashtag"><span>#500ккал</span></div>
                          </li>
                        </ul>
                        <div class="thumbnail-training__rate">
                          <svg width="16" height="16" aria-hidden="true">
                            <use xlink:href="#icon-star"></use>
                          </svg><span class="thumbnail-training__rate-value">5</span>
                        </div>
                      </div>
                      <div class="thumbnail-training__text-wrapper">
                        <p class="thumbnail-training__text">Узнайте правильную технику бега, развивайте выносливость и&nbsp;откройте для себя все секреты длительных пробежек.</p>
                      </div>
                      <div class="thumbnail-training__button-wrapper">
                        <a class="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                        <a class="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="popular-trainings__item">
                  <div class="thumbnail-training">
                    <div class="thumbnail-training__inner">
                      <div class="thumbnail-training__image">
                        <picture>
                          <source type="image/webp" srcset="img/content/thumbnails/training-07.webp, img/content/thumbnails/training-07@2x.webp 2x"><img src="img/content/thumbnails/training-07.jpg" srcset="img/content/thumbnails/training-07@2x.jpg 2x" width="330" height="190" alt="">
                        </picture>
                      </div>
                      <p class="thumbnail-training__price"><span class="thumbnail-training__price-value">1600</span><span>₽</span>
                      </p>
                      <h3 class="thumbnail-training__title">fitball</h3>
                      <div class="thumbnail-training__info">
                        <ul class="thumbnail-training__hashtags-list">
                          <li class="thumbnail-training__hashtags-item">
                            <div class="hashtag thumbnail-training__hashtag"><span>#пилатес</span></div>
                          </li>
                          <li class="thumbnail-training__hashtags-item">
                            <div class="hashtag thumbnail-training__hashtag"><span>#200ккал</span></div>
                          </li>
                        </ul>
                        <div class="thumbnail-training__rate">
                          <svg width="16" height="16" aria-hidden="true">
                            <use xlink:href="#icon-star"></use>
                          </svg><span class="thumbnail-training__rate-value">5</span>
                        </div>
                      </div>
                      <div class="thumbnail-training__text-wrapper">
                        <p class="thumbnail-training__text">Тренировка на&nbsp;фитболе&nbsp;&mdash; отличном тренажере для развития чувства баланса и&nbsp;равновесия, улучшения координации.</p>
                      </div>
                      <div class="thumbnail-training__button-wrapper">
                        <a class="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                        <a class="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="popular-trainings__item">
                  <div class="thumbnail-training">
                    <div class="thumbnail-training__inner">
                      <div class="thumbnail-training__image">
                        <picture>
                          <source type="image/webp" srcset="img/content/thumbnails/training-11.webp, img/content/thumbnails/training-11@2x.webp 2x"><img src="img/content/thumbnails/training-11.jpg" srcset="img/content/thumbnails/training-11@2x.jpg 2x" width="330" height="190" alt="">
                        </picture>
                      </div>
                      <p class="thumbnail-training__price"><span class="thumbnail-training__price-value">2200</span><span>₽</span>
                      </p>
                      <h3 class="thumbnail-training__title">devil's cindy</h3>
                      <div class="thumbnail-training__info">
                        <ul class="thumbnail-training__hashtags-list">
                          <li class="thumbnail-training__hashtags-item">
                            <div class="hashtag thumbnail-training__hashtag"><span>#кроссфит</span></div>
                          </li>
                          <li class="thumbnail-training__hashtags-item">
                            <div class="hashtag thumbnail-training__hashtag"><span>#950ккал</span></div>
                          </li>
                        </ul>
                        <div class="thumbnail-training__rate">
                          <svg width="16" height="16" aria-hidden="true">
                            <use xlink:href="#icon-star"></use>
                          </svg><span class="thumbnail-training__rate-value">5</span>
                        </div>
                      </div>
                      <div class="thumbnail-training__text-wrapper">
                        <p class="thumbnail-training__text">Знаменитый кроссфит комплекс. Синди&nbsp;&mdash; универсальная тренировка для развития функциональной силы.</p>
                      </div>
                      <div class="thumbnail-training__button-wrapper">
                        <a class="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                        <a class="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="popular-trainings__item">
                  <div class="thumbnail-training">
                    <div class="thumbnail-training__inner">
                      <div class="thumbnail-training__image">
                        <picture>
                          <source type="image/webp" srcset="img/content/thumbnails/training-09.webp, img/content/thumbnails/training-09@2x.webp 2x"><img src="img/content/thumbnails/training-09.jpg" srcset="img/content/thumbnails/training-09@2x.jpg 2x" width="330" height="190" alt="">
                        </picture>
                      </div>
                      <p class="thumbnail-training__price"><span class="thumbnail-training__price-value">1800</span><span>₽</span>
                      </p>
                      <h3 class="thumbnail-training__title">full body stretch</h3>
                      <div class="thumbnail-training__info">
                        <ul class="thumbnail-training__hashtags-list">
                          <li class="thumbnail-training__hashtags-item">
                            <div class="hashtag thumbnail-training__hashtag"><span>#стретчинг</span></div>
                          </li>
                          <li class="thumbnail-training__hashtags-item">
                            <div class="hashtag thumbnail-training__hashtag"><span>#400ккал</span></div>
                          </li>
                        </ul>
                        <div class="thumbnail-training__rate">
                          <svg width="16" height="16" aria-hidden="true">
                            <use xlink:href="#icon-star"></use>
                          </svg><span class="thumbnail-training__rate-value">5</span>
                        </div>
                      </div>
                      <div class="thumbnail-training__text-wrapper">
                        <p class="thumbnail-training__text">Комплекс упражнений на&nbsp;растяжку всего тела для новичков. Плавное погружение в&nbsp;стретчинг и&nbsp;умеренная нагрузка.</p>
                      </div>
                      <div class="thumbnail-training__button-wrapper">
                        <a class="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                        <a class="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section class="look-for-company">
          <div class="container">
            <div class="look-for-company__wrapper">
              <div class="look-for-company__title-wrapper">
                <h2 class="look-for-company__title">Ищут компанию для тренировки</h2>
                <button class="btn-flat btn-flat--light look-for-company__button" type="button"><span>Смотреть все</span>
                  <svg width="14" height="10" aria-hidden="true">
                    <use xlink:href="#arrow-right"></use>
                  </svg>
                </button>
                <div class="look-for-company__controls">
                  <button class="btn-icon btn-icon--outlined look-for-company__control" type="button" aria-label="previous">
                    <svg width="16" height="14" aria-hidden="true">
                      <use xlink:href="#arrow-left"></use>
                    </svg>
                  </button>
                  <button class="btn-icon btn-icon--outlined look-for-company__control" type="button" aria-label="next">
                    <svg width="16" height="14" aria-hidden="true">
                      <use xlink:href="#arrow-right"></use>
                    </svg>
                  </button>
                </div>
              </div>
              <ul class="look-for-company__list">
                <li class="look-for-company__item">
                  <div class="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
                    <div class="thumbnail-user__image">
                      <picture>
                        <source type="image/webp" srcset="img/content/thumbnails/user-04.webp, img/content/thumbnails/user-04@2x.webp 2x"><img src="img/content/thumbnails/user-04.jpg" srcset="img/content/thumbnails/user-04@2x.jpg 2x" width="82" height="82" alt="">
                      </picture>
                    </div>
                    <!-- <div class="thumbnail-user__top-status thumbnail-user__top-status--role-user">
                      <svg width="12" height="12" aria-hidden="true">
                        <use xlink:href="#icon-crown"></use>
                      </svg>
                    </div> -->
                    <div class="thumbnail-user__header">
                      <h3 class="thumbnail-user__name">Диана</h3>
                      <div class="thumbnail-user__location">
                        <svg width="14" height="16" aria-hidden="true">
                          <use xlink:href="#icon-location"></use>
                        </svg>
                        <address class="thumbnail-user__location-address">Невский проспект</address>
                      </div>
                    </div>
                    <ul class="thumbnail-user__hashtags-list">
                      <li class="thumbnail-user__hashtags-item">
                        <div class="hashtag thumbnail-user__hashtag"><span>#пилатес</span></div>
                      </li>
                    </ul>
                    <a class="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button" href="#">Подробнее</a>
                  </div>
                </li>
                <li class="look-for-company__item">
                  <div class="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
                    <div class="thumbnail-user__image">
                      <picture>
                        <source type="image/webp" srcset="img/content/thumbnails/user-05.webp, img/content/thumbnails/user-05@2x.webp 2x"><img src="img/content/thumbnails/user-05.jpg" srcset="img/content/thumbnails/user-05@2x.jpg 2x" width="82" height="82" alt="">
                      </picture>
                    </div>
                    <div class="thumbnail-user__header">
                      <h3 class="thumbnail-user__name">Константин</h3>
                      <div class="thumbnail-user__location">
                        <svg width="14" height="16" aria-hidden="true">
                          <use xlink:href="#icon-location"></use>
                        </svg>
                        <address class="thumbnail-user__location-address">Комендантский проспект</address>
                      </div>
                    </div>
                    <ul class="thumbnail-user__hashtags-list">
                      <li class="thumbnail-user__hashtags-item">
                        <div class="hashtag thumbnail-user__hashtag"><span>#силовые</span></div>
                      </li>
                    </ul>
                    <a class="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button" href="#">Подробнее</a>
                  </div>
                </li>
                <li class="look-for-company__item">
                  <div class="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
                    <div class="thumbnail-user__image">
                      <picture>
                        <source type="image/webp" srcset="img/content/thumbnails/user-06.webp, img/content/thumbnails/user-06@2x.webp 2x"><img src="img/content/thumbnails/user-06.jpg" srcset="img/content/thumbnails/user-06@2x.jpg 2x" width="82" height="82" alt="">
                      </picture>
                    </div>
                    <div class="thumbnail-user__header">
                      <h3 class="thumbnail-user__name">Иван</h3>
                      <div class="thumbnail-user__location">
                        <svg width="14" height="16" aria-hidden="true">
                          <use xlink:href="#icon-location"></use>
                        </svg>
                        <address class="thumbnail-user__location-address">Чёрная речка</address>
                      </div>
                    </div>
                    <ul class="thumbnail-user__hashtags-list">
                      <li class="thumbnail-user__hashtags-item">
                        <div class="hashtag thumbnail-user__hashtag"><span>#бег</span></div>
                      </li>
                    </ul>
                    <a class="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button" href="#">Подробнее</a>
                  </div>
                </li>
                <li class="look-for-company__item">
                  <div class="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
                    <div class="thumbnail-user__image">
                      <picture>
                        <source type="image/webp" srcset="img/content/thumbnails/user-07.webp, img/content/thumbnails/user-07@2x.webp 2x"><img src="img/content/thumbnails/user-07.jpg" srcset="img/content/thumbnails/user-07@2x.jpg 2x" width="82" height="82" alt="">
                      </picture>
                    </div>
                    <!-- <div class="thumbnail-user__top-status thumbnail-user__top-status--role-user">
                      <svg width="12" height="12" aria-hidden="true">
                        <use xlink:href="#icon-crown"></use>
                      </svg>
                    </div> -->
                    <div class="thumbnail-user__header">
                      <h3 class="thumbnail-user__name">Яна</h3>
                      <div class="thumbnail-user__location">
                        <svg width="14" height="16" aria-hidden="true">
                          <use xlink:href="#icon-location"></use>
                        </svg>
                        <address class="thumbnail-user__location-address">Крестовский остров</address>
                      </div>
                    </div>
                    <ul class="thumbnail-user__hashtags-list">
                      <li class="thumbnail-user__hashtags-item">
                        <div class="hashtag thumbnail-user__hashtag"><span>#пилатес</span></div>
                      </li>
                    </ul>
                    <a class="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button" href="#">Подробнее</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
}

export default MainScreen;
