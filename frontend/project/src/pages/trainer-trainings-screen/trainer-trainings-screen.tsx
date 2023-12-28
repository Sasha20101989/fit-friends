import React from 'react';
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
import { AppRoute, MAX_TRAININGS_COUNT } from '../../const';
import ShowMore from '../../components/show-more/show-more';

function TrainerTrainingsScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const trainings: Training[] = useAppSelector(getTrainerTrainings);

  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [minCalories, setMinCalories] = useState<number | ''>('');
  const [maxCalories, setMaxCalories] = useState<number | ''>('');
  const [selectedDuration, setDuration] = useState<WorkoutDuration | ''>('');

  const [queryParams, setQueryParams] = useState<FetchTrainingsParams>({
    category: TrainingCategory.FOR_TRAINER,
    trainer: id || '',
  });

  const handleInputChange = (
    evt: ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<number | ''>>,
    paramName: string
  ) => {
    evt.preventDefault();
    const inputValue = evt.currentTarget.value.trim();
    const newValue: number | '' = inputValue === '' ? '' : parseInt(inputValue, 10);

    if (typeof newValue === 'number' && !isNaN(newValue)) {
      setValue(newValue);
      setQueryParams((prevParams) => ({ ...prevParams, [paramName]: newValue }));
    } else {
      setValue('');
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

  useEffect(() => {
    if (id) {
      setQueryParams((prevParams) => ({ ...prevParams, userId: id }));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      dispatch(fetchTrainerTrainingsAction(queryParams));
    }
  }, [dispatch, id, queryParams]);

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
                    {/* <div style={mySliderStyle} className="my-slider-wrapper">
                    <fieldset className="img-upload__scale  scale">
                    <button type="button" className="scale__control  scale__control--smaller">Уменьшить</button>
                    <input type="text" className="scale__control  scale__control--value" minLength={25} step={25} maxLength={100} value="100%" title="Image Scale" name="scale" readOnly/>
                    <button type="button" className="scale__control  scale__control--bigger">Увеличить</button>
                    </fieldset>
                    </div> */}
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
                      <div className="filter-range__scale">
                        <div className="filter-range__bar">
                          <span className="visually-hidden">Полоса прокрутки</span>
                        </div>
                      </div>
                      <div className="filter-range__control">
                        <button className="filter-range__min-toggle">
                          <span className="visually-hidden">Минимальное значение</span>
                        </button>
                        <button className="filter-range__max-toggle">
                          <span className="visually-hidden">Максимальное значение</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="my-training-form__block my-training-form__block--raiting">
                    <h4 className="my-training-form__block-title">Рейтинг</h4>
                    <div className="filter-raiting">
                      <div className="filter-raiting__scale">
                        <div className="filter-raiting__bar">
                          <span className="visually-hidden">Полоса прокрутки</span>
                        </div>
                      </div>
                      <div className="filter-raiting__control">
                        <button className="filter-raiting__min-toggle">
                          <span className="visually-hidden">Минимальное значение</span>
                        </button>
                        <span>0</span>
                        <button className="filter-raiting__max-toggle">
                          <span className="visually-hidden">Максимальное значение</span>
                        </button>
                        <span>5</span>
                      </div>
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
