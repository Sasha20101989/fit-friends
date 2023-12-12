import { useAppDispatch, useAppSelector } from '../../hooks/index';
import ThumbnailTraining from '../thumbnail-training/thumbnail-training';
import { Training } from '../../types/training.type';
import { useEffect, useState } from 'react';
import { fetchTrainingsAction } from '../../store/api-actions/trainings-api-actions/trainings-api-actions';
import { getPopularTrainings } from '../../store/main-data/main-data.selectors';
import { TrainingCategory } from '../../types/training-category';
import { getUserId } from '../../store/main-process/main-process.selectors';
import IconButton from '../icon-button/icon-button';
import { MAX_POPULAR_TRAININGS_COUNT } from '../../const';

function PopularTrainings():JSX.Element {
  const dispatch = useAppDispatch();
  const popularTrainings: Training[] = useAppSelector(getPopularTrainings);
  const userId = useAppSelector(getUserId);

  const [selectedSpecialPage, setSpecialPage] = useState<number>(1);

  const handlePreviousClick = () => {
    setSpecialPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setSpecialPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    dispatch(fetchTrainingsAction({
      category: TrainingCategory.POPULAR,
      userId: userId,
      page: selectedSpecialPage,
      limit: MAX_POPULAR_TRAININGS_COUNT,
    }));
  }, [dispatch, userId, selectedSpecialPage]);

  return (
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <button className="btn-flat popular-trainings__button" type="button">
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="popular-trainings__controls">
              <IconButton sourceName={'btn-icon popular-trainings__control'} direction="left" onClick={handlePreviousClick} ariaLabel="previous" />
              <IconButton sourceName={'btn-icon popular-trainings__control'} direction="right" onClick={handleNextClick} ariaLabel="next" />
            </div>
          </div>
          <ul className="popular-trainings__list">
            {popularTrainings.map((training) => (
              <ThumbnailTraining key={`${training.name}-${training.calories}-${training.price}`} training={training} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default PopularTrainings;
