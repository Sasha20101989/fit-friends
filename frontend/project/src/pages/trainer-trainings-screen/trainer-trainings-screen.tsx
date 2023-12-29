import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import TrainingList from '../../components/training-list/training-list';
import { WorkoutDuration } from '../../types/workout-duration.enum';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { Training } from '../../types/training.type';
import { ChangeEvent, useEffect, useState } from 'react';
import { getTrainerTrainings } from '../../store/main-data/main-data.selectors';
import { FetchTrainingsParams, fetchTrainerTrainingsAction } from '../../store/api-actions/trainings-api-actions/trainings-api-actions';
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import { TrainingCategory } from '../../types/training-category';
import GoBack from '../../components/go-back/go-back';
import { AppRoute, CALORIES_CONSTRAINTS, MAX_TRAININGS_COUNT, RATING_CONSTRAINTS } from '../../const';
import ShowMore from '../../components/show-more/show-more';

function TrainerTrainingsScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const trainings: Training[] = useAppSelector(getTrainerTrainings);

  const [initialLoad, setInitialLoad] = useState(true);

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [initialMinPrice, setInitialMinPrice] = useState<number>(0);
  const [initialMaxPrice, setInitialMaxPrice] = useState<number>(0);
  const [minCalories, setMinCalories] = useState<number>(0);
  const [maxCalories, setMaxCalories] = useState<number>(0);
  const [minRating, setMinRating] = useState<number>(0);
  const [maxRating, setMaxRating] = useState<number>(0);
  const [selectedDuration, setDuration] = useState<WorkoutDuration | ''>('');

  const [queryParams, setQueryParams] = useState<FetchTrainingsParams>({
    category: TrainingCategory.FOR_TRAINER,
    trainer: id || '',
    limit: MAX_TRAININGS_COUNT
  });

  const handleInputChange = (
    evt: ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<number>>,
    paramName: string
  ) => {

    const inputValue = evt.currentTarget.value.trim();
    const newValue: number | '' = inputValue === '' ? '' : parseInt(inputValue, 10);

    if (typeof newValue === 'number' && !isNaN(newValue)) {
      setValue(newValue);
      setQueryParams((prevParams) => ({ ...prevParams, [paramName]: newValue }));
    } else {
      setValue(0);
      setQueryParams((prevParams) => ({ ...prevParams, [paramName]: undefined }));
    }
  };

  const handleDurationChange = (
    evt: ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<WorkoutDuration | ''>>,
    paramName: string
  ) => {
    const newValue = evt.target.value as WorkoutDuration;
    const isChecked = evt.target.checked;

    setValue(() => {
      const updatedValue = isChecked ? newValue : '';

      setQueryParams((prevParams) => ({ ...prevParams, [paramName]: updatedValue === '' ? undefined : updatedValue }));
      return updatedValue;
    });
  };

  const handleShowMoreClick = () => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      limit: (prevParams.limit || 0) + MAX_TRAININGS_COUNT,
    }));
  };

  const handleSliderCaloriesChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      handleInputChange(
        { currentTarget: { value: value[0].toString().trim() } } as React.ChangeEvent<HTMLInputElement>,
        setMinCalories,
        'minCalories'
      );

      handleInputChange(
        { currentTarget: { value: value[1].toString().trim() } } as React.ChangeEvent<HTMLInputElement>,
        setMaxCalories,
        'maxCalories'
      );
    }
  };

  const handleSliderPriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      handleInputChange(
        { currentTarget: { value: value[0].toString().trim() } } as React.ChangeEvent<HTMLInputElement>,
        setMinPrice,
        'minPrice'
      );

      handleInputChange(
        { currentTarget: { value: value[1].toString().trim() } } as React.ChangeEvent<HTMLInputElement>,
        setMaxPrice,
        'maxPrice'
      );
    }
  };

  const handleSliderRatingChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      handleInputChange(
        { currentTarget: { value: value[0].toString().trim() } } as React.ChangeEvent<HTMLInputElement>,
        setMinRating,
        'minRating'
      );

      handleInputChange(
        { currentTarget: { value: value[1].toString().trim() } } as React.ChangeEvent<HTMLInputElement>,
        setMaxRating,
        'maxRating'
      );
    }
  };

  useEffect(() => {
    if (id) {
      setQueryParams((prevParams) => ({ ...prevParams, userId: id }));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      setTimeout(() => {
        dispatch(fetchTrainerTrainingsAction(queryParams));
      }, 600);
    }
  }, [dispatch, id, queryParams]);

  useEffect(() => {
    if (initialLoad && trainings.length > 0) {
      const prices = trainings.map((training) => training.price);
      const calories = trainings.map((training) => training.calories);
      const ratings = trainings.map((training) => training.rating);
      const minValuePrice = Math.min(...prices);
      const maxValuePrice = Math.max(...prices);
      const minValueCalories = Math.min(...calories);
      const maxValueCalories = Math.max(...calories);
      const minValueRatings = Math.min(...ratings);
      const maxValueRatings = Math.max(...ratings);

      setMinPrice(minValuePrice);
      setMaxPrice(maxValuePrice);
      setInitialMinPrice(minValuePrice);
      setInitialMaxPrice(maxValuePrice);
      setMinCalories(minValueCalories);
      setMaxCalories(maxValueCalories);
      setMinRating(minValueRatings);
      setMaxRating(maxValueRatings);
      setInitialLoad(false);
    }
  }, [trainings, initialLoad]);

  const minCaloriesValue = minCalories === 0 ? CALORIES_CONSTRAINTS.MIN : Number(minCalories);
  const maxCaloriesValue = Number(maxCalories !== 0 ? maxCalories : CALORIES_CONSTRAINTS.MAX);

  return(
    <Layout>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Мои тренировки</h1>
            <div className="my-training-form">
              <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
              <div className="my-training-form__wrapper">
                <GoBack sourceName={'btn-flat btn-flat--underlined my-training-form__btnback'} width={14} height={10} route={AppRoute.Main}/>
                <h3 className="my-training-form__title">фильтры</h3>
                <form className="my-training-form__form">
                  <div className="my-training-form__block my-training-form__block--price">
                    <h4 className="my-training-form__block-title">Цена, ₽</h4>
                    <div className="filter-price">
                      <div className="filter-price__input-text filter-price__input-text--min">
                        <input type="number" id="text-min" name="text-min" value={minPrice} onChange={(evt) => handleInputChange(evt, setMinPrice, 'minPrice')}/>
                        <label htmlFor="text-min">от</label>
                      </div>
                      <div className="filter-price__input-text filter-price__input-text--max">
                        <input type="number" id="text-max" name="text-max" value={maxPrice} onChange={(evt) => handleInputChange(evt, setMaxPrice, 'maxPrice')}/>
                        <label htmlFor="text-max">до</label>
                      </div>
                    </div>
                    <div className="filter-range">
                      <Slider
                        range
                        min={initialMinPrice}
                        max={initialMaxPrice}
                        step={1}
                        value={[minPrice, maxPrice]}
                        onChange={handleSliderPriceChange}
                      />
                    </div>
                  </div>
                  <div className="my-training-form__block my-training-form__block--calories">
                    <h4 className="my-training-form__block-title">Калории</h4>
                    <div className="filter-calories">
                      <div className="filter-calories__input-text filter-calories__input-text--min">
                        <input type="number" id="text-min-cal" name="text-min-cal" value={minCalories} onChange={(evt) => handleInputChange(evt, setMinCalories, 'minCalories')}/>
                        <label htmlFor="text-min-cal">от</label>
                      </div>
                      <div className="filter-calories__input-text filter-calories__input-text--max">
                        <input type="number" id="text-max-cal" name="text-max-cal" value={maxCalories} onChange={(evt) => handleInputChange(evt, setMaxCalories, 'maxCalories')}/>
                        <label htmlFor="text-max-cal">до</label>
                      </div>
                    </div>
                    <div className="filter-range">
                      <Slider
                        range
                        min={CALORIES_CONSTRAINTS.MIN}
                        max={CALORIES_CONSTRAINTS.MAX}
                        step={1}
                        value={[minCaloriesValue, maxCaloriesValue]}
                        onChange={handleSliderCaloriesChange}
                      />
                    </div>
                  </div>
                  <div className="my-training-form__block my-training-form__block--raiting">
                    <h4 className="my-training-form__block-title">Рейтинг</h4>
                    <div className="filter-raiting">
                      <Slider
                        range
                        min={RATING_CONSTRAINTS.MIN}
                        max={RATING_CONSTRAINTS.MAX}
                        step={1}
                        value={[minRating, maxRating]}
                        onChange={handleSliderRatingChange}
                      />
                    </div>
                  </div>
                  <div className="my-training-form__block my-training-form__block--duration">
                    <h4 className="my-training-form__block-title">Длительность</h4>
                    <ul className="my-training-form__check-list">
                      {Object.values(WorkoutDuration)
                        .filter((duration) => duration !== WorkoutDuration.Unknown)
                        .map((duration) => (
                          <li key={duration} className="my-training-form__check-list-item">
                            <div className="custom-toggle custom-toggle--checkbox">
                              <label>
                                <input
                                  type="checkbox"
                                  name="duration"
                                  value={duration}
                                  checked={selectedDuration === duration}
                                  onChange={(evt) => handleDurationChange(evt, setDuration, 'workoutDuration')}
                                />
                                <span className="custom-toggle__icon">
                                  <svg width="9" height="6" aria-hidden="true">
                                    <use xlinkHref="#arrow-check"></use>
                                  </svg>
                                </span>
                                <span className="custom-toggle__label">{duration}</span>
                              </label>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </form>
              </div>
            </div>
            <div className="inner-page__content">
              <div className="my-trainings">
                <TrainingList sourceName={'my-trainings__list'} itemSourceName={'my-trainings__item'} trainings={trainings}/>
                <ShowMore sourceName={'show-more my-trainings__show-more'} length={trainings.length} limit={queryParams.limit} onShowMoreClick={handleShowMoreClick}/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default TrainerTrainingsScreen;
