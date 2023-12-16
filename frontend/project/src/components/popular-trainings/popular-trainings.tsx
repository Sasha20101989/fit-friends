import ThumbnailTraining from '../thumbnail-training/thumbnail-training';
import { Training } from '../../types/training.type';
import IconButton from '../icon-button/icon-button';
import { AppRoute } from '../../const';
import { useNavigate } from 'react-router-dom';
import ThumbnailSpecGym from '../thumbnail-spec-gym/thumbnail-spec-gym';
import { memo } from 'react';

type PopularTrainingsProps = {
  popularTrainings: Training[];
  isPreviousButtonDisabled: boolean;
  isNextButtonDisabled: boolean;
  onPreviousClick: (value: React.SetStateAction<number>) => void;
  onNextClick: (value: React.SetStateAction<number>) => void;
}

function PopularTrainings({popularTrainings, isPreviousButtonDisabled, isNextButtonDisabled, onPreviousClick, onNextClick}: PopularTrainingsProps):JSX.Element {
  const navigate = useNavigate();

  const handlePreviousClick = () => {
    onPreviousClick((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    onNextClick((prevPage) => prevPage + 1);
  };

  const handleShowAllClick = (evt: React.MouseEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    navigate(AppRoute.TrainingsCatalog);
  };

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
          {popularTrainings.length > 0 ?
            <ul className="popular-trainings__list">
              {popularTrainings.map((training) => (
                <ThumbnailTraining sourceName={'popular-trainings__item'} key={`${training.name}-${training.calories}-${training.price}`} training={training} />
              ))}
            </ul> :
            <ThumbnailSpecGym/>}
        </div>
      </div>
    </section>
  );
}

export default memo(PopularTrainings);
