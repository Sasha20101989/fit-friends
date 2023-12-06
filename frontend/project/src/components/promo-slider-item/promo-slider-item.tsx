import React from 'react';

type PromoSliderItemProps = {
  title: string;
  imageSrc: string;
  text: string;
  price: number;
  sup: string;
  oldPrice: number;
}

function PromoSliderItem({ title, imageSrc, text, price, sup, oldPrice }: PromoSliderItemProps):JSX.Element {
  return (
    <li className="special-offers__item">
      <aside className="promo-slider">
        <div className="promo-slider__overlay"></div>
        <div className="promo-slider__image">
          <img src={imageSrc} srcSet={`${imageSrc}@2x.png 2x`} width="1040" height="469" alt={title} />
        </div>
        <div className="promo-slider__header">
          <h3 className="promo-slider__title">{title}</h3>
          <div className="promo-slider__logo">
            <svg width="74" height="74" aria-hidden="true">
              <use xlinkHref="#logotype"></use>
            </svg>
          </div>
        </div>
        <span className="promo-slider__text"></span>
        <div className="promo-slider__bottom-container">
          <div className="promo-slider__slider-dots">
            <button className="promo-slider__slider-dot" aria-label="первый слайд"></button>
            <button className="promo-slider__slider-dot" aria-label="второй слайд"></button>
            <button className="promo-slider__slider-dot" aria-label="третий слайд"></button>
          </div>
          <div className="promo-slider__price-container">
            <p className="promo-slider__price">{price} ₽</p>
            <p className="promo-slider__sup">{sup}</p>
            <p className="promo-slider__old-price">{oldPrice} ₽</p>
          </div>
        </div>
      </aside>
    </li>
  );
}

export default PromoSliderItem;
