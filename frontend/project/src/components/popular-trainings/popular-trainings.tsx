import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import ThumbnailTraining from '../thumbnail-training/thumbnail-training';
import { Training } from '../../types/training.type';
import { getTrainings } from '../../store/main-data/main-data.selectors';
import { useEffect } from 'react';
import { fetchTrainingsAction } from '../../store/api-actions/trainings-api-actions/trainings-api-actions';


function PopularTrainings():JSX.Element {
  const dispatch = useAppDispatch();
  const trainings: Training[] = useAppSelector(getTrainings);

  useEffect(() => {
      dispatch(fetchTrainingsAction({}));
  }, [dispatch, trainings]);

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
              <button className="btn-icon popular-trainings__control" type="button" aria-label="previous">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button className="btn-icon popular-trainings__control" type="button" aria-label="next">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="popular-trainings__list">
            {trainings.map((training) => (
              <ThumbnailTraining key={training.name} training={training} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default PopularTrainings;
