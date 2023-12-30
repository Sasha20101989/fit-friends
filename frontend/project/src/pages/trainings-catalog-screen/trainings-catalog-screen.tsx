import Layout from '../../components/layout/layout';
import { Training } from '../../types/training.type';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { getTrainings } from '../../store/main-data/main-data.selectors';
import { WorkoutType } from '../../types/workout-type.enum';
import { ChangeEvent, memo, useEffect, useMemo, useState } from 'react';
import { FetchTrainingsParams, fetchTrainingsAction } from '../../store/api-actions/trainings-api-actions/trainings-api-actions';
import { TrainingCategory } from '../../types/training-category';
import { Sorting } from '../../types/sorting.enum';
import { AppRoute, CALORIES_CONSTRAINTS, MAX_TRAININGS_COUNT, RATING_CONSTRAINTS } from '../../const';
import GoBack from '../../components/go-back/go-back';
import ShowMore from '../../components/show-more/show-more';
import TrainingList from '../../components/training-list/training-list';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function TrainingsCatalogScreen() : JSX.Element {
  const dispatch = useAppDispatch();

  const trainings: Training[] = useAppSelector(getTrainings);

  const [initialLoad, setInitialLoad] = useState(true);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [initialMinPrice, setInitialMinPrice] = useState<number>(0);
  const [initialMaxPrice, setInitialMaxPrice] = useState<number>(0);
  const [minCalories, setMinCalories] = useState<number>(0);
  const [maxCalories, setMaxCalories] = useState<number>(0);
  const [minRating, setMinRating] = useState<number>(1);
  const [maxRating, setMaxRating] = useState<number>(0);
  const [sortingOption, setSortingOption] = useState<Sorting | undefined>(undefined);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [selectedWorkoutTypes, setSelectedWorkoutTypes] = useState<WorkoutType[]>([]);

  const initialQueryParams: FetchTrainingsParams = useMemo(() => ({
    category: TrainingCategory.BASE,
    createdAtDirection: Sorting.Descending,
    limit: MAX_TRAININGS_COUNT
  }), []);

  const [queryParams, setQueryParams] = useState<FetchTrainingsParams>(initialQueryParams);

  useEffect(() => {
    let fetchParams: FetchTrainingsParams = {
      ...queryParams
    };

    if (sortingOption) {
      fetchParams = {
        ...fetchParams,
        sortByPrice: sortingOption,
      };

      delete fetchParams.createdAtDirection;
    }

    if (showFreeOnly) {
      fetchParams = {
        ...fetchParams,
        maxPrice: 0,
      };

      delete fetchParams.sortByPrice;
      delete fetchParams.createdAtDirection;
    }

    setTimeout(() => {
      dispatch(fetchTrainingsAction(fetchParams));
    }, 600);
  }, [dispatch, sortingOption, showFreeOnly, queryParams, selectedWorkoutTypes]);

  const handleSortingChange = (option: Sorting | undefined) => {
    setShowFreeOnly(false);
    setSortingOption(option);
  };

  const handleFreeFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortingOption(undefined);
    setShowFreeOnly(event.target.checked);
  };

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

  const handleWorkoutTypeChange = (evt: ChangeEvent<HTMLInputElement>, type: WorkoutType) => {
    const isChecked = evt.target.checked;

    setSelectedWorkoutTypes((prevTypes) => {
      const updatedTypes = isChecked ? [...prevTypes, type] : prevTypes.filter((prevType) => prevType !== type);

      setQueryParams((prevParams) => ({
        ...prevParams,
        workoutTypes: updatedTypes,
      }));

      return updatedTypes;
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
            <h1 className="visually-hidden">Каталог тренировок</h1>
            <div className="gym-catalog-form">
              <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
              <div className="gym-catalog-form__wrapper">
                <GoBack sourceName={'btn-flat btn-flat--underlined gym-catalog-form__btnback'} width={14} height={10} route={AppRoute.Main}/>
                <h3 className="gym-catalog-form__title">Фильтры</h3>
                <form className="gym-catalog-form__form">
                  <div className="gym-catalog-form__block gym-catalog-form__block--price">
                    <h4 className="gym-catalog-form__block-title">Цена, ₽</h4>
                    <div className="filter-price">
                      <div className="filter-price__input-text filter-price__input-text--min">
                        <input
                          type="number"
                          id="text-min"
                          name="text-min"
                          value={minPrice}
                          onChange={(evt) => handleInputChange(evt, setMinPrice, 'minPrice')}
                        />
                        <label htmlFor="text-min">от</label>
                      </div>
                      <div className="filter-price__input-text filter-price__input-text--max">
                        <input
                          type="number"
                          id="text-max"
                          name="text-max"
                          value={maxPrice}
                          onChange={(evt) => handleInputChange(evt, setMaxPrice, 'maxPrice')}
                        />
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
                  <div className="gym-catalog-form__block gym-catalog-form__block--calories">
                    <h4 className="gym-catalog-form__block-title">Калории</h4>
                    <div className="filter-calories">
                      <div className="filter-calories__input-text filter-calories__input-text--min">
                        <input
                          type="number"
                          id="text-min-cal"
                          name="text-min-cal"
                          value={minCalories}
                          onChange={(evt) => handleInputChange(evt, setMinCalories, 'minCalories')}
                        />
                        <label htmlFor="text-min-cal">от</label>
                      </div>
                      <div className="filter-calories__input-text filter-calories__input-text--max">
                        <input
                          type="number"
                          id="text-max-cal"
                          name="text-max-cal"
                          value={maxCalories}
                          onChange={(evt) => handleInputChange(evt, setMaxCalories, 'maxCalories')}
                        />
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
                  <div className="gym-catalog-form__block gym-catalog-form__block--rating">
                    <h4 className="gym-catalog-form__block-title">Рейтинг</h4>
                    <div className="filter-raiting">
                      <Slider
                        range
                        min={RATING_CONSTRAINTS.MIN}
                        max={RATING_CONSTRAINTS.MAX}
                        step={1}
                        value={[minRating, maxRating]}
                        onChange={handleSliderRatingChange}
                        marks={{
                          1: '1',
                          2: '2',
                          3: '3',
                          4: '4',
                          5: '5',
                        }}
                      />
                    </div>
                  </div>
                  <div className="gym-catalog-form__block gym-catalog-form__block--type">
                    <h4 className="gym-catalog-form__block-title">Тип</h4>
                    <ul className="gym-catalog-form__check-list">
                      {Object.values(WorkoutType).map((type) => (
                        <li key={type} className="gym-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input
                                type="checkbox"
                                name="type"
                                value={type}
                                checked={selectedWorkoutTypes.includes(type)}
                                onChange={(e) => handleWorkoutTypeChange(e, type)}
                              />
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">{type}</span>
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="gym-catalog-form__block gym-catalog-form__block--sort">
                    <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
                    <div className="btn-radio-sort gym-catalog-form__radio">
                      <label>
                        <input
                          type="radio"
                          name="sort"
                          onChange={() => handleSortingChange(Sorting.Ascending)}
                          checked={sortingOption === Sorting.Ascending}
                        />
                        <span className="btn-radio-sort__label">Дешевле</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="sort"
                          onChange={() => handleSortingChange(Sorting.Descending)}
                          checked={sortingOption === Sorting.Descending}
                        />
                        <span className="btn-radio-sort__label">Дороже</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="sort"
                          onChange={handleFreeFilterChange}
                          checked={showFreeOnly}
                        />
                        <span className="btn-radio-sort__label">Бесплатные</span>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="training-catalog">
              <TrainingList sourceName={'training-catalog__list'} itemSourceName={'training-catalog__item'} trainings={trainings}/>
              <ShowMore sourceName={'show-more training-catalog__show-more'} length={trainings.length} limit={queryParams.limit} onShowMoreClick={handleShowMoreClick}/>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
export default memo(TrainingsCatalogScreen);
