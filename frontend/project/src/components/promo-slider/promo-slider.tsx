import { Training } from '../../types/training.type';
import { DISCOUNT_PERCENTAGE } from '../../const';

type PromoSliderProps = {
  specialTrainings: Training[];
  activeSlide: number;
  onDotClick: (index: number) => void;
}

function PromoSlider({specialTrainings, activeSlide, onDotClick}: PromoSliderProps):JSX.Element {
  const handleDotClick = (index: number) => {
    onDotClick(index);
  };

  return (
    <ul className="special-offers__list">
      {specialTrainings.map((training, index) => {
        const newPrice = (training.price * DISCOUNT_PERCENTAGE).toFixed(0);
        const fileExtension = training.backgroundImage.split('.').pop();
        const imageNameWithoutExtension = training.backgroundImage.replace(/\.[^/.]+$/, '');

        return (
          <li key={`${training.description}-${training.createdAt}`} className={`special-offers__item ${index === activeSlide ? 'is-active' : ''}`}>
            <aside className="promo-slider">
              <div className="promo-slider__overlay"></div>
              <div className="promo-slider__image">
                <img
                  src={`${imageNameWithoutExtension}${fileExtension ? `.${fileExtension}` : ''}`}
                  srcSet={`${imageNameWithoutExtension}@2x.${fileExtension ? fileExtension : ''} 2x`}
                  width="1040"
                  height="469"
                  alt={training.name}
                />
              </div>
              <div className="promo-slider__header">
                <h3 className="promo-slider__title">{training.name}</h3>
                <div className="promo-slider__logo">
                  <svg width="74" height="74" aria-hidden="true">
                    <use xlinkHref="#logotype"></use>
                  </svg>
                </div>
              </div>
              <span className="promo-slider__text"></span>
              <div className="promo-slider__bottom-container">
                <div className="promo-slider__slider-dots">
                  {specialTrainings.map((dotItem, dotIndex) => (
                    <button
                      key={`${dotItem.description}-${dotItem.createdAt}`}
                      className={`promo-slider__slider-dot ${dotIndex === activeSlide ? 'promo-slider__slider-dot--active' : ''}`}
                      aria-label={`слайд ${dotIndex + 1}`}
                      onClick={() => handleDotClick(dotIndex)}
                    >
                    </button>
                  ))}
                </div>
                <div className="promo-slider__price-container">
                  <p className="promo-slider__price">{newPrice} ₽</p>
                  <p className="promo-slider__sup">за занятие</p>
                  <p className="promo-slider__old-price">{training.price} ₽</p>
                </div>
              </div>
            </aside>
          </li>
        );
      })}
    </ul>
  );
}

export default PromoSlider;
