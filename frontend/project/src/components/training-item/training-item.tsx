import { Link, useNavigate } from 'react-router-dom';
import ThumbnailPicture from '../thumbnail-picture/thumbnail-picture';
import { Training } from '../../types/training.type';
import { useAppSelector } from '../../hooks/index';
import { getUser } from '../../store/user-process/user-process.selectors';
import { AppRoute } from '../../const';
import HashtagList from '../hashtag-list/hashtag-list';

type TrainingItemProps = {
  training: Training;
}

function TrainingItem({ training }: TrainingItemProps):JSX.Element {
  const navigate = useNavigate();
  const { id, backgroundImage, price, name, workoutType, rating, description } = training;
  const user = useAppSelector(getUser);
  const hashtags = [workoutType];

  const handleTrainingClick = (evt: React.MouseEvent<HTMLAnchorElement>): void => {
    evt.preventDefault();
    const trainerId = user?.id;
    if (trainerId && id) {
      navigate(`${AppRoute.Trainers}/${trainerId}${AppRoute.Trainings}/${id}`);
    }
  };

  return (
    <li className="my-trainings__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <ThumbnailPicture imageSrc={backgroundImage} sourceName={'thumbnail-training__image'} width={330} height={190} alt={'тренировка'}/>
          <p className="thumbnail-training__price">{price === 0 ? 'Бесплатно' : `${price} ₽`}</p>
          <h3 className="thumbnail-training__title">{name}</h3>
          <div className="thumbnail-training__info">
            <HashtagList
              classType={'thumbnail-training__hashtags-list'}
              hashtagClassType={'thumbnail-training__hashtags-item'}
              hashtagItemClassType={'hashtag thumbnail-training__hashtag'}
              hashtags={hashtags}
            />
            <div className="thumbnail-training__rate">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg>
              <span className="thumbnail-training__rate-value">{rating}</span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">{description}</p>
          </div>
          <div className="thumbnail-training__button-wrapper">
            <Link className="btn btn--small thumbnail-training__button-catalog" to="" onClick={handleTrainingClick}>
              Подробнее
            </Link>
            <Link className="btn btn--small btn--outlined thumbnail-training__button-catalog" to="">
              Отзывы
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default TrainingItem;
