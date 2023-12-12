import ThumbnailPicture from '../thumbnail-picture/thumbnail-picture';
import { Training } from '../../types/training.type';
import HashtagList from '../hashtag-list/hashtag-list';
import ThumbnailTrainingWrapper from '../thumbnail-training-wrapper/thumbnail-training-wrapper';

type TrainingItemProps = {
  training: Training;
}

function TrainingItem({ training }: TrainingItemProps):JSX.Element {
  const { id, backgroundImage, price, name, workoutType, rating, description } = training;
  const hashtags = [workoutType];

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
          {id && <ThumbnailTrainingWrapper trainingId={id}/>}
        </div>
      </div>
    </li>
  );
}

export default TrainingItem;
