import { Training } from '../../types/training.type';
import HashtagList from '../hashtag-list/hashtag-list';
import ThumbnailTrainingWrapper from '../thumbnail-training-wrapper/thumbnail-training-wrapper';
import Image from '../image/image';
import ThumbnailTrainingRate from '../training-rate/training-rate';
import ThumbnailTrainingText from '../thumbnail-training-text/thumbnail-training-text';

type TrainingItemProps = {
  sourceName: string;
  training: Training;
}

function TrainingItem({ sourceName, training }: TrainingItemProps):JSX.Element {
  const { backgroundImage, price, name, workoutType, rating, description } = training;
  const hashtags = [workoutType];

  return (
    <li className={sourceName}>
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <Image imageSrc={backgroundImage} sourceName={'thumbnail-training__image'} width={330} height={190} alt={'тренировка'}/>
          <p className="thumbnail-training__price">
            <span className="thumbnail-training__price-value">{price === 0 ? 'Бесплатно' : price}</span>
            {price !== 0 && <span>₽</span>}
          </p>
          <h3 className="thumbnail-training__title">{name}</h3>
          <div className="thumbnail-training__info">
            <HashtagList
              classType={'thumbnail-training__hashtags-list'}
              hashtagClassType={'thumbnail-training__hashtags-item'}
              hashtagItemClassType={'hashtag thumbnail-training__hashtag'}
              hashtags={hashtags}
            />
            <ThumbnailTrainingRate rate={rating}/>
          </div>
          <ThumbnailTrainingText text={description}/>
          {training.id && <ThumbnailTrainingWrapper trainingId={training.id}/>}
        </div>
      </div>
    </li>
  );
}

export default TrainingItem;
