import { Training } from '../../types/training.type';
import ThumbnailPicture from '../thumbnail-picture/thumbnail-picture';
import ThumbnailTrainingHashtags from '../thumbnail-training-hashtags/thumbnail-training-hashtags';
import ThumbnailTrainingRate from '../thumbnail-training-rate/thumbnail-training-rate';
import ThumbnailTrainingText from '../thumbnail-training-text/thumbnail-training-text';
import ThumbnailTrainingWrapper from '../thumbnail-training-wrapper/thumbnail-training-wrapper';


type ThumbnailTrainingProps = {
  training: Training;
}

function ThumbnailTraining({ training }: ThumbnailTrainingProps): JSX.Element {
  const { name, backgroundImage, price, workoutType, rating, description } = training;
  const hashtags = [workoutType];
  return (
    <li className="popular-trainings__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <ThumbnailPicture imageSrc={backgroundImage} sourceName={'thumbnail-training__image'} width={330} height={190}/>
          <p className="thumbnail-training__price">
            <span className="thumbnail-training__price-value">{price}</span>
            <span>₽</span>
          </p>
          <h3 className="thumbnail-training__title">{name}</h3>
          <div className="thumbnail-training__info">
            <ThumbnailTrainingHashtags hashtags={hashtags}/>
            <ThumbnailTrainingRate rate={rating}/>
          </div>
          <ThumbnailTrainingText text={description}/>
          <ThumbnailTrainingWrapper/>
        </div>
      </div>
    </li>
  );
}

export default ThumbnailTraining;
