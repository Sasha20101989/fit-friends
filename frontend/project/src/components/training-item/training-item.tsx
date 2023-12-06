import { Link } from 'react-router-dom';
import ThumbnailPicture from '../thumbnail-picture/thumbnail-picture';
import { Training } from '../../types/training.type';

type TrainingItemProps = {
  training: Training;
}

function TrainingItem({ training }: TrainingItemProps):JSX.Element {
  const { backgroundImage, price, name, workoutType, rating, description } = training;
  const hashtags = [workoutType];
  return (
    <li className="my-trainings__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <ThumbnailPicture imageSrc={backgroundImage} sourceName={'thumbnail-training__image'} width={330} height={190}/>
          <p className="thumbnail-training__price">{price}</p>
          <h3 className="thumbnail-training__title">{name}</h3>
          <div className="thumbnail-training__info">
            <ul className="thumbnail-training__hashtags-list">
              {hashtags.map((hashtag) => (
                <li key={hashtag} className="thumbnail-training__hashtags-item">
                  <div className="hashtag thumbnail-training__hashtag">
                    <span>{`#${hashtag}`}</span>
                  </div>
                </li>
              ))}
            </ul>
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
            <Link className="btn btn--small thumbnail-training__button-catalog" to="">
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
