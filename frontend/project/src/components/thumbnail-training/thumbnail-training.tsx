import ThumbnailPicture from '../thumbnail-picture/thumbnail-picture';
import ThumbnailTrainingHashtags from '../thumbnail-training-hashtags/thumbnail-training-hashtags';
import ThumbnailTrainingRate from '../thumbnail-training-rate/thumbnail-training-rate';
import ThumbnailTrainingText from '../thumbnail-training-text/thumbnail-training-text';
import ThumbnailTrainingWrapper from '../thumbnail-training-wrapper/thumbnail-training-wrapper';


type ThumbnailTrainingProps = {
  title: string;
  imageSrc: string;
  price: number;
  hashtags: string[];
  rate: number;
  text: string;
}

function ThumbnailTraining({ title, imageSrc, price, hashtags, rate, text }: ThumbnailTrainingProps): JSX.Element {
  return (
    <li className="popular-trainings__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <ThumbnailPicture imageSrc={imageSrc} sourceName={'thumbnail-training__image'} width={330} height={190}/>
          <p className="thumbnail-training__price">
            <span className="thumbnail-training__price-value">{price}</span>
            <span>₽</span>
          </p>
          <h3 className="thumbnail-training__title">{title}</h3>
          <div className="thumbnail-training__info">
            <ThumbnailTrainingHashtags hashtags={hashtags}/>
            <ThumbnailTrainingRate rate={rate}/>
          </div>
          <ThumbnailTrainingText text={text}/>
          <ThumbnailTrainingWrapper/>
        </div>
      </div>
    </li>
  );
}

export default ThumbnailTraining;
