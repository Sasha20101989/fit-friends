import { Link, useParams } from 'react-router-dom';
import HashtagList from '../hashtag-list/hashtag-list';
import { Role } from '../../types/role.enum';
import CardGalery from '../card-galery/card-galery';
import { Trainer } from '../../types/trainer.interface';
import ThumbnailTraining from '../thumbnail-training/thumbnail-training';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { Training } from '../../types/training.type';
import { fetchTrainingsAction } from '../../store/api-actions/trainings-api-actions/trainings-api-actions';
import { TrainingCategory } from '../../types/training-category';
import { getTrainings } from '../../store/main-data/main-data.selectors';
import IconButton from '../icon-button/icon-button';
import { MAX_TRAINER_CARD_TRAININGS_COUNT } from '../../const';

type TrainerCardProps = {
  trainer: Trainer;
  isFriend: boolean;
  onAddFriend: () => void;
  onRemoveFriend: () => void;
};

function TrainerCard({ trainer, isFriend, onAddFriend, onRemoveFriend }: TrainerCardProps) : JSX.Element {
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();

  const [selectedPage, setPage] = useState<number>(1);

  const {name, location, description, workoutTypes, role, personalTraining} = trainer;

  const trainings: Training[] = useAppSelector(getTrainings);

  const isPreviousButtonDisabled = selectedPage === 1;
  const isNextButtonDisabled = MAX_TRAINER_CARD_TRAININGS_COUNT !== trainings.length;

  useEffect(() => {
    if(id){
      dispatch(fetchTrainingsAction({
        trainer: id,
        category: TrainingCategory.BASE,
        page: selectedPage,
        limit: MAX_TRAINER_CARD_TRAININGS_COUNT,
      }));
    }
  }, [dispatch , id, selectedPage]);

  const handlePreviousClick = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setPage((prevPage) => prevPage + 1);
  };


  const handleAddFriend = () => {
    onAddFriend();
  };

  const handleRemoveFriend = () => {
    onRemoveFriend();
  };

  return(
    <section className="user-card-coach">
      <h1 className="visually-hidden">Карточка пользователя роль тренер</h1>
      <div className="user-card-coach__wrapper">
        <div className="user-card-coach__card">
          <div className="user-card-coach__content">
            <div className="user-card-coach__head">
              <h2 className="user-card-coach__title">{name}</h2>
            </div>
            <div className="user-card-coach__label">
              <Link to="">
                <svg className="user-card-coach__icon-location" width="12" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-location"></use>
                </svg>
                <span>{location}</span>
              </Link>
            </div>
            <div className="user-card-coach__status-container">
              <div className="user-card-coach__status user-card-coach__status--tag">
                <svg className="user-card-coach__icon-cup" width="12" height="13" aria-hidden="true">
                  <use xlinkHref="#icon-cup"></use>
                </svg>
                <span>{role}</span>
              </div>
              {personalTraining ?
                <div className="user-card-coach__status user-card-coach__status--check">
                  <span>Готов тренировать</span>
                </div> :
                <div className="user-card-coach-2__status user-card-coach-2__status--check">
                  <span>Не готов тренировать</span>
                </div>}
            </div>
            <div className="user-card__text">
              {description && <p>{description}</p>}
            </div>
            <button className="btn-flat user-card-coach-2__sertificate" type="button">
              <svg width="12" height="13" aria-hidden="true">
                <use xlinkHref="#icon-teacher"></use>
              </svg>
              <span>Посмотреть сертификаты</span>
            </button>
            <HashtagList
              classType={'user-card-coach__hashtag-list'}
              hashtagClassType={'user-card-coach__hashtag-item'}
              hashtagItemClassType={'hashtag'}
              hashtags={workoutTypes}
            />
            {isFriend ? (
              <button className="btn btn--outlined user-card__friend-btn" type="button" onClick={handleRemoveFriend}>
                Убрать из друзей
              </button>
            ) : (
              <button className="btn user-card__friend-btn" type="button" onClick={handleAddFriend}>
                Добавить в друзья
              </button>
            )}
          </div>
          <CardGalery isCoach={role === Role.Trainer}/>
        </div>
        <div className="user-card-coach__training">
          <div className="user-card-coach__training-head">
            <h2 className="user-card-coach__training-title">Тренировки</h2>
            <div className="user-card-coach__training-bts">
              <IconButton sourceName={'btn-icon user-card-coach__training-btn'} direction="left" onClick={handlePreviousClick} ariaLabel="previous" width={14} height={10} disabled={isPreviousButtonDisabled}/>
              <IconButton sourceName={'btn-icon user-card-coach__training-btn'} direction="right" onClick={handleNextClick} ariaLabel="next" width={14} height={10} disabled={isNextButtonDisabled}/>
            </div>
          </div>
          <ul className="user-card-coach__training-list">
            {trainings.map((training) => (
              <ThumbnailTraining key={training.name} sourceName={'user-card-coach__training-item'} training={training}/>
            ))}
          </ul>
          <form className="user-card-coach__training-form">
            <button className="btn user-card-coach__btn-training" type="button">Хочу персональную тренировку</button>
            <div className="user-card-coach__training-check">
              <div className="custom-toggle custom-toggle--checkbox">
                <label>
                  <input type="checkbox" value="user-agreement-1" name="user-agreement"/>
                  <span className="custom-toggle__icon">
                    <svg width="9" height="6" aria-hidden="true">
                      <use xlinkHref="#arrow-check"></use>
                    </svg>
                  </span>
                  <span className="custom-toggle__label">Получать уведомление на почту о новой тренировке</span>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default TrainerCard;
