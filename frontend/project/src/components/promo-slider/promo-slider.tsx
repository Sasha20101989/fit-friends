import { useEffect, useState } from 'react';
import { Training } from '../../types/training.type';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getUserId } from '../../store/main-process/main-process.selectors';
import { getUser } from '../../store/user-process/user-process.selectors';
import { getSpecialTrainings } from '../../store/main-data/main-data.selectors';
import { fetchUserAction } from '../../store/api-actions/user-api-actions/user-api-actions';
import { fetchTrainingsAction } from '../../store/api-actions/trainings-api-actions/trainings-api-actions';
import { TrainingCategory } from '../../types/training-category';
import { DISCOUNT_PERCENTAGE, MAX_SPECIAL_TRAININGS_COUNT } from '../../const';
import Loading from '../loading/loading';

function PromoSlider():JSX.Element {
  const [activeSlide, setActiveSlide] = useState(0);

  const dispatch = useAppDispatch();

  const userId: string = useAppSelector(getUserId);
  const user = useAppSelector(getUser);
  const trainings: Training[] = useAppSelector(getSpecialTrainings);

  const [selectedSpecialPage] = useState<number>(1);

  useEffect(() => {
    if(userId){
      dispatch(fetchUserAction(userId));
    }
  }, [dispatch , userId]);

  useEffect(() => {
    if(user && user.workoutTypes.length > 0){
      dispatch(fetchTrainingsAction({
        userId: userId,
        category: TrainingCategory.SPECIAL,
        page: selectedSpecialPage,
        limit: MAX_SPECIAL_TRAININGS_COUNT,
        workoutTypes: user.workoutTypes,
        isSpecial: true
      }));
    }
  }, [dispatch , user, selectedSpecialPage, userId]);

  if(!user){
    return (<Loading/>);
  }

  const handleDotClick = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <ul className="special-offers__list">
      {trainings.map((training, index) => {
        const newPrice = (training.price * DISCOUNT_PERCENTAGE).toFixed(0);
        const fileExtension = training.backgroundImage.split('.').pop();
        const imageNameWithoutExtension = training.backgroundImage.replace(/\.[^/.]+$/, '');
        const hostedImage = `http://localhost:3000/${imageNameWithoutExtension}`;

        return (
          <li key={training.description} className={`special-offers__item ${index === activeSlide ? 'is-active' : ''}`}>
            <aside className="promo-slider">
              <div className="promo-slider__overlay"></div>
              <div className="promo-slider__image">
                <img
                  src={`${hostedImage}${fileExtension ? `.${fileExtension}` : ''}`}
                  srcSet={`${hostedImage}@2x.${fileExtension ? fileExtension : ''} 2x`}
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
                  {trainings.map((dotItem, dotIndex) => (
                    <button
                      key={dotItem.description}
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
