import { useAppDispatch, useAppSelector } from '../../hooks/index';
import ThumbnailTraining from '../thumbnail-training/thumbnail-training';
import { Training } from '../../types/training.type';
import { useEffect, useState } from 'react';
import { fetchTrainingsAction } from '../../store/api-actions/trainings-api-actions/trainings-api-actions';
import { getPopularTrainings } from '../../store/main-data/main-data.selectors';
import { TrainingCategory } from '../../types/training-category';
import { getUserId } from '../../store/main-process/main-process.selectors';
import IconButton from '../icon-button/icon-button';
import { AppRoute, MAX_POPULAR_TRAININGS_COUNT } from '../../const';
import { useNavigate } from 'react-router-dom';

function PopularTrainings():JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const popularTrainings: Training[] = useAppSelector(getPopularTrainings);
  const userId = useAppSelector(getUserId);

  const [selectedPage, setSpecialPage] = useState<number>(1);

  const isPreviousButtonDisabled = selectedPage === 1;
  const isNextButtonDisabled = MAX_POPULAR_TRAININGS_COUNT !== popularTrainings.length;

  const handlePreviousClick = () => {
    setSpecialPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setSpecialPage((prevPage) => prevPage + 1);
  };

  const handleShowAllClick = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    navigate(AppRoute.TrainingsCatalog);
  };

  useEffect(() => {
    dispatch(fetchTrainingsAction({
      category: TrainingCategory.POPULAR,
      page: selectedPage,
      limit: MAX_POPULAR_TRAININGS_COUNT,
    }));
  }, [dispatch, userId, selectedPage]);

  return (
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <button className="btn-flat popular-trainings__button" type="button" onClick={handleShowAllClick}>
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="popular-trainings__controls">
              <IconButton sourceName={'btn-icon popular-trainings__control'} direction="left" onClick={handlePreviousClick} ariaLabel="previous" width={16} height={14} disabled={isPreviousButtonDisabled}/>
              <IconButton sourceName={'btn-icon popular-trainings__control'} direction="right" onClick={handleNextClick} ariaLabel="next" width={16} height={14} disabled={isNextButtonDisabled}/>
            </div>
          </div>
          <ul className="popular-trainings__list">
            {popularTrainings.map((training) => (
              <ThumbnailTraining sourceName={'popular-trainings__item'} key={`${training.name}-${training.calories}-${training.price}`} training={training} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default PopularTrainings;
